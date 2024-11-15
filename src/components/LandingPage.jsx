import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [isHandicapped, setIsHandicapped] = useState(null);
  const [handicappedType, setHandicappedType] = useState('');
  const [language, setLanguage] = useState('');
  const [wantsMotherTongue, setWantsMotherTongue] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    setAgeGroup(category);
  };

  const handleHandicappedChange = (answer) => {
    setIsHandicapped(answer);
    if (answer === 'No') setHandicappedType('');
  };

  const handleSubmit = () => {
    if (!name) {
      setErrorMessage('Please enter your name.');
      return;
    }
    setErrorMessage('');
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 flex flex-col items-center justify-center text-white relative">
      {/* Header */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 bg-opacity-90 bg-indigo-700 text-gray-200 shadow-md">
        <div className="ml-6 font-bold text-lg">Accezy</div>
        <nav className="flex space-x-6 mr-6">
          <a href="#" className="hover:text-white transition">Features</a>
          <a href="#" className="hover:text-white transition">Contact</a>
          <a href="#" className="hover:text-white transition">Help</a>
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-1 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </nav>
      </header>

      {/* Main Content */}
      <main className="text-center px-4 mt-20">
        <h1 className="text-5xl font-extrabold mb-4">Customize Your Experience</h1>
        <p className="text-xl mb-6">Please provide your details to get started!</p>
      </main>

      {/* Form Section */}
      <form className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 space-y-6 text-gray-900">
        {errorMessage && <p className="text-red-500 text-sm mb-4">{errorMessage}</p>}

        {/* Name Input */}
        <div>
          <label className="block text-lg font-medium mb-2">Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Age Group Selection */}
        <div>
          <label className="block text-lg font-medium mb-4">Select Your Age Group</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Kids', img: '/Kids.jpeg' },
              { name: 'Uneducated', img: '/Adult.jpeg' },
              { name: 'Old People', img: '/Oldman.jpeg' },
            ].map((category) => (
              <button
                key={category.name}
                type="button"
                className={`flex flex-col items-center justify-center px-4 py-4 rounded-lg border shadow-md text-center font-medium transition ${
                  ageGroup === category.name
                    ? 'bg-orange-100 border-orange-500 shadow-lg'
                    : 'bg-white border-gray-300 hover:shadow-md'
                }`}
                onClick={() => setAgeGroup(category.name)}
              >
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-20 h-20 mb-3 rounded-full border-2 border-gray-200 shadow-sm"
                />
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Physically Handicapped Question */}
        <div>
          <label className="block text-lg font-medium mb-4">Are you physically handicapped?</label>
          <div className="flex gap-4">
            {['Yes', 'No'].map((answer) => (
              <button
                key={answer}
                type="button"
                className={`px-6 py-3 rounded-lg shadow-md font-medium ${
                  isHandicapped === answer
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border-gray-300 hover:bg-indigo-100 hover:border-indigo-500'
                } transition`}
                onClick={() => handleHandicappedChange(answer)}
              >
                {answer}
              </button>
            ))}
          </div>
          {isHandicapped === 'Yes' && (
            <div className="mt-4">
              <select
                value={handicappedType}
                onChange={(e) => setHandicappedType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Select type of handicap</option>
                <option value="Blind">Blind</option>
                <option value="Deaf">Deaf</option>
                <option value="Physically Disabled">Physically Disabled</option>
                <option value="Speech Impairment">Speech Impairment</option>
              </select>
            </div>
          )}
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-lg font-medium mb-2">Which language do you prefer?</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="">Select a language</option>
            {['Hindi', 'English', 'Bengali', 'Tamil', 'Telugu', 'Marathi', 'Gujarati', 'Malayalam', 'Punjabi', 'Kannada'].map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Mother Tongue Question */}
        <div>
          <label className="block text-lg font-medium mb-4">Would you like to view the webpage in your mother tongue?</label>
          <div className="flex gap-4">
            {['Yes', 'No'].map((answer, index) => (
              <button
                key={index}
                type="button"
                className={`px-6 py-3 rounded-lg shadow-md font-medium ${
                  wantsMotherTongue === (answer === 'Yes')
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border-gray-300 hover:bg-indigo-100 hover:border-indigo-500'
                } transition`}
                onClick={() => setWantsMotherTongue(answer === 'Yes')}
              >
                {answer}
              </button>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="button"
            className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium shadow-md hover:bg-indigo-700 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>

      {/* Background Pattern */}
      <div className="absolute inset-0 bg-indigo-800 opacity-10 pointer-events-none"></div>
    </div>
  );
}

export default LandingPage;
