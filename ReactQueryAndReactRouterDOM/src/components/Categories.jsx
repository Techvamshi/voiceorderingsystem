import React, { useContext, useState, useEffect, useRef } from 'react';
import "./HeaderCss.css";
import { GlobalState } from '../App';
import Card from './Card';
import gsap from 'gsap';

const Categories = () => {
  const { items, count, setCount } = useContext(GlobalState);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const cardsRef = useRef([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const uniqueCategories = [...new Set(items.map(item => item.Category))];
    setCategories(uniqueCategories);
    
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

  // Initialize refs for animations
  useEffect(() => {
    cardsRef.current = cardsRef.current.slice(0, items.length);
  }, [items.length]);

  // Card hover zoom animation
  const handleCardMouseEnter = (index) => {
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out",
        zIndex: 10
      });
    }
  };

  const handleCardMouseLeave = (index) => {
    if (cardsRef.current[index]) {
      gsap.to(cardsRef.current[index], {
        scale: 1,
        duration: 0.2,
        ease: "power2.out",
        zIndex: 1
      });
    }
  };

  // Image zoom animation on card click
  const handleCardClick = (index) => {
    if (cardsRef.current[index]) {
      const card = cardsRef.current[index];
      const img = card.querySelector('img');
      
      if (img) {
        const tl = gsap.timeline();
        
        tl.to(img, {
          scale: 1.2,
          duration: 0.5,
          ease: "power2.out"
        })
        .to(img, {
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
          delay: 0.5
        });
      }
    }
  };

  // Function to fetch category items from backend
  const fetchCategoryItems = async (category) => {
    try {
      const response = await fetch(`http://localhost:3000/category/${category}`);
      const data = await response.json();
      setCategoryItems(data.items);
    } catch (error) {
      console.error('Error fetching category items:', error);
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
    <div className="categories-container" ref={containerRef}>
      {/* Clean Pattern Overlay */}
      <div className="pattern-overlay"></div>
      
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
                {categoryItems.map((item, index) => (
                  <div 
                    key={item.FoodID}
                    ref={el => cardsRef.current[index] = el}
                    className="card-wrapper"
                    onMouseEnter={() => handleCardMouseEnter(index)}
                    onMouseLeave={() => handleCardMouseLeave(index)}
                    onClick={() => handleCardClick(index)}
                  >
                    <Card
                      id={item.FoodID}
                      name={item.FoodName}
                      price={item.Price}
                      imgs={item.ImageName}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p className="no-items">No items found in this category.</p>
            )}
          </>
        ) : (
          <>
            <div className="CardsSection">
              {items.map((item, index) => (
                <div 
                  key={item.FoodID}
                  ref={el => cardsRef.current[index] = el}
                  className="card-wrapper"
                  onMouseEnter={() => handleCardMouseEnter(index)}
                  onMouseLeave={() => handleCardMouseLeave(index)}
                  onClick={() => handleCardClick(index)}
                >
                  <Card
                    id={item.FoodID}
                    name={item.FoodName}
                    price={item.Price}
                    imgs={item.ImageName}
                  />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Categories;