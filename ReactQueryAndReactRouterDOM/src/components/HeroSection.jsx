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
            <div className='BrandName'>FASHION<span className='BrandAccent'>X</span></div>
            <div className='BrandTagline'>ULTRA-FAST FASHION DELIVERY</div>
          </div>

          {/* Main Message with Gen Z Typography */}
          <div className='MainMessage'>
            <h2 className='HeroTitle'>
              <span className='TitleLine'>YOUR STYLE,</span>
              <span className='TitleLine Highlight'>DELIVERED FAST</span>
              <span className='TitleLine Timer'>30 MIN </span>
            </h2>
            
            <p className='HeroDescription'>
              Premium fashion with unprecedented speed. 
              From curated collections to your doorstep in <span className='BoldText'>half an hour</span>.
            </p>
          </div>

          {/* Action Buttons - Blocky Style */}
          <div className='ActionButtons'>
            <button className='PrimaryButton'>
              <span>SHOP NOW</span>
              <div className='ButtonIcon'>⚡</div>
            </button>
          </div>

          {/* Features Grid - Boxy Cards */}
          <div className='FeaturesGrid'>
            <div className='FeatureCard'>
              <div className='FeatureIconBox'>⚡</div>
              <div className='FeatureContent'>
                <div className='FeatureTitle'>ULTRA-FAST</div>
                <div className='FeatureDesc'>30 min delivery</div>
              </div>
              <div className='FeatureGlow'></div>
            </div>
            <div className='FeatureCard'>
              <div className='FeatureIconBox'>👑</div>
              <div className='FeatureContent'>
                <div className='FeatureTitle'>PREMIUM</div>
                <div className='FeatureDesc'>Top quality only</div>
              </div>
              <div className='FeatureGlow'></div>
            </div>
            <div className='FeatureCard'>
              <div className='FeatureIconBox'>🔄</div>
              <div className='FeatureContent'>
                <div className='FeatureTitle'>NO STRESS</div>
                <div className='FeatureDesc'>Easy returns</div>
              </div>
              <div className='FeatureGlow'></div>
            </div>
          </div>
        </div>

        {/* Right Column - Product Cards */}
        <div className='HeroRight'>
          <div className='VisualContainer'>
            {/* Floating Product Cards */}
            <div className='ProductCards'>
              <div className='Card card1'>
                <div className='CardBadge'>NEW DROP</div>
                <div className='CardImage'><img src="men_tshirt_03.jpeg" alt="Premium T-Shirt" /></div>
                <div className='CardLabel'>ESSENTIALS</div>
              </div>
              
              <div className='Card card2'>
                <div className='CardBadge'>TRENDING</div>
                <div className='CardImage'><img src="women_shirt_03.jpeg" alt="Women's Shirt" /></div>
                <div className='CardLabel'>COLLECTION</div>
              </div>
              
              <div className='Card card3'>
                <div className='CardBadge'>LIMITED</div>
                <div className='CardImage'><img src="men_shirt_01.jpeg" alt="Men's Shirt" /></div>
                <div className='CardLabel'>PREMIUM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection