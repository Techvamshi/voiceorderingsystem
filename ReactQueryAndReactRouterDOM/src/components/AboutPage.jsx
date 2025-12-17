// AboutPage.jsx
import React from 'react'
import './AboutPage.css'

const AboutPage = () => {
  const milestones = [
    { year: '2023', title: 'Founded', description: 'ECHO EATS was born with a vision to revolutionize food delivery' },
    { year: '2024', title: 'First 10,000 Meals', description: 'Delivered 10,000+ restaurant-quality meals with 20-min guarantee' },
    { year: '2024', title: '8 Cities Launch', description: 'Expanded operations to 8 major metropolitan cities' },
    { year: '2025', title: '500K+ Customers', description: 'Trusted by over 500,000 satisfied food lovers' }
  ]

  const values = [
    {
      icon: '⚡',
      title: 'Speed',
      description: '20-minute delivery isn\'t just a promise, it\'s our standard.'
    },
    {
      icon: '👨‍🍳',
      title: 'Quality',
      description: 'Restaurant-grade meals that don\'t compromise on taste or freshness.'
    },
    {
      icon: '💝',
      title: 'Customer First',
      description: 'Every decision starts with our customer\'s dining satisfaction.'
    },
    {
      icon: '🌱',
      title: 'Innovation',
      description: 'Constantly evolving to deliver better culinary experiences.'
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
            Redefining Food
            <span className="highlight"> Delivery</span>
          </h1>
          <p className="heroDescription">
            ECHO EATS was born from a simple idea: gourmet food should be instant. 
            In a world where everything moves fast, why should your dining experience wait?
          </p>
        </div>
        <div className="heroStats">
          <div className="statItem">
            <div className="statNumber">20</div>
            <div className="statLabel">Minute Delivery</div>
          </div>
          <div className="statItem">
            <div className="statNumber">500K+</div>
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
            To make restaurant-quality dining accessible at the speed of thought. 
            We're not just delivering food; we're delivering experiences, 
            flavors, and moments that matter—all within 20 minutes.
          </p>
          <div className="missionQuote">
            "Restaurant-quality meals that keep up with your life, not the other way around."
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
            Meet the minds behind the 20-minute culinary revolution
          </p>
        </div>

        <div className="foundersGrid">
          {/* Founder 1 */}
          <div className="founderCard">
            <div className="founderImageContainer">
              <div className="founderImagePlaceholder">
                <div className="imageInitial">YS</div>
              </div>
              <div className="founderSocial">
                <a 
                  href="https://www.linkedin.com/in/yashaswini-sajjanshettar/" 
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
              <h3 className="founderName">Yashaswini Sajjanshettar</h3>
              <p className="founderBio">
                With a background in culinary arts and hospitality management, 
                Yashaswini envisioned a world where gourmet dining meets speed. 
                Her leadership drives ECHO EATS's innovative food delivery solutions.
              </p>
              <div className="founderQuote">
                "If we can deliver instant messaging, why not instant fine dining?"
              </div>
            </div>
            <div className="founderAccent"></div>
          </div>

          {/* Founder 2 */}
          <div className="founderCard">
            <div className="founderImageContainer">
              <div className="founderImagePlaceholder">
                <div className="imageInitial">VD</div>
              </div>
              <div className="founderSocial">
                <a 
                  href="https://www.linkedin.com/in/duvamshi/" 
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
              <h3 className="founderName">Vamshi D U</h3>
              <p className="founderBio">
                Tech visionary who built the backbone of ECHO EATS's delivery network. 
                His expertise in scalable systems ensures seamless 20-minute deliveries 
                while maintaining food quality and temperature.
              </p>
              <div className="founderQuote">
                "Technology should enhance dining experiences, not complicate them."
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
            The principles that guide every meal delivery
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
            From an idea to a culinary revolution
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
          <h2 className="ctaTitle">Join the Culinary Revolution</h2>
          <p className="ctaDescription">
            Experience restaurant-quality meals at the speed of now. Download our app and get 
            your first delivery in 20 minutes or less.
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