import React, { useState, useContext, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../App';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import './VoiceAssistant.css';

const playAudioFromText = async (text) => {
  try {
    const encodedText = encodeURIComponent(text);
    const googleTTSUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&q=${encodedText}&tl=en`;
    
    const audio = new Audio(googleTTSUrl);
    audio.crossOrigin = 'anonymous';
    
    return new Promise((resolve, reject) => {
      audio.onended = resolve;
      audio.onerror = reject;
      audio.play().catch(reject);
    });
  } catch (error) {
    console.error('Google TTS failed:', error);
    throw error;
  }
};

const VoiceAssistant = () => {
  const navigate = useNavigate();
  const { count, setCount, items, handleVoiceCommandResult } = useContext(GlobalState);
  const [isListening, setIsListening] = useState(false);
  const [assistantResponse, setAssistantResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [speechMethod, setSpeechMethod] = useState('native'); 
  const [hasGreeted, setHasGreeted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true); // New state for minimized view
  
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();
  
  useEffect(() => {
    const initializeSpeech = () => {
      if ('speechSynthesis' in window) {
        try {
          const voices = speechSynthesis.getVoices();
          
          if (voices.length > 0) {
            console.log('Native speech synthesis available');
            setSpeechMethod('native');
          } else {
            console.log('No voices available, using Google TTS');
            setSpeechMethod('google');
          }
        } catch (error) {
          console.log('Native speech failed, using Google TTS');
          setSpeechMethod('google');
        }
      } else {
        console.log('Speech synthesis not supported, using Google TTS');
        setSpeechMethod('google');
      }
    };
    
    initializeSpeech();
    
    if (!hasGreeted) {
      setTimeout(() => {
        const greeting = "Hello! I am your voice assistant. How can I help you today?";
        setAssistantResponse(greeting);
        speakResponse(greeting);
        setHasGreeted(true);
      }, 1000);
    }
  }, [hasGreeted]);
  
  const processVoiceCommand = useCallback(async (command) => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:3000/voice/command', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ command })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setAssistantResponse(data.response.message);
        
        if (data.response.action === "NAVIGATE_TO" && data.response.navigationTarget) {
          const target = data.response.navigationTarget;
          switch(target) {
            case "Cart":
              navigate('/Cart');
              break;
            case "First":
              navigate('/First');
              break;
            case "Second":
              navigate('/Second');
              break;
            case "Home":
            default:
              navigate('/');
              break;
          }
        }
        
        if (data.response.action === "SHOW_CATEGORY" && data.response.category) {
          navigate('/');
          window.dispatchEvent(new CustomEvent('categorySelected', { 
            detail: { 
              category: data.response.category,
              action: 'showCategory'
            } 
          }));
        }
        
        if (data.response.action === "SHOW_ALL_CATEGORIES") {
          navigate('/');
          window.dispatchEvent(new CustomEvent('categorySelected', { 
            detail: { 
              category: null, 
              action: 'showAllCategories'
            } 
          }));
        }
        
        if (handleVoiceCommandResult) {
          handleVoiceCommandResult(data);
        }
        
        if (data.actionPerformed && data.updatedItems) {
          const newCount = { ...count };
          data.updatedItems.forEach(item => {
            newCount[item.foodId] = item.newQuantity;
          });
          setCount(newCount);
        }
        
        speakResponse(data.response.message);
        
      } else {
        setAssistantResponse(data.message || 'Sorry, I encountered an error.');
        speakResponse('Sorry, I encountered an error.');
      }
    } catch (error) {
      console.error('Error processing voice command:', error);
      setAssistantResponse('Sorry, I could not connect to the server.');
      speakResponse('Sorry, I could not connect to the server.');
    } finally {
      setIsProcessing(false);
    }
  }, [navigate, count, setCount, handleVoiceCommandResult]);
  
  const speakResponse = useCallback(async (text) => {
    setIsSpeaking(true);
    
    try {
      if (speechMethod === 'native') {
        // Use native speech synthesis
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => {
          setIsSpeaking(false);
          setSpeechMethod('google');
          speakResponse(text);
        };
        
        window.speechSynthesis.speak(utterance);
        
      } else if (speechMethod === 'google') {
        // Use Google TTS
        try {
          await playAudioFromText(text);
          setIsSpeaking(false);
        } catch (error) {
          console.error('Google TTS failed:', error);
          setIsSpeaking(false);
         
        }
      }
    } catch (error) {
      console.error('Speech failed:', error);
      setIsSpeaking(false);
    }
  }, [speechMethod]);
  
  const startListening = () => {
    // Expand if minimized
    if (isMinimized) {
      setIsMinimized(false);
    }
    
    // Cancel any ongoing speech
    if (window.speechSynthesis && window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
    
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ 
      continuous: true,
      language: 'en-US'
    });
  };
  
  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
    
    if (transcript.trim()) {
      processVoiceCommand(transcript);
    } else {
      const message = "I didn't hear anything. Please try again.";
      setAssistantResponse(message);
      speakResponse(message);
    }
  };
  
  useEffect(() => {
    if (!listening && transcript && isListening) {
      const timer = setTimeout(() => {
        stopListening();
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [listening, transcript, isListening]);
  
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
    // Stop listening if minimizing while listening
    if (isListening && isMinimized === false) {
      stopListening();
    }
  };
  
  // If minimized, show only a small floating button
  if (isMinimized) {
    return (
      <div className="voice-assistant-minimized">
        <button
          className="minimized-voice-button"
          onClick={toggleMinimize}
          title="Open Voice Assistant"
        >
          <span className="mic-icon">🎤</span>
          {isSpeaking && <span className="minimized-pulse"></span>}
        </button>
        {isSpeaking && (
          <div className="minimized-speaking-indicator">
            🔊 Speaking...
          </div>
        )}
      </div>
    );
  }
  
  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="voice-assistant">
        <div className="voice-header">
          <h3>🎤 Voice Assistant</h3>
          <button className="minimize-button" onClick={toggleMinimize}>
            −
          </button>
        </div>
        <div className="browser-warning">
          ⚠️ Your browser doesn't support speech recognition. 
          Try using Chrome, Edge, or Safari.
        </div>
      </div>
    );
  }
  
  return (
    <div className="voice-assistant">
      <div className="voice-header">
        <h3>🎤 Voice Assistant</h3>
        <div className="header-controls">
          <button className="minimize-button" onClick={toggleMinimize} title="Minimize">
            −
          </button>
        </div>
        <p className="voice-subtitle">
          Speak your command
          {speechMethod === 'google' && ' (Using Google TTS)'}
        </p>
      </div>
      
      <div className="voice-controls">
        <button
          className={`listen-button ${isListening ? 'listening' : ''}`}
          onClick={isListening ? stopListening : startListening}
          disabled={isProcessing}
        >
          {isListening ? (
            <>
              <span className="pulse-icon"></span>
              Listening... Click to Stop
            </>
          ) : isProcessing ? (
            'Processing...'
          ) : (
            '🎤 Start Voice Command'
          )}
        </button>
        
        {isListening && (
          <div className="listening-indicator">
            <div className="sound-wave">
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
              <div className="bar"></div>
            </div>
            <span>Speak now...</span>
          </div>
        )}
        
        {isProcessing && (
          <div className="processing-indicator">
            <div className="spinner"></div>
            Processing your command...
          </div>
        )}
      </div>
      
      {transcript && (
        <div className="voice-transcript">
          <div className="transcript-label">You said:</div>
          <div className="transcript-text">"{transcript}"</div>
        </div>
      )}
      
      {assistantResponse && (
        <div className="assistant-response">
          <div className="response-label">Assistant:</div>
          <div className="response-text">{assistantResponse}</div>
          {isSpeaking && (
            <div className="speaking-indicator">
              <span className="sound-icon">🔊</span> 
              {speechMethod === 'google' ? 'Playing...' : 'Speaking...'}
            </div>
          )}
        </div>
      )}
      
      <div className="voice-tips">
        <small>
          💡 <strong>Try saying:</strong> "Go to menu", "Show t-shirts", "Add 2 shirts men", "Go to cart"
        </small>
      </div>
    </div>
  );
};

export default VoiceAssistant;