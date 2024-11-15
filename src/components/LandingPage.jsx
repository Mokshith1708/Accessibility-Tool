import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [name, setName] = useState('');
  const [ageGroup, setAgeGroup] = useState('');
  const [isHandicapped, setIsHandicapped] = useState(null);
  const [handicappedType, setHandicappedType] = useState('');
  const [language, setLanguage] = useState('');
  const [wantsMotherTongue, setWantsMotherTongue] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 flex flex-col items-center py-10 px-4">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-6xl font-extrabold text-orange-600 mb-3 drop-shadow-md">
          Welcome to Accezy
        </h1>
        <p className="text-lg text-gray-700 shadow-sm">
          Personalize your experience by providing some details.
        </p>
      </header>

      {/* Form */}
      <form className="w-full max-w-3xl bg-white shadow-2xl rounded-xl p-8 space-y-8 border border-gray-200">
        {/* Name Input */}
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-800">Your Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow focus:ring-orange-500 focus:border-orange-500 text-md"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Age Group */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-800">Select Your Age Group</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: 'Kids', img: '/images/kids.jpg' },
              { name: 'Uneducated', img: '/images/uneducated.jpg' },
              { name: 'Old People', img: '/images/old_people.jpg' },
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

        {/* Physically Handicapped */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-800">Are you physically handicapped?</label>
          <div className="flex gap-4">
            {['Yes', 'No'].map((answer) => (
              <button
                key={answer}
                type="button"
                className={`px-6 py-3 rounded-lg shadow-md font-medium ${
                  isHandicapped === answer
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
                } transition`}
                onClick={() => setIsHandicapped(answer)}
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow focus:ring-orange-500 focus:border-orange-500 text-md"
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

        {/* Language */}
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-800">Preferred Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow focus:ring-orange-500 focus:border-orange-500 text-md"
          >
            <option value="">Select a language</option>
            {[
              'Hindi',
              'English',
              'Bengali',
              'Tamil',
              'Telugu',
              'Marathi',
              'Gujarati',
              'Malayalam',
              'Punjabi',
              'Kannada',
            ].map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        {/* Mother Tongue */}
        <div className="space-y-4">
          <label className="block text-lg font-medium text-gray-800">
            Would you like to view the webpage in your mother tongue?
          </label>
          <div className="flex gap-4">
            {['Yes', 'No'].map((answer, index) => (
              <button
                key={index}
                type="button"
                className={`px-6 py-3 rounded-lg shadow-md font-medium ${
                  wantsMotherTongue === (answer === 'Yes')
                    ? 'bg-orange-600 text-white'
                    : 'bg-gray-300 hover:bg-gray-400 text-gray-700'
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
            className="w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-medium shadow-lg hover:bg-orange-700 transition"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LandingPage;
