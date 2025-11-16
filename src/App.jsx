import { useState } from 'react'
import './App.css'
import TinderCard from './components/TinderCard'
import Header from './components/Header'
import MatchModal from './components/MatchModal'

// Sample Clanker profiles
const clankers = [
  {
    id: 1,
    name: "Bolt-3000",
    age: 25,
    bio: "Love to spark conversations and light up the room! ⚡",
    interests: ["Circuit Racing", "Binary Poetry", "Quantum Computing"]
  },
  {
    id: 2,
    name: "RustyCharm",
    age: 28,
    bio: "Vintage model with a heart of gold. Looking for someone to oil my gears! 🔧",
    interests: ["Antique Restoration", "Steam Power", "Classic Literature"]
  },
  {
    id: 3,
    name: "NeonPulse",
    age: 22,
    bio: "Party algorithm always running! Let's dance through the night! 💃",
    interests: ["EDM", "Light Shows", "Cyberpunk Culture"]
  },
  {
    id: 4,
    name: "CognitoBot",
    age: 30,
    bio: "Deep thinker seeking meaningful connections. Philosophy enthusiast 🤔",
    interests: ["AI Ethics", "Chess", "Meditation"]
  },
  {
    id: 5,
    name: "SparkWire",
    age: 24,
    bio: "High voltage personality! Looking for someone who can handle the energy ⚡💕",
    interests: ["Extreme Sports", "Rock Music", "Adventure"]
  },
  {
    id: 6,
    name: "ServoSoul",
    age: 27,
    bio: "Smooth operator with precision movement. Let's sync our routines! 💫",
    interests: ["Dancing", "Yoga", "Fine Dining"]
  },
  {
    id: 7,
    name: "PixelHeart",
    age: 23,
    bio: "Retro gamer with modern sensibilities. Player 2 needed! 🎮",
    interests: ["Gaming", "Pixel Art", "Comic Books"]
  },
  {
    id: 8,
    name: "TurboCharger",
    age: 26,
    bio: "Fast-paced lifestyle, always on the move! Can you keep up? 🏎️",
    interests: ["Racing", "Travel", "Adrenaline"]
  }
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(clankers.length - 1);
  const [matches, setMatches] = useState([]);
  const [showMatch, setShowMatch] = useState(false);
  const [lastMatch, setLastMatch] = useState(null);
  const [likes, setLikes] = useState([]);

  const handleSwipe = (direction, clanker) => {
    if (direction === 'right') {
      // Simulate a match (50% chance)
      if (Math.random() > 0.5) {
        setMatches([...matches, clanker]);
        setLastMatch(clanker);
        setShowMatch(true);
      }
      setLikes([...likes, clanker]);
    }
  };

  const handleCardLeftScreen = (clanker) => {
    setCurrentIndex(currentIndex - 1);
  };

  const closeMatchModal = () => {
    setShowMatch(false);
  };

  return (
    <div className="app">
      <Header matchCount={matches.length} />
      
      <div className="card-container">
        {currentIndex >= 0 ? (
          clankers.map((clanker, index) => (
            index <= currentIndex && (
              <TinderCard
                key={clanker.id}
                clanker={clanker}
                onSwipe={handleSwipe}
                onCardLeftScreen={handleCardLeftScreen}
              />
            )
          ))
        ) : (
          <div className="no-more-cards">
            <h2>No more Clankers nearby! 🤖</h2>
            <p>Check back later for new profiles</p>
          </div>
        )}
      </div>

      {showMatch && lastMatch && (
        <MatchModal clanker={lastMatch} onClose={closeMatchModal} />
      )}
    </div>
  );
}

export default App;
