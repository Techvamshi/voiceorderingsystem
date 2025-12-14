import React, { useContext } from 'react'
import './CardCSS.css'
import { GlobalState } from '../App'

const Card = ({ id, name, price, imgs }) => {
  const { count, setCount } = useContext(GlobalState)
  const counting = count[id] || 0

  return (
    <div className="card">
      <div className="card-wrapper">
        {/* Base card */}
        <img src="card.svg" className="CardOuter" alt="Base card" />

        {/* Text */}
        <div className="card-text">
          {name.split(' ')[3]} <br />
          {name.split(' ')[4]}
        </div>

        {/* ADD / COUNTER BUTTON */}
        {counting > 0 ? (
          <div className="counter-wrapper">
            <button
              className="counter-btn"
              onClick={() =>
                setCount((prev) => ({ ...prev, [id]: counting - 1 }))
              }
            >
              -
            </button>

            <span className="counter-value">{counting}</span>

            <button
              className="counter-btn"
              onClick={() =>
                setCount((prev) => ({ ...prev, [id]: counting + 1 }))
              }
            >
              +
            </button>
          </div>
        ) : (
          <button
            className="card-button"
            onClick={() =>
              setCount((prev) => ({ ...prev, [id]: 1 }))
            }
          >
            ADD
          </button>
        )}

        {/* Card 2 + content */}
        <div className="card2-wrapper">
          <img src="card2.svg" className="CardOuter2" alt="Top card" />

          {/* Product Image */}
          <img
            src={imgs}
            alt={name}
            className="card2-content"
          />

          {/* Price */}
          <span className="pricing">$ {price}</span>
        </div>
      </div>
    </div>
  )
}

export default Card;
