import React, { useState } from 'react';
import './App.css'; // for styling

function App() {
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [isHandicapped, setIsHandicapped] = useState(null);
  const [handicappedType, setHandicappedType] = useState('');
  const [language, setLanguage] = useState('');
  const [wantsMotherTongue, setWantsMotherTongue] = useState(false);

  const handleCategoryClick = (category) => {
    setAgeGroup(category);
  };

  const handleHandicappedChange = (answer) => {
    setIsHandicapped(answer);
    if (answer === 'No') {
      setHandicappedType(''); // Reset handicapped type if they choose No
    }
  };

  const handleSubmit = () => {
    alert(`Name: ${name}, Age Group: ${ageGroup}, Handicapped: ${isHandicapped}, Type: ${handicappedType}, Language: ${language}, Wants Mother Tongue: ${wantsMotherTongue}`);
  };

  return (
    <div className="App">
      <h1>Choose Your Details</h1>

      {/* Name Input */}
      <div className="name-input">
        <input 
          type="text" 
          className="name-input-field" 
          placeholder="Enter your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
      </div>

      {/* Age Group Selection */}
      <div className="categories">
        <div 
          className={`category ${ageGroup === 'Kids' ? 'selected' : ''}`} 
          onClick={() => handleCategoryClick('Kids')}
        >
          <img src="/Kids.png" alt="Kids" className="category-image" />
          <p>Kids</p>
        </div>
        <div 
          className={`category ${ageGroup === 'Uneducated' ? 'selected' : ''}`} 
          onClick={() => handleCategoryClick('Uneducated')}
        >
          <img src="/Adult.png" alt="Uneducated" className="category-image" />
          <p>Uneducated</p>
        </div>
        <div 
          className={`category ${ageGroup === 'Old People' ? 'selected' : ''}`} 
          onClick={() => handleCategoryClick('Old People')}
        >
          <img src="/Oldman.png" alt="Old People" className="category-image" />
          <p>Old People</p>
        </div>
      </div>

      {/* Physically Handicapped Question */}
      <div className="handicap-question">
        <h2>Are you physically handicapped?</h2>
        <button 
          className={`handicap-button ${isHandicapped === 'Yes' ? 'selected' : ''}`} 
          onClick={() => handleHandicappedChange('Yes')}
        >
          Yes
        </button>
        <button 
          className={`handicap-button ${isHandicapped === 'No' ? 'selected' : ''}`} 
          onClick={() => handleHandicappedChange('No')}
        >
          No
        </button>

        {/* Dropdown for Handicapped Type */}
        {isHandicapped === 'Yes' && (
          <select 
            value={handicappedType} 
            onChange={(e) => setHandicappedType(e.target.value)}
            className="handicapped-type-dropdown"
          >
            <option value="">Select type of handicap</option>
            <option value="Blind">Blind</option>
            <option value="Deaf">Deaf</option>
            <option value="Physically Disabled">Physically Disabled</option>
            <option value="Speech Impairment">Speech Impairment</option>
            {/* Add more options as needed */}
          </select>
        )}
      </div>

      {/* Language Selection */}
      <div className="language-selection">
        <h2>Which language will you speak?</h2>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          className="language-dropdown"
        >
          <option value="">Select a language</option>
          <option value="Hindi">Hindi</option>
          <option value="English">English</option>
          <option value="Bengali">Bengali</option>
          <option value="Tamil">Tamil</option>
          <option value="Telugu">Telugu</option>
          <option value="Marathi">Marathi</option>
          <option value="Gujarati">Gujarati</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Punjabi">Punjabi</option>
          <option value="Kannada">Kannada</option>
          {/* Removed Urdu and Odia */}
        </select>
      </div>

      {/* Mother Tongue Question */}
      <div className="mother-tongue-question">
        <h2>Would you like to view the webpage in your mother tongue?</h2>
        <button 
          className={`mother-tongue-button ${wantsMotherTongue ? 'selected' : ''}`} 
          onClick={() => setWantsMotherTongue(true)}
        >
          Yes
        </button>
        <button 
          className={`mother-tongue-button ${!wantsMotherTongue ? 'selected' : ''}`} 
          onClick={() => setWantsMotherTongue(false)}
        >
          No
        </button>
      </div>

      {/* Submit Button */}
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default App;
