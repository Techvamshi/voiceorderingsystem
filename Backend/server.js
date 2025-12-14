const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const { Groq } = require('groq-sdk');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vam@123',
    database: 'skipp'
});

db.connect(err => {
    if (err) console.log("DB ERROR:", err);
    else console.log("DB CONNECTED SUCCESSFULLY");
});

app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

app.get('/fooditems', (req, res) => {
    db.query("SELECT * FROM FoodItems", (err, result) => {
        if (err) {
            console.log("Error fetching details:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(result);
    });
});

app.put('/updatequantity/:foodId', (req, res) => {
    const foodId = req.params.foodId;
    const { quantity } = req.body;
    
    if (isNaN(quantity) || quantity < 0) {
        return res.status(400).json({ error: "Invalid quantity value" });
    }
    
    db.query("UPDATE FoodItems SET Quantity = ? WHERE FoodID = ?", 
        [quantity, foodId], 
        (err, result) => {
            if (err) {
                console.log("Error updating quantity:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ 
                message: "Quantity updated successfully", 
                affectedRows: result.affectedRows,
                foodId,
                newQuantity: quantity
            });
        }
    );
});

app.get('/cart/summary', (req, res) => {
    db.query(`
        SELECT f.FoodID, f.FoodName, f.Price, f.Quantity, f.Category,
               (f.Price * f.Quantity) as Total
        FROM FoodItems f 
        WHERE f.Quantity > 0
        ORDER BY f.FoodName
    `, (err, result) => {
        if (err) {
            console.log("Error fetching cart summary:", err);
            return res.status(500).json({ error: "Database error" });
        }
        
        const total = result.reduce((sum, item) => sum + (item.Total || 0), 0);
        const itemCount = result.reduce((sum, item) => sum + (item.Quantity || 0), 0);
        
        // Group by category
        const byCategory = {};
        result.forEach(item => {
            if (!byCategory[item.Category]) {
                byCategory[item.Category] = [];
            }
            byCategory[item.Category].push(item);
        });
        
        res.json({
            items: result,
            summary: {
                total: total.toFixed(2),
                itemCount: itemCount,
                categoryBreakdown: byCategory
            },
            message: `You have ${itemCount} items in your cart. Total: ₹${total.toFixed(2)}`
        });
    });
});

app.get('/category/:category', (req, res) => {
    const category = req.params.category;
    
    db.query(
        "SELECT * FROM FoodItems WHERE LOWER(Category) = LOWER(?)", 
        [category], 
        (err, result) => {
            if (err) {
                console.log("Error fetching category items:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({
                category: category,
                items: result,
                count: result.length
            });
        }
    );
});

app.get('/categories', (req, res) => {
    db.query(`
        SELECT DISTINCT Category, 
               COUNT(*) as itemCount,
               SUM(Quantity) as inCart
        FROM FoodItems 
        GROUP BY Category
        ORDER BY Category
    `, (err, result) => {
        if (err) {
            console.log("Error fetching categories:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(result);
    });
});

app.post('/voice/command', async (req, res) => {
    try {
        const { command } = req.body;
        
        if (!command || command.trim() === '') {
            return res.status(400).json({ error: "Voice command is required" });
        }
        
        console.log(`Processing voice command: "${command}"`);
        
        const items = await new Promise((resolve, reject) => {
            db.query("SELECT FoodID, FoodName, Description, Price, Category, Quantity FROM FoodItems", (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });
        
        const categories = [...new Set(items.map(item => item.Category))];
        
        const systemPrompt = `You are the voice assistant for "DIL KI RASOI" restaurant, managing the food ordering system. Your task is to understand natural language commands and perform actions accordingly.

RESTAURANT INFORMATION:
- Restaurant: DIL KI RASOI
- Currency: Indian Rupees (₹)
- Available Pages: Home, First, Second, Cart, Categories

COMPLETE MENU ITEMS:
${items.map(item => 
    `${item.FoodName} (${item.Category}) - ₹${item.Price} - ${item.Description} - In cart: ${item.Quantity || 0}`
).join('\n')}

CURRENT CART STATUS:
${items.filter(item => item.Quantity > 0).length > 0 
    ? items.filter(item => item.Quantity > 0)
        .map(item => `• ${item.Quantity} x ${item.FoodName} = ₹${item.Price * item.Quantity}`)
        .join('\n')
    : 'Cart is empty'}

AVAILABLE CATEGORIES:
${categories.map(cat => `• ${cat}`).join('\n')}

PAGE NAVIGATION COMMANDS:
- "Go to home" or "Take me home" → NAVIGATE_TO("Home")
- "Show cart" or "Go to cart" → NAVIGATE_TO("Cart")
- "Show first page" → NAVIGATE_TO("First")
- "Show second page" → NAVIGATE_TO("Second")
- "Show categories" → NAVIGATE_TO("Categories") or SHOW_CATEGORIES()

CATEGORY VIEWING COMMANDS:
- "Show pizzas" or "Show pizza menu" → SHOW_CATEGORY("Pizza")
- "Show burgers" → SHOW_CATEGORY("Burger")
- "Show main course" → SHOW_CATEGORY("Main Course")
- "Show snacks" → SHOW_CATEGORY("Snacks")
- "Show desserts" → SHOW_CATEGORY("Dessert")
- "Show menu" → SHOW_ALL_CATEGORIES()

ORDERING COMMANDS:
- "Add [quantity] [item]" → ADD_TO_CART(item_name, quantity)
- "Remove [item]" → REMOVE_FROM_CART(item_name)
- "Clear cart" → CLEAR_CART()
- "What's in my cart?" → VIEW_CART()

ITEM NAME MAPPINGS (for speech recognition errors):
- "Margarita" = "Margherita Pizza"
- "Paneer pizza" = "Paneer Tikka Pizza"
- "Chicken pizza" = "Chicken Supreme Pizza"
- "Veg burger" = "Classic Veg Burger"
- "Chicken burger" = "Classic Chicken Burger"
- "Biryani" usually means "Chicken Biryani"
- "Spring roll" = "Veg Spring Rolls"

RESPONSE FORMAT - Return ONLY valid JSON:
{
    "action": "ADD_TO_CART" | "REMOVE_FROM_CART" | "CLEAR_CART" | "VIEW_CART" | 
              "NAVIGATE_TO" | "SHOW_CATEGORY" | "SHOW_ALL_CATEGORIES" | "SHOW_ITEM_DETAILS" |
              "CLARIFICATION_NEEDED",
    "itemName": "exact item name or null",
    "category": "category name or null",
    "quantity": number or null,
    "navigationTarget": "Home" | "Cart" | "First" | "Second" | "Categories" or null,
    "message": "Friendly response to speak to user",
    "needClarification": boolean,
    "clarificationQuestion": "Question if clarification needed",
    "options": ["option1", "option2"] (if multiple matches),
    "totalPrice": number (if adding items),
    "showCategoryItems": boolean (if should display category items)
}

EXAMPLES:
1. "Go to cart" → {"action": "NAVIGATE_TO", "navigationTarget": "Cart", "message": "Taking you to the cart page."}
2. "Show pizzas" → {"action": "SHOW_CATEGORY", "category": "Pizza", "message": "Showing all pizza options.", "showCategoryItems": true}
3. "Add two margarita pizzas" → {"action": "ADD_TO_CART", "itemName": "Margherita Pizza", "quantity": 2, "message": "Added 2 Margherita Pizzas to cart. Total: ₹398", "totalPrice": 398}
4. "What's on the menu?" → {"action": "SHOW_ALL_CATEGORIES", "message": "Here's our full menu:", "showCategoryItems": true}
5. "Remove farmhouse pizza" → {"action": "REMOVE_FROM_CART", "itemName": "Farmhouse Pizza", "message": "Removed Farmhouse Pizza from cart."}

IMPORTANT RULES:
1. For navigation commands, set navigationTarget
2. For category viewing, set category and showCategoryItems: true
3. Always calculate price when adding items
4. Be helpful and ask for clarification when unsure
5. Map common speech errors to correct item names`;

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: command }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.2,
            max_tokens: 1000,
            response_format: { type: "json_object" }
        });
        
        let aiResponse;
        try {
            aiResponse = JSON.parse(chatCompletion.choices[0]?.message?.content);
            console.log("Groq AI response:", JSON.stringify(aiResponse, null, 2));
        } catch (parseError) {
            console.error("Error parsing Groq response:", parseError);
            aiResponse = {
                action: "CLARIFICATION_NEEDED",
                message: "I'm having trouble understanding. Could you please rephrase?",
                needClarification: true
            };
        }
        
        let updatedItems = [];
        let actionPerformed = false;
        
        if (aiResponse.action === "ADD_TO_CART" && aiResponse.itemName && aiResponse.quantity) {
            const itemName = aiResponse.itemName;
            const quantity = aiResponse.quantity;
            
            let item = items.find(i => 
                i.FoodName.toLowerCase() === itemName.toLowerCase()
            );
            
            if (!item) {
                // Try partial match
                item = items.find(i => 
                    i.FoodName.toLowerCase().includes(itemName.toLowerCase()) ||
                    itemName.toLowerCase().includes(i.FoodName.toLowerCase())
                );
            }
            
            if (item) {
                const newQuantity = (item.Quantity || 0) + quantity;
                
                await new Promise((resolve, reject) => {
                    db.query(
                        "UPDATE FoodItems SET Quantity = ? WHERE FoodID = ?",
                        [newQuantity, item.FoodID],
                        (err, result) => {
                            if (err) reject(err);
                            else resolve(result);
                        }
                    );
                });
                
                updatedItems.push({
                    foodId: item.FoodID,
                    foodName: item.FoodName,
                    oldQuantity: item.Quantity || 0,
                    newQuantity: newQuantity,
                    price: item.Price
                });
                
                actionPerformed = true;
                
                const totalPrice = item.Price * quantity;
                aiResponse.message = `✅ Added ${quantity} ${item.FoodName} to your cart. Price: ₹${totalPrice}.`;
                aiResponse.totalPrice = totalPrice;
                
            } else {
                aiResponse.action = "CLARIFICATION_NEEDED";
                aiResponse.message = `I couldn't find "${itemName}" on our menu.`;
                aiResponse.needClarification = true;
            }
            
        } else if (aiResponse.action === "REMOVE_FROM_CART" && aiResponse.itemName) {
            const itemName = aiResponse.itemName;
            const item = items.find(i => 
                i.FoodName.toLowerCase() === itemName.toLowerCase()
            );
            
            if (item && item.Quantity > 0) {
                await new Promise((resolve, reject) => {
                    db.query(
                        "UPDATE FoodItems SET Quantity = 0 WHERE FoodID = ?",
                        [item.FoodID],
                        (err, result) => {
                            if (err) reject(err);
                            else resolve(result);
                        }
                    );
                });
                
                updatedItems.push({
                    foodId: item.FoodID,
                    foodName: item.FoodName,
                    oldQuantity: item.Quantity,
                    newQuantity: 0
                });
                
                actionPerformed = true;
                aiResponse.message = `🗑️ Removed ${item.FoodName} from your cart.`;
                
            } else {
                aiResponse.message = `${itemName} is not in your cart.`;
            }
            
        } else if (aiResponse.action === "CLEAR_CART") {
            await new Promise((resolve, reject) => {
                db.query("UPDATE FoodItems SET Quantity = 0", (err, result) => {
                    if (err) reject(err);
                    else resolve(result);
                });
            });
            
            updatedItems = items.filter(item => item.Quantity > 0).map(item => ({
                foodId: item.FoodID,
                foodName: item.FoodName,
                oldQuantity: item.Quantity,
                newQuantity: 0
            }));
            
            actionPerformed = true;
            aiResponse.message = "🛒 Your cart has been cleared!";
            
        } else if (aiResponse.action === "VIEW_CART") {
            // View cart
            const cartItems = items.filter(item => item.Quantity > 0);
            if (cartItems.length === 0) {
                aiResponse.message = "Your cart is empty. What would you like to order?";
            } else {
                const total = cartItems.reduce((sum, item) => sum + (item.Price * item.Quantity), 0);
                aiResponse.message = `You have ${cartItems.length} item(s) in your cart totaling ₹${total}`;
            }
            
        } else if (aiResponse.action === "SHOW_CATEGORY" && aiResponse.category) {
            const category = aiResponse.category;
            const categoryItems = items.filter(item => 
                item.Category.toLowerCase() === category.toLowerCase()
            );
            
            if (categoryItems.length > 0) {
                aiResponse.message = `Showing ${category} items. We have ${categoryItems.length} options available.`;
                aiResponse.showCategoryItems = true;
            } else {
                aiResponse.message = `We don't have any items in the ${category} category.`;
            }
            
        } else if (aiResponse.action === "SHOW_ALL_CATEGORIES") {
            aiResponse.message = `We have ${categories.length} categories: ${categories.join(', ')}.`;
            aiResponse.showCategoryItems = true;
        }
        
        if (aiResponse.action === "NAVIGATE_TO" && aiResponse.navigationTarget) {
            aiResponse.message = `Navigating to ${aiResponse.navigationTarget} page.`;
        }
        
        res.json({
            success: true,
            originalCommand: command,
            response: aiResponse,
            updatedItems: updatedItems,
            actionPerformed: actionPerformed,
            timestamp: new Date().toISOString()
        });
        
    } catch (error) {
        console.error("Error processing voice command:", error);
        res.status(500).json({
            success: false,
            error: error.message,
            message: "Sorry, I encountered an error. Please try again."
        });
    }
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        endpoints: {
            voiceCommand: '/voice/command',
            foodItems: '/fooditems',
            categories: '/categories',
            categoryItems: '/category/:category'
        }
    });
});

const PORT = 3000;
app.listen(PORT, (err) => {
    if (err) {
        console.log("Error starting server:", err);
        return;
    }
    console.log(`\n=== DIL KI RASOI Voice Assistant Server ===`);
    console.log(`Server running at: http://localhost:${PORT}`);
    console.log(`\nAvailable endpoints:`);
    console.log(`  [POST] /voice/command      - Process voice command with navigation`);
    console.log(`  [GET]  /fooditems          - Get all food items`);
    console.log(`  [GET]  /categories         - Get all categories`);
    console.log(`  [GET]  /category/:name     - Get items by category`);
    console.log(`\nReady to process voice commands with navigation!\n`);
});