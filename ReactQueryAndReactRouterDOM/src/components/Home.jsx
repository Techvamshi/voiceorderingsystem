import React, { useContext, useState, useEffect } from 'react'
import Card from './Card'
import Categories from './Categories'
import "./HeaderCss.css"
import HeroSection from './HeroSection'
import { GlobalState } from '../App'
import AttentionGrabSection from './AttentionGrabSection'

const Home = () => {
  const { items, currentPage, setCurrentPage } = useContext(GlobalState);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategories, setShowCategories] = useState(true); 

  useEffect(() => {
    const handleCategorySelected = (event) => {
      console.log('CategorySelected event received:', event.detail);
      
      const { category, action } = event.detail;
      
      if (action === 'showAllCategories' || category === null) {
        setShowCategories(true);
        setSelectedCategory(null);
        console.log('Showing all categories from voice command');
        
        setTimeout(() => {
          const categoriesElement = document.querySelector('.categories-container');
          if (categoriesElement) {
            categoriesElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
      else if (category && (action === 'showCategory' || !action)) {
        setShowCategories(true);
        setSelectedCategory(category);
        console.log('Showing category from voice command:', category);
        
        setTimeout(() => {
          const categoriesElement = document.querySelector('.categories-container');
          if (categoriesElement) {
            categoriesElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    };

    window.addEventListener('categorySelected', handleCategorySelected);
    
    return () => {
      window.removeEventListener('categorySelected', handleCategorySelected);
    };
  }, [setCurrentPage]);


  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setShowCategories(true);
    if (setCurrentPage) setCurrentPage('Categories');
  };

  const handleShowAll = () => {
    setSelectedCategory(null);
    setShowCategories(true);
  };

  const filteredItems = selectedCategory 
    ? items.filter(item => item.Category.toLowerCase() === selectedCategory.toLowerCase())
    : items;

  return (
    <div>
      <HeroSection />
      <br />

      <AttentionGrabSection />
      
      {showCategories ? (
        <Categories />
      ) : (
        <div className="categories-toggle-section">
          <button 
            className="show-categories-btn"
            onClick={() => setShowCategories(true)}
          >
            Browse Categories
          </button>
        </div>
      )}
      
      {selectedCategory && (
        <div className="category-display-header">
          <h2 className="category-title">
            {selectedCategory} 
            <span className="item-count-badge">
              {filteredItems.length} items
            </span>
          </h2>
          <button 
            onClick={handleShowAll}
            className="show-all-button"
          >
            Show All Items
          </button>
        </div>
      )}
      
      {/* <div className='CardOutering'>
        <div className='CardsSection'>
          {selectedCategory ? (
            filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <Card 
                  key={item.FoodID}
                  id={item.FoodID}
                  name={item.FoodName}
                  price={item.Price}
                  imgs={item.ImageName}
                />
              ))
            ) : (
              <div className="no-items-message">
                <p>No items found in {selectedCategory} category.</p>
                <button 
                  onClick={handleShowAll}
                  className="show-all-button"
                >
                  View All Items
                </button>
              </div>
            )
          ) : (
            items.map((item) => (
              <Card 
                key={item.FoodID}
                id={item.FoodID}
                name={item.FoodName}
                price={item.Price}
                imgs={item.ImageName}
              />
            ))
          )}
        </div>
      </div> */}
    </div>
  )
}

export default Home