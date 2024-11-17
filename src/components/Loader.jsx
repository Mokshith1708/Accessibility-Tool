
import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-opacity-50 bg-gray-100">
      <div className="loader-wrapper">
        <div className="loader-spinner"></div>
        <p className="loading-text mt-4 text-blue-600 font-semibold text-lg">Loading...</p>
      </div>
      <style jsx>{`
        .loader-wrapper {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.8); /* Slight overlay */
          z-index: 50;
        }
        .loader-spinner {
          width: 70px; /* Larger size */
          height: 70px;
          border: 8px solid #4a90e2; /* Base color */
          border-top-color: #f39c12; /* Alternate color for rotation effect */
          border-radius: 50%;
          animation: spin 1s linear infinite, color-change 3s linear infinite; /* Spinner and color change */
        }
        .loading-text {
          color: #4a90e2;
          font-size: 1.25rem;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes color-change {
          0% { border-color: #4a90e2; border-top-color: #f39c12; }
          33% { border-color: #e74c3c; border-top-color: #8e44ad; }
          66% { border-color: #2ecc71; border-top-color: #3498db; }
          100% { border-color: #4a90e2; border-top-color: #f39c12; }
        }
      `}</style>
    </div>
  );
};

export default Loader;
