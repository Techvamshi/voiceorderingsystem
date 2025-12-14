// AboutPage.jsx
import React from 'react'
import './AboutPage.css'

const AboutPage = () => {
  const milestones = [
    { year: '2023', title: 'Founded', description: 'SKIPP was born with a vision to revolutionize fashion delivery' },
    { year: '2024', title: 'First 1000 Orders', description: 'Delivered 1000+ orders with 30-min guarantee' },
    { year: '2024', title: '5 Cities Launch', description: 'Expanded operations to 5 major metropolitan cities' },
    { year: '2025', title: '1M+ Customers', description: 'Trusted by over 1 million satisfied customers' }
  ]

  const values = [
    {
      icon: '⚡',
      title: 'Speed',
      description: '30-minute delivery isn\'t just a promise, it\'s our standard.'
    },
    {
      icon: '👑',
      title: 'Quality',
      description: 'Premium fashion that doesn\'t compromise on excellence.'
    },
    {
      icon: '💝',
      title: 'Customer First',
      description: 'Every decision starts with our customer\'s satisfaction.'
    },
    {
      icon: '🌱',
      title: 'Innovation',
      description: 'Constantly evolving to deliver better experiences.'
    }
  ]

  return (
    <div className="aboutContainer">
      {/* Hero Section */}
      <div className="aboutHero">
        <div className="heroContent">
          <div className="heroBadge">
            <span>Our Story</span>
          </div>
          <h1 className="heroTitle">
            Redefining Fashion
            <span className="highlight"> Delivery</span>
          </h1>
          <p className="heroDescription">
            SKIPP was born from a simple idea: great fashion should be instant. 
            In a world where everything moves fast, why should your wardrobe wait?
          </p>
        </div>
        <div className="heroStats">
          <div className="statItem">
            <div className="statNumber">30</div>
            <div className="statLabel">Minute Delivery</div>
          </div>
          <div className="statItem">
            <div className="statNumber">1M+</div>
            <div className="statLabel">Happy Customers</div>
          </div>
          <div className="statItem">
            <div className="statNumber">24/7</div>
            <div className="statLabel">Service</div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="missionSection">
        <div className="missionContent">
          <h2 className="sectionTitle">Our Mission</h2>
          <p className="missionText">
            To make luxury fashion accessible at the speed of thought. 
            We're not just delivering clothes; we're delivering confidence, 
            style, and moments that matter—all within 30 minutes.
          </p>
          <div className="missionQuote">
            "Fashion that keeps up with your life, not the other way around."
          </div>
        </div>
        <div className="missionVisual">
          <div className="visualGrid">
            <div className="gridItem item1"></div>
            <div className="gridItem item2"></div>
            <div className="gridItem item3"></div>
            <div className="gridItem item4"></div>
          </div>
        </div>
      </div>

      {/* Founders Section */}
      <div className="foundersSection">
        <div className="sectionHeader">
          <h2 className="sectionTitle">The Visionaries</h2>
          <p className="sectionSubtitle">
            Meet the minds behind the 30-minute fashion revolution
          </p>
        </div>

        <div className="foundersGrid">
          {/* Founder 1 */}
          <div className="founderCard">
            <div className="founderImageContainer">
              <div className="founderImagePlaceholder">
                <div className="imageInitial">VC</div>
              </div>
              <div className="founderSocial">
                <a 
                  href="https://www.linkedin.com/in/varun-chauhan-772398237/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="socialLink"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div className="founderInfo">
              <div className="founderRole">Founder & CEO</div>
              <h3 className="founderName">Varun Chauhan</h3>
              <p className="founderBio">
                With a background in logistics and a passion for fashion, 
                Varun envisioned a world where style meets speed. His leadership 
                drives SKIPP's innovative delivery solutions.
              </p>
              <div className="founderQuote">
                "If we can deliver food in 30 minutes, why not fashion?"
              </div>
            </div>
            <div className="founderAccent"></div>
          </div>

          {/* Founder 2 */}
          <div className="founderCard">
            <div className="founderImageContainer">
              <div className="founderImagePlaceholder">
                <div className="imageInitial">AK</div>
              </div>
              <div className="founderSocial">
                <a 
                  href="https://www.linkedin.com/in/abhishekkumar-dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="socialLink"
                >
                  LinkedIn ↗
                </a>
              </div>
            </div>
            <div className="founderInfo">
              <div className="founderRole">Co-Founder & CTO</div>
              <h3 className="founderName">Abhishek Kumar</h3>
              <p className="founderBio">
                Tech visionary who built the backbone of SKIPP's delivery network. 
                His expertise in scalable systems ensures seamless 30-minute deliveries.
              </p>
              <div className="founderQuote">
                "Technology should simplify life, not complicate it."
              </div>
            </div>
            <div className="founderAccent"></div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="valuesSection">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Our Values</h2>
          <p className="sectionSubtitle">
            The principles that guide every delivery
          </p>
        </div>
        <div className="valuesGrid">
          {values.map((value, index) => (
            <div key={index} className="valueCard">
              <div className="valueIcon">{value.icon}</div>
              <h3 className="valueTitle">{value.title}</h3>
              <p className="valueDescription">{value.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      <div className="timelineSection">
        <div className="sectionHeader">
          <h2 className="sectionTitle">Our Journey</h2>
          <p className="sectionSubtitle">
            From an idea to a fashion revolution
          </p>
        </div>
        <div className="timeline">
          {milestones.map((milestone, index) => (
            <div key={index} className="timelineItem">
              <div className="timelineDot"></div>
              <div className="timelineContent">
                <div className="timelineYear">{milestone.year}</div>
                <h3 className="timelineTitle">{milestone.title}</h3>
                <p className="timelineDescription">{milestone.description}</p>
              </div>
              {index < milestones.length - 1 && <div className="timelineConnector"></div>}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="aboutCTA">
        <div className="ctaContent">
          <h2 className="ctaTitle">Join the Revolution</h2>
          <p className="ctaDescription">
            Experience fashion at the speed of now. Download our app and get 
            your first delivery in 30 minutes or less.
          </p>
          <div className="ctaButtons">
            <button className="ctaButton primary">
              Download App
            </button>
            <button className="ctaButton secondary">
              Explore Careers
            </button>
          </div>
        </div>
        <div className="ctaPattern"></div>
      </div>
    </div>
  )
}

export default AboutPage