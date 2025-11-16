import { useState, useRef } from 'react';
import './TinderCard.css';
import RobotAvatar from './RobotAvatar';

function TinderCard({ clanker, onSwipe, onCardLeftScreen }) {
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const cardRef = useRef(null);

  const handleMouseDown = (e) => {
    setStartX(e.clientX || e.touches?.[0]?.clientX);
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.clientX || e.touches?.[0]?.clientX;
    setCurrentX(x - startX);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(currentX) > threshold) {
      const direction = currentX > 0 ? 'right' : 'left';
      setIsLeaving(true);
      onSwipe(direction, clanker);
      
      setTimeout(() => {
        onCardLeftScreen(clanker);
      }, 300);
    } else {
      setCurrentX(0);
    }
  };

  const handleTouchStart = (e) => {
    handleMouseDown(e);
  };

  const handleTouchMove = (e) => {
    handleMouseMove(e);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  const rotation = currentX / 10;
  const opacity = Math.abs(currentX) > 100 ? 0 : 1 - Math.abs(currentX) / 200;

  return (
    <div
      ref={cardRef}
      className={`tinder-card ${isLeaving ? 'leaving' : ''}`}
      style={{
        transform: `translateX(${currentX}px) rotate(${rotation}deg)`,
        opacity: opacity,
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="card-image">
        <RobotAvatar name={clanker.name} />
      </div>
      
      <div className="card-info">
        <h2>{clanker.name}, {clanker.age}</h2>
        <p className="bio">{clanker.bio}</p>
        
        <div className="interests">
          {clanker.interests.map((interest, idx) => (
            <span key={idx} className="interest-tag">{interest}</span>
          ))}
        </div>
      </div>

      {currentX !== 0 && (
        <>
          {currentX > 0 && (
            <div className="swipe-indicator like">LIKE</div>
          )}
          {currentX < 0 && (
            <div className="swipe-indicator nope">NOPE</div>
          )}
        </>
      )}
    </div>
  );
}

export default TinderCard;
