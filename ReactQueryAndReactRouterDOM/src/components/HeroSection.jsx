import React, { useState } from 'react'
import "./HeroSect.css"

const HeroSection = () => {
  const [hoverTimer, setHoverTimer] = useState(false);

  return (
    <div className='HeroContainer'>
      {/* Abstract Background Patterns */}
      <div className='BackgroundPatterns'>
        <div className='Pattern pattern1'></div>
        <div className='Pattern pattern2'></div>
        <div className='Pattern pattern3'></div>
      </div>
      
      {/* Main Content */}
      <div className='HeroContent'>
        
        {/* Left Column */}
        <div className='HeroLeft'>
          
          {/* Brand Header with Edgy Style */}
          <div className='BrandHeader'>
            <div className='BrandName'>ECHO<span className='BrandAccent'>EATS</span></div>
            <div className='BrandTagline'>ULTRA-FAST FOOD DELIVERY</div>
          </div>

          {/* Main Message with Gen Z Typography */}
          <div className='MainMessage'>
            <h2 className='HeroTitle'>
              <span className='TitleLine'>RESTAURANT QUALITY,</span>
              <span className='TitleLine Highlight'>DELIVERED FAST</span>
              <span className='TitleLine Timer'>20 MIN </span>
            </h2>
            
            <p className='HeroDescription'>
              Gourmet meals with unprecedented speed. 
              From premium kitchens to your doorstep in <span className='BoldText'>under 20 minutes</span>.
            </p>
          </div>

          {/* Action Buttons - Blocky Style */}
          <div className='ActionButtons'>
            <button className='PrimaryButton'>
              <span>ORDER NOW</span>
              <div className='ButtonIcon'>⚡</div>
            </button>
          </div>

          {/* Features Grid - Boxy Cards */}
          <div className='FeaturesGrid'>
            <div className='FeatureCard'>
              <div className='FeatureIconBox'>⚡</div>
              <div className='FeatureContent'>
                <div className='FeatureTitle'>ULTRA-FAST</div>
                <div className='FeatureDesc'>20 min delivery</div>
              </div>
              <div className='FeatureGlow'></div>
            </div>
            <div className='FeatureCard'>
              <div className='FeatureIconBox'>👨‍🍳</div>
              <div className='FeatureContent'>
                <div className='FeatureTitle'>CHEF-CRAFTED</div>
                <div className='FeatureDesc'>Restaurant quality</div>
              </div>
              <div className='FeatureGlow'></div>
            </div>
            <div className='FeatureCard'>
              <div className='FeatureIconBox'>🌡️</div>
              <div className='FeatureContent'>
                <div className='FeatureTitle'>HOT & FRESH</div>
                <div className='FeatureDesc'>Temperature controlled</div>
              </div>
              <div className='FeatureGlow'></div>
            </div>
          </div>
        </div>

        {/* Right Column - Product Cards */}
        <div className='HeroRight'>
          <div className='VisualContainer'>
            {/* Floating Food Cards */}
            <div className='ProductCards'>
              <div className='Card card1'>
                <div className='CardBadge'>CHEF'S PICK</div>
                <div className='CardImage'><img src="01_Margherita.jpeg" alt="Gourmet Burger" /></div>
                <div className='CardLabel'>SIGNATURE</div>
              </div>
              
              <div className='Card card2'>
                <div className='CardBadge'>TRENDING</div>
                <div className='CardImage'><img src="07_ChickenBiryani.jpeg" alt="Artisan Pizza" /></div>
                <div className='CardLabel'>ITALIAN</div>
              </div>
              
              <div className='Card card3'>
                <div className='CardBadge'>HEALTHY</div>
                <div className='CardImage'><img src="08_Thali.jpeg" alt="Premium Salad" /></div>
                <div className='CardLabel'>FRESH</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection