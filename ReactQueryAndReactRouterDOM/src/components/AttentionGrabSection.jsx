// AttentionGrabSection.jsx
import React, { useState, useEffect } from 'react'
import './AttentionGrabSection.css'

const AttentionGrabSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="attentionGrabContainer">
      {/* Background Glow */}
      <div className="bgGlow"></div>
      
      {/* Main Content */}
      <div className="grabContent">
        
        {/* Left - Flash Badge */}
        <div className="flashBadge">
          <div className="flashIcon">⚡</div>
          <span>FLASH SALE</span>
        </div>

        {/* Center - Main Offer */}
        <div className="mainOffer">
          <h3 className="offerTitle">
            <span className="gradientText">30% OFF</span>
            <span className="onText">ON EVERYTHING</span>
          </h3>
          <p className="offerSubtitle">
            When delivered within 30 minutes
          </p>
          
          {/* Timer */}
          <div className="countdownTimer">
            <div className="timeUnit">
              <div className="timeNumber">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="timeLabel">HOURS</div>
            </div>
            <div className="timeSeparator">:</div>
            <div className="timeUnit">
              <div className="timeNumber">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="timeLabel">MINUTES</div>
            </div>
            <div className="timeSeparator">:</div>
            <div className="timeUnit">
              <div className="timeNumber">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="timeLabel">SECONDS</div>
            </div>
          </div>
        </div>

        {/* Right - CTA */}
        <div className="grabCTA">
          <button className="grabButton">
            <span>GRAB DEAL</span>
            <div className="buttonArrow">→</div>
          </button>
          <div className="soldCounter">
            <div className="soldProgress">
              <div className="progressBar"></div>
            </div>
            <div className="soldText">47 deals claimed</div>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="floatingElement discountTag">-30%</div>
      <div className="floatingElement clockIcon">⏰</div>
    </div>
  )
}

export default AttentionGrabSection