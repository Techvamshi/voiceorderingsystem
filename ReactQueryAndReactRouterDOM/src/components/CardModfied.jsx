import React from 'react'
import './CardCSS.css'

const CardModfied = () => {
    
  return (
    <div className="card">
      <div className="card-wrapper">
        {/* Base card */}
        <img src="card.svg" className="CardOuter" alt="Base card" />
        <div className="card-text">Margherita  <br />Pizza</div>
        <button className='card-button' >ADD</button>

        {/* Card 2 + content */}
        <div className="card2-wrapper">
          <img src="card2.svg" className="CardOuter2" alt="Top card" />

          {/* Image placed ON card2.svg */}
          <img
            src="01_Margherita.jpeg"
            alt="01_Margherita"
            className="card2-content"
          />
          <span className='pricing'>$</span>
        </div>
        
      </div>
    </div>
  )
}

export default CardModfied
