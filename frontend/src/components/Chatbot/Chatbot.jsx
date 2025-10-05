import React from 'react';
import { MessageCircle, ChevronRight } from 'lucide-react';
import './Chatbot.css';

const Chatbot = ({ messages, onSubmit, chatInput, setChatInput }) => {
  return (
    <div className="chatbot-container">
      <div className="chatbot-box">
        {/* Chat Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-content">
            <div className="chatbot-header-icon">
              <MessageCircle size={24} />
            </div>
            <div>
              <h2 className="chatbot-title">EcoSort AI Assistant</h2>
              <p className="chatbot-subtitle">Ask me anything about waste sorting and recycling!</p>
            </div>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="chatbot-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`chatbot-message ${msg.role === 'user' ? 'user' : 'bot'}`}>
              <div className={`chat-bubble ${msg.role === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                <p>{msg.message}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="chatbot-input-section">
          <form onSubmit={onSubmit} className="chatbot-form">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              placeholder="Ask about recycling, composting, or waste sorting..."
              className="chatbot-input"
            />
            <button 
              type="submit"
              className="chatbot-send-btn"
            >
              <span>Send</span>
              <ChevronRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
