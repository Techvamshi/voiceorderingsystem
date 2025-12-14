// LoginPage.jsx
import React, { useState } from 'react';
import gsap from 'gsap';
import './LoginPage.css';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login/signup logic here
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    // Animation for mode switch
    gsap.fromTo('.login-container',
      { scale: 0.95, opacity: 0.8 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  };

  return (
    <div className="login-page">
      {/* Background Pattern */}
      <div className="login-bg-pattern"></div>
      
      {/* Animated Orbs */}
      <div className="login-orb orb-1"></div>
      <div className="login-orb orb-2"></div>
      <div className="login-orb orb-3"></div>

      <div className="login-wrapper">
        {/* Brand Header */}
        <div className="login-brand">
          <h1 className="login-brand-name">SKIPP</h1>
          <p className="login-brand-tagline">Fast Fashion Delivery</p>
        </div>

        <div className="login-container">
          {/* Toggle Switch */}
          <div className="login-toggle">
            <button
              className={`toggle-btn ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`toggle-btn ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
            <div className={`toggle-slider ${isLogin ? 'login' : 'signup'}`}></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
              />
            </div>

            {!isLogin && (
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  required={!isLogin}
                />
              </div>
            )}

            {isLogin && (
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
            )}

            <button type="submit" className="login-submit-btn">
              {isLogin ? 'Login' : 'Create Account'}
              <span className="btn-arrow">→</span>
            </button>

            {/* Social Login */}
            <div className="social-login">
              <div className="divider">
                <span>or continue with</span>
              </div>
              <div className="social-buttons">
                <button type="button" className="social-btn google">
                  <span className="social-icon">G</span>
                  Google
                </button>
                <button type="button" className="social-btn apple">
                  <span className="social-icon"></span>
                  Apple
                </button>
              </div>
            </div>

            {/* Terms for Signup */}
            {!isLogin && (
              <p className="terms-text">
                By creating an account, you agree to our 
                <a href="#"> Terms</a> and 
                <a href="#"> Privacy Policy</a>
              </p>
            )}
          </form>

          {/* Mode Toggle */}
          <div className="mode-toggle">
            <p>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button onClick={toggleMode} className="mode-toggle-btn">
                {isLogin ? 'Sign Up' : 'Login'}
              </button>
            </p>
          </div>

          {/* App Download CTA */}
         
        </div>
      </div>
    </div>
  );
};

export default LoginPage;