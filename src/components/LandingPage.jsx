import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('');
  const [wantsMotherTongue, setWantsMotherTongue] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isFeaturesModalOpen, setIsFeaturesModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navigate = useNavigate();

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
          <button onClick={() => setIsFeaturesModalOpen(true)} className="hover:text-white transition">Features</button>
          <button onClick={() => setIsContactModalOpen(true)} className="hover:text-white transition">Contact</button>
         
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

      {/* Features Modal */}
      {isFeaturesModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-3xl text-gray-900 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-indigo-700">Key Features</h2>
              <button
                onClick={() => setIsFeaturesModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 font-semibold"
              >
                Close ✕
              </button>
            </div>
            <ul className="space-y-4">
              <li>
                <h3 className="text-xl font-semibold text-indigo-600">Auto-Generate Summarized Reports</h3>
                <p>Effortlessly distill complex web content into concise summaries, tailored to specific audiences, such as children, the elderly, or individuals with limited literacy. Get relevant information at a glance without the need for extensive reading.</p>
              </li>
              <li>
                <h3 className="text-xl font-semibold text-indigo-600">Audio Narration</h3>
                <p>Experience content in a whole new way! Convert text into natural, easy-to-understand speech, perfect for users who prefer listening or have visual impairments. Sit back and listen as the website brings text to life.</p>
              </li>
              <li>
                <h3 className="text-xl font-semibold text-indigo-600">Multi-Lingual Support (10 Languages)</h3>
                <p>Break language barriers with seamless translations! Access information in your preferred language, making this platform accessible and inclusive for speakers of 10 different languages.</p>
              </li>
              <li>
                <h3 className="text-xl font-semibold text-indigo-600">Voice Commands</h3>
                <p>Navigate effortlessly with hands-free voice control. Ideal for elderly or visually impaired users, voice commands allow you to interact with the system smoothly, ensuring an inclusive and accessible experience.</p>
              </li>
              <li>
                <h3 className="text-xl font-semibold text-indigo-600">Image Description</h3>
                <p>Make images more accessible with automatically generated descriptions. This feature provides meaningful text for images, enabling visually impaired users to enjoy a rich, more inclusive browsing experience.</p>
              </li>
              <li>
                <h3 className="text-xl font-semibold text-indigo-600">Enhanced Viewing Experience (Zoom In and Zoom Out)</h3>
                <p>Customize your view with a flexible zoom feature. Adjust content size to suit your comfort level—zoom in for a closer look or zoom out to see more. A smoother, user-friendly browsing experience awaits!</p>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Contact Modal */}
      {isContactModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg text-gray-900 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-indigo-700">Contact Us</h2>
              <button
                onClick={() => setIsContactModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 font-semibold"
              >
                Close ✕
              </button>
            </div>
            <div>
              <p className="text-lg">For any queries, feel free to reach us at:</p>
              <a href="mailto:sahakara@gmail.com" className="text-indigo-600 font-semibold hover:text-indigo-700">
                sahakara@gmail.com
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;
