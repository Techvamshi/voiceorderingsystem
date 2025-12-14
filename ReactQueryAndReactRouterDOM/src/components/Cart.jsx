import React, { useContext } from 'react'
import { GlobalState } from '../App'
import Card from './Card'

const Cart = () => {
  const { count, items } = useContext(GlobalState);
  
  const cartItems = Object.keys(count)
    .filter(key => count[key] > 0)
    .map(key => {
      const item = items.find(item => item.FoodID == key); 
      return {
        id: key,
        count: count[key],
        ...item 
      };
    })
    .filter(item => item); 

  return (
    <div className='CardsSection'> 
      {cartItems.length > 0 ? (
        cartItems.map(item => ( 
          <Card 
            key={item.FoodID} 
            id={item.FoodID}
            price={item.Price}
            name={item.FoodName}
            imgs={item.ImageName}
          />
        ))
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;