import { useState } from 'react';
import './ProfileCreation.css';
import RobotAvatar from './RobotAvatar';

function ProfileCreation({ onProfileComplete }) {
  const [step, setStep] = useState(1);
  const [profileData, setProfileData] = useState({
    name: '',
    age: '',
    bio: '',
    interests: [],
    photo: null,
    photoPreview: null
  });
  const [currentInterest, setCurrentInterest] = useState('');

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData({
          ...profileData,
          photo: file,
          photoPreview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddInterest = () => {
    if (currentInterest.trim() && profileData.interests.length < 5) {
      setProfileData({
        ...profileData,
        interests: [...profileData.interests, currentInterest.trim()]
      });
      setCurrentInterest('');
    }
  };

  const handleRemoveInterest = (index) => {
    setProfileData({
      ...profileData,
      interests: profileData.interests.filter((_, i) => i !== index)
    });
  };

  const handleNext = () => {
    if (step === 1 && profileData.name && profileData.age) {
      setStep(2);
    } else if (step === 2 && profileData.bio) {
      setStep(3);
    } else if (step === 3 && profileData.interests.length > 0) {
      setStep(4);
    }
  };

  const handleComplete = () => {
    onProfileComplete(profileData);
  };

  const canProceed = () => {
    if (step === 1) return profileData.name && profileData.age;
    if (step === 2) return profileData.bio;
    if (step === 3) return profileData.interests.length > 0;
    if (step === 4) return profileData.photoPreview;
    return false;
  };

  return (
    <div className="profile-creation">
      <div className="profile-card">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / 4) * 100}%` }}></div>
        </div>

        <h1>Create Your Clanksona</h1>
        <p className="step-indicator">Step {step} of 4</p>

        {step === 1 && (
          <div className="step-content">
            <h2>Let's start with the basics</h2>
            <div className="form-group">
              <label>What's your name?</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                maxLength={30}
              />
            </div>
            <div className="form-group">
              <label>How old are you?</label>
              <input
                type="number"
                placeholder="Age"
                value={profileData.age}
                onChange={(e) => setProfileData({ ...profileData, age: e.target.value })}
                min="18"
                max="99"
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h2>Tell us about yourself</h2>
            <div className="form-group">
              <label>Write a short bio</label>
              <textarea
                placeholder="What makes you unique? What are you looking for?"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                maxLength={200}
                rows={5}
              />
              <span className="char-count">{profileData.bio.length}/200</span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h2>What are your interests?</h2>
            <div className="form-group">
              <label>Add up to 5 interests</label>
              <div className="interest-input">
                <input
                  type="text"
                  placeholder="e.g., Gaming, Music, Travel"
                  value={currentInterest}
                  onChange={(e) => setCurrentInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                  maxLength={20}
                />
                <button 
                  type="button" 
                  onClick={handleAddInterest}
                  disabled={profileData.interests.length >= 5}
                  className="add-btn"
                >
                  Add
                </button>
              </div>
              <div className="interests-list">
                {profileData.interests.map((interest, index) => (
                  <span key={index} className="interest-tag">
                    {interest}
                    <button onClick={() => handleRemoveInterest(index)}>×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="step-content">
            <h2>Create your Clanksona photo</h2>
            <p className="photo-description">Upload a photo and we'll robotize it!</p>
            
            <div className="photo-upload-section">
              {!profileData.photoPreview ? (
                <label className="photo-upload">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    style={{ display: 'none' }}
                  />
                  <div className="upload-placeholder">
                    <span className="upload-icon">📷</span>
                    <span>Click to upload photo</span>
                  </div>
                </label>
              ) : (
                <div className="clanksona-preview">
                  <div className="photo-overlay">
                    <img src={profileData.photoPreview} alt="Preview" />
                    <div className="robot-overlay">
                      <RobotAvatar name={profileData.name} />
                    </div>
                  </div>
                  <button 
                    className="change-photo-btn"
                    onClick={() => setProfileData({ ...profileData, photo: null, photoPreview: null })}
                  >
                    Change Photo
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="button-group">
          {step > 1 && (
            <button className="btn-secondary" onClick={() => setStep(step - 1)}>
              Back
            </button>
          )}
          {step < 4 ? (
            <button 
              className="btn-primary" 
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Next
            </button>
          ) : (
            <button 
              className="btn-primary" 
              onClick={handleComplete}
              disabled={!canProceed()}
            >
              Start Swiping!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileCreation;
