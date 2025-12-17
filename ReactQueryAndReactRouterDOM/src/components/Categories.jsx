import React, { useContext, useState, useEffect } from 'react';
import "./HeaderCss.css";
import { GlobalState } from '../App';
import Card from './Card';

const Categories = () => {
  const { items, count, setCount } = useContext(GlobalState);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const uniqueCategories = [...new Set(items.map(item => item.Category))];
    setCategories(uniqueCategories);
    
    // If a category is selected, filter items
    if (selectedCategory) {
      const filtered = items.filter(item => 
        item.Category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setCategoryItems(filtered);
    } else {
      setCategoryItems([]);
    }
  }, [items, selectedCategory]);


useEffect(() => {
  const handleCategorySelected = (event) => {
    const category = event.detail.category;
    if (category) {
      setSelectedCategory(category);
      fetchCategoryItems(category);
    } else {
      setSelectedCategory(null);
      setCategoryItems(items);
    }
  };

  window.addEventListener('categorySelected', handleCategorySelected);
  
  return () => {
    window.removeEventListener('categorySelected', handleCategorySelected);
  };
}, [items]);
 

// Function to fetch category items from backend
  const fetchCategoryItems = async (category) => {
    try {
      const response = await fetch(`http://localhost:3000/category/${category}`);
      const data = await response.json();
      setCategoryItems(data.items);
    } catch (error) {
      console.error('Error fetching category items:', error);
      // Fallback to local filtering
      const filtered = items.filter(item => 
        item.Category.toLowerCase() === category.toLowerCase()
      );
      setCategoryItems(filtered);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchCategoryItems(category);
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
    setCategoryItems(items);
  };

  return (
    <div className="categories-container">
      <div className="categories-header">
        <p className="categories-subtitle">
          Browse our delicious offerings by category
          {selectedCategory && (
            <span className="selected-category">
              Currently viewing: <strong>{selectedCategory}</strong>
            </span>
          )}
        </p>
      </div>

      {/* Category Buttons */}
      <div className="category-buttons">
        <button
          onClick={handleShowAll}
          className={`category-button ${!selectedCategory ? 'active' : ''}`}
        >
          All Items
        </button>
        
        {categories.map(category => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
          >
            {category}
         
          </button>
        ))}
      </div>

      {/* Display Items */}
      <div className="category-items-section">
        {selectedCategory ? (
          <>
            {categoryItems.length > 0 ? (
              <div className="CardsSection">
                {categoryItems.map(item => (
                  <Card
                    key={item.FoodID}
                    id={item.FoodID}
                    name={item.FoodName}
                    price={item.Price}
                    imgs={item.ImageName}
                  />
                ))}
              </div>
            ) : (
              <p className="no-items">No items found in this category.</p>
            )}
          </>
        ) : (
          <>
            <div className="CardsSection">
              {items.map(item => (
                <Card
                  key={item.FoodID}
                  id={item.FoodID}
                  name={item.FoodName}
                  price={item.Price}
                  imgs={item.ImageName}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Category Summary */}
      {/* <div className="category-summary">
        <h4>Category Summary</h4>
        <div className="summary-grid">
          {categories.map(category => {
            const categoryItemCount = items.filter(item => item.Category === category).length;
            const inCartCount = items
              .filter(item => item.Category === category && count[item.FoodID] > 0)
              .reduce((sum, item) => sum + (count[item.FoodID] || 0), 0);
            
            return (
              <div key={category} className="summary-card">
                <h5>{category}</h5>
                <p>Items: {categoryItemCount}</p>
                <p>In Cart: {inCartCount}</p>
              </div>
            );
          })}
        </div>
      </div> */}
    </div>
  );
};

export default Categories;