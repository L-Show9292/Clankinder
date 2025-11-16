import './Header.css';

function Header({ matchCount }) {
  return (
    <header className="header">
      <div className="logo">
        <h1>🤖 Clankinder</h1>
      </div>
      <div className="match-counter">
        <span className="match-icon">💕</span>
        <span className="match-count">{matchCount}</span>
      </div>
    </header>
  );
}

export default Header;
