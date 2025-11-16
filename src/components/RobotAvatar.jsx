// Simple robot avatar generator component
function RobotAvatar({ name, color = "#667eea" }) {
  const seed = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Generate colors based on name
  const hue = seed % 360;
  const backgroundColor = `hsl(${hue}, 70%, 85%)`;
  const primaryColor = `hsl(${hue}, 70%, 60%)`;
  const secondaryColor = `hsl(${(hue + 60) % 360}, 70%, 50%)`;
  
  // Randomize features based on name
  const eyeType = seed % 3;
  const antennaType = Math.floor(seed / 10) % 3;
  const mouthType = Math.floor(seed / 100) % 3;
  
  return (
    <svg width="100%" height="100%" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      {/* Background */}
      <rect width="200" height="200" fill={backgroundColor} />
      
      {/* Robot Head */}
      <rect x="50" y="60" width="100" height="90" rx="10" fill={primaryColor} />
      
      {/* Antenna */}
      {antennaType === 0 && (
        <>
          <line x1="100" y1="60" x2="100" y2="40" stroke={secondaryColor} strokeWidth="4" />
          <circle cx="100" cy="35" r="6" fill={secondaryColor} />
        </>
      )}
      {antennaType === 1 && (
        <>
          <line x1="80" y1="60" x2="70" y2="35" stroke={secondaryColor} strokeWidth="4" />
          <circle cx="70" cy="30" r="5" fill={secondaryColor} />
          <line x1="120" y1="60" x2="130" y2="35" stroke={secondaryColor} strokeWidth="4" />
          <circle cx="130" cy="30" r="5" fill={secondaryColor} />
        </>
      )}
      {antennaType === 2 && (
        <>
          <rect x="95" y="35" width="10" height="25" fill={secondaryColor} />
          <circle cx="100" cy="30" r="8" fill={secondaryColor} />
        </>
      )}
      
      {/* Eyes */}
      {eyeType === 0 && (
        <>
          <circle cx="75" cy="90" r="8" fill="#fff" />
          <circle cx="125" cy="90" r="8" fill="#fff" />
          <circle cx="75" cy="90" r="4" fill="#000" />
          <circle cx="125" cy="90" r="4" fill="#000" />
        </>
      )}
      {eyeType === 1 && (
        <>
          <rect x="65" y="85" width="15" height="10" fill="#000" />
          <rect x="120" y="85" width="15" height="10" fill="#000" />
        </>
      )}
      {eyeType === 2 && (
        <>
          <line x1="65" y1="90" x2="85" y2="90" stroke="#000" strokeWidth="4" strokeLinecap="round" />
          <line x1="115" y1="90" x2="135" y2="90" stroke="#000" strokeWidth="4" strokeLinecap="round" />
        </>
      )}
      
      {/* Mouth */}
      {mouthType === 0 && (
        <rect x="80" y="120" width="40" height="8" rx="4" fill="#000" />
      )}
      {mouthType === 1 && (
        <path d="M 75 120 Q 100 130 125 120" stroke="#000" strokeWidth="4" fill="none" />
      )}
      {mouthType === 2 && (
        <>
          <rect x="75" y="118" width="10" height="8" fill="#000" />
          <rect x="90" y="118" width="10" height="8" fill="#000" />
          <rect x="105" y="118" width="10" height="8" fill="#000" />
          <rect x="120" y="118" width="10" height="8" fill="#000" />
        </>
      )}
      
      {/* Body indicator */}
      <rect x="90" y="145" width="20" height="5" fill={secondaryColor} />
    </svg>
  );
}

export default RobotAvatar;
