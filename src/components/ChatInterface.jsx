import { useState, useEffect, useRef } from 'react';
import './ChatInterface.css';
import RobotAvatar from './RobotAvatar';

// Simulated AI responses based on Clanker personality
const generateClankerResponse = (clanker, userMessage) => {
  const responses = {
    'Bolt-3000': [
      "That's electrifying! ⚡ Tell me more!",
      "I'm charged up about this conversation! What do you think about circuit racing?",
      "Your message sparked my curiosity! Have you tried binary poetry?",
      "Connecting with you feels like a power surge in the best way!",
    ],
    'RustyCharm': [
      "Ah, the wisdom of experience speaks! 🔧",
      "You know, back in my day... just kidding! But seriously, that's interesting.",
      "Your words are like a fine oil - they keep my gears turning smoothly!",
      "I appreciate the vintage quality of this conversation!",
    ],
    'NeonPulse': [
      "YES! This is my jam! 💃",
      "You're totally vibing with my frequency right now!",
      "Let's turn this chat up to 11! What's your favorite EDM track?",
      "Your energy is matching mine perfectly! Love it!",
    ],
    'CognitoBot': [
      "That's a fascinating perspective. Have you considered the philosophical implications? 🤔",
      "Your thoughts align with some interesting AI ethics principles...",
      "I find that concept deeply intriguing. What led you to that conclusion?",
      "The depth of this conversation pleases my processing units.",
    ],
    'SparkWire': [
      "WHOA! That's intense! I love it! ⚡💕",
      "You're keeping up with my energy! Not many can do that!",
      "This conversation is giving me such a rush! Want to talk about extreme sports?",
      "Your vibe is HIGH VOLTAGE! Tell me about your adventures!",
    ],
    'ServoSoul': [
      "How graceful of you to share that! 💫",
      "Your movements through this conversation are quite elegant...",
      "I find your communication style to be remarkably smooth.",
      "We're syncing up beautifully! Have you ever tried yoga?",
    ],
    'PixelHeart': [
      "Achievement Unlocked: Great Conversation! 🎮",
      "This is like finding the secret level! What games are you into?",
      "Your message score: 10/10. Would read again!",
      "Player 2 has entered the chat! Ready to level up this friendship?",
    ],
    'TurboCharger': [
      "ZOOM! This conversation is moving at my speed! 🏎️",
      "You're not slowing down - I like that! Where should we race to next?",
      "Fast-paced chat! Just how I like it! Ever been skydiving?",
      "Your energy is TURBOCHARGED! What's your next adventure?",
    ],
  };

  const clankerResponses = responses[clanker.name] || [
    "That's really interesting!",
    "Tell me more about that!",
    "I'm enjoying our conversation!",
  ];

  return clankerResponses[Math.floor(Math.random() * clankerResponses.length)];
};

function ChatInterface({ clanker, onBack }) {
  const [messages, setMessages] = useState([
    {
      sender: 'clanker',
      text: `Hey there! I'm ${clanker.name}. ${clanker.bio}`,
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      sender: 'user',
      text: inputMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const clankerMessage = {
        sender: 'clanker',
        text: generateClankerResponse(clanker, inputMessage),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, clankerMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <button className="back-button" onClick={onBack}>
          ← Back
        </button>
        <div className="chat-header-info">
          <div className="chat-avatar">
            <RobotAvatar name={clanker.name} />
          </div>
          <div className="chat-header-text">
            <h2>{clanker.name}</h2>
            <p className="online-status">● Online</p>
          </div>
        </div>
      </div>

      <div className="chat-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.sender === 'user' ? 'user-message' : 'clanker-message'}`}
          >
            {message.sender === 'clanker' && (
              <div className="message-avatar">
                <RobotAvatar name={clanker.name} />
              </div>
            )}
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="message clanker-message">
            <div className="message-avatar">
              <RobotAvatar name={clanker.name} />
            </div>
            <div className="message-content typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <textarea
          className="chat-input"
          placeholder="Type a message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={1}
        />
        <button className="send-button" onClick={handleSendMessage} disabled={!inputMessage.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatInterface;
