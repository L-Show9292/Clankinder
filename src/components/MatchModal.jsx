import './MatchModal.css';
import RobotAvatar from './RobotAvatar';

function MatchModal({ clanker, onClose }) {
  return (
    <div className="match-modal-overlay" onClick={onClose}>
      <div className="match-modal" onClick={(e) => e.stopPropagation()}>
        <div className="match-content">
          <h1 className="match-title">It's a Match! 🎉</h1>
          
          <div className="match-profile">
            <div className="match-image">
              <RobotAvatar name={clanker.name} />
            </div>
            <h2>{clanker.name}</h2>
            <p className="match-bio">{clanker.bio}</p>
          </div>

          <p className="match-message">
            You and {clanker.name} have liked each other!
          </p>

          <button className="close-button" onClick={onClose}>
            Keep Swiping
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatchModal;
