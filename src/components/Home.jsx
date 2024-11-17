import React, { useState, useEffect, useRef } from "react";
import langConfig from "../config/langConfig.json";
import GoogleTranslate from "./GoogleTranslate";

const Home = () => {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en");
  const [zoomLevel, setZoomLevel] = useState(1);
  const [previewZoom, setPreviewZoom] = useState(1);
  const [popupContent, setPopupContent] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const langRef = useRef(language);
  useEffect(() => {
    langRef.current = language;
  }, [language]);

  // Initialize Speech Recognition
  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.interimResults = false; // Get only final results

  // Function to update the recognition language
  const updateRecognitionLanguage = () => {
    const docLang = document.documentElement.lang || "en"; // Default to "en" if lang is not set
    recognition.lang = docLang;
    recognition.interimResults = false;
    setLanguage(docLang);
    console.log(`Speech recognition language set to: ${docLang}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      fetchContent(url);
    }
  };

  // Function to show toast notification with animation
  const showToast = (message) => {
    // Create a toast div element
    const toast = document.createElement("div");
    toast.innerText = message;
    toast.classList.add(
      "toast",
      "fixed",
      "bottom-4",
      "right-4",
      "px-6",
      "py-3",
      "bg-blue-500",
      "text-white",
      "rounded-lg",
      "shadow-lg",
      "opacity-0",
      "translate-y-10", // Initially position below
      "transition-all",
      "duration-500",
      "ease-in-out",
      "transform"
    );

    // Append the toast to the body
    document.body.appendChild(toast);

    // Trigger animation to slide in from the bottom
    setTimeout(() => {
      toast.classList.remove("opacity-0", "translate-y-10"); // Slide in
      toast.classList.add("opacity-100", "translate-y-0"); // Final position
    }, 10); // Trigger after a very short delay

    // Remove the toast after 3 seconds
    setTimeout(() => {
      toast.classList.remove("opacity-100", "translate-y-0"); // Slide out
      toast.classList.add("opacity-0", "translate-y-10"); // Move back down
      setTimeout(() => toast.remove(), 500); // Remove after fade-out completes
    }, 3000); // Adjust this time to control how long the toast is shown
  };

  let recognitionTimeout; // Timeout variable to track inactivity
  const TIMEOUT_DURATION = 10000; // 20 seconds timeout

  recognition.onresult = (event) => {
    const command = event.results[0][0].transcript.toLowerCase();
    console.log("Recognized command:", command);
    handleCommand(command);
    resetInactivityTimer();

    // Restart recognition after a short delay
    setTimeout(() => {
      console.log("Restarting recognition");
      recognition.start(); // Restart recognition to keep listening
    }, 500);
  };

  // Reset the inactivity timer every time a new result is recognized
  const resetInactivityTimer = () => {
    // Clear any existing timeout
    clearTimeout(recognitionTimeout);

    // Set a new timeout to stop recognition after TIMEOUT_DURATION if no result is recognized
    recognitionTimeout = setTimeout(() => {
      console.log("No result detected within 20 seconds, stopping recognition");
      setIsListening(false);
      recognition.stop(); // Stop recognition after the timeout
      showToast("Speech recognition stopped due to inactivity");
    }, TIMEOUT_DURATION);
  };

  // Start listening
  const startListening = () => {
    updateRecognitionLanguage();
    recognition.start();
    resetInactivityTimer(); // Start the inactivity timer when recognition starts
    setIsListening(true);
    showToast("Speech recognition started");
  };

  // Stop listening
  const stopListening = () => {
    console.log("Stopping recognition");
    setIsListening(false);
    recognition.stop();
    clearTimeout(recognitionTimeout); // Clear the inactivity timeout
    showToast("Speech recognition stopped");
  };

  const handleCommand = (command) => {
    // Get the commands for the current language
    // console.log("langRef.curr: ",langRef.current);
    const langCommands = langConfig[langRef.current].commands;
    // console.log(langCommands);

    if (langCommands) {
      // Check for scroll down command
      if (langCommands.scroll_down.some((cmd) => command.includes(cmd))) {
        window.scrollBy(0, 100); // Scroll down
      }
      // Check for scroll up command
      else if (langCommands.scroll_up.some((cmd) => command.includes(cmd))) {
        window.scrollBy(0, -100); // Scroll up
      }
    }
  };

  const fetchContent = async (url) => {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });
      const html = await response.text();
      setContent(html);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  // Function to send the image source to the backend for description
  const getImageDescription = async (imageUrl) => {
    try {
      const lang = document.querySelector("html").getAttribute("lang");
      const response = await fetch("http://localhost:5000/process-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageUrl }), // Send the image URL as payload
      });
      const data = await response.json();
      console.log(data);
      setPopupContent(data.description);
      setIsPopupVisible(true);
    } catch (error) {
      console.error("Error sending image for description:", error);
    }
  };

  // New function to get summary
  const getSummary = async (text) => {
    try {
      const response = await fetch("http://localhost:5000/summarize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const res = await response.text();
      return res;
    } catch (error) {
      console.error("Error summarizing text:", error);
    }
  };

  const addButtons = () => {
    // Remove existing buttons, if any
    const existingButtons = document.querySelectorAll("button");
    existingButtons.forEach((btn) => {
      if (!["speech", "fetch"].includes(btn.id)) {
        btn.remove();
      }
    });

    // Select all relevant text-containing elements (paragraphs)
    const textElements = document.querySelectorAll("#content p");

    textElements.forEach((element) => {
      // Create the speaker button
      const speakerButton = document.createElement("button");
      speakerButton.innerHTML = `🔊 Read`;
      speakerButton.classList.add(
        "speaker",
        "ml-2",
        "cursor-pointer",
        "text-blue-600",
        "hover:text-blue-800",
        "bg-blue-100",
        "px-3",
        "py-1",
        "rounded",
        "transition",
        "duration-200",
        "ease-in-out"
      );

      // State to toggle between reading and stopping
      let isReading = false;

      speakerButton.onclick = function () {
        if ("speechSynthesis" in window) {
          if (isReading) {
            // Stop speech synthesis
            window.speechSynthesis.cancel();
            isReading = false;
            speakerButton.innerHTML = `🔊 Read`; // Update button text
          } else {
            // Start speech synthesis
            const msg = new SpeechSynthesisUtterance();
            msg.text = element.innerText; // Ensure `element` contains the desired text
            msg.onend = function () {
              // Reset button when speech finishes
              isReading = false;
              speakerButton.innerHTML = `🔊 Read`;
            };
            msg.onerror = function () {
              // Handle speech errors
              // alert("An error occurred during text-to-speech.");
              isReading = false;
              speakerButton.innerHTML = `🔊 Read`;
            };
            window.speechSynthesis.speak(msg);
            isReading = true;
            speakerButton.innerHTML = `🛑 Stop`; // Update button text
          }
        } else {
          alert("Your browser does not support speech synthesis.");
        }
      };

      // Adding summary button
      const summaryButton = document.createElement("button");
      summaryButton.innerHTML = `📝 Show Summary`;
      summaryButton.classList.add(
        "summary",
        "ml-2",
        "cursor-pointer",
        "text-orange-600",
        "hover:text-orange-800",
        "bg-orange-100",
        "px-3",
        "py-1",
        "rounded",
        "transition",
        "duration-200",
        "ease-in-out"
      );

      // Spinner element for loading state
      const spinner = document.createElement("span");
      spinner.classList.add("spinner", "hidden"); // Initially hidden

      // Add spinner to button
      summaryButton.appendChild(spinner);

      // Toggle state for summary visibility
      let showSummary = false;

      summaryButton.onclick = async function () {
        // Toggle the summary display state
        showSummary = !showSummary;

        // Show the spinner while fetching the summary
        spinner.classList.remove("hidden");
        summaryButton.innerHTML = `⏳ Loading...`;

        // Check if the summary is already displayed
        const existingSummary = element.nextElementSibling;
        if (
          existingSummary &&
          existingSummary.classList.contains("summary-box")
        ) {
          // Remove the existing summary if it exists
          existingSummary.remove();
          spinner.classList.add("hidden"); // Hide spinner after removal
          summaryButton.innerHTML = `📝 Show Summary`; // Reset button text
        } else {
          // Fetch and display the summary
          const res = await getSummary(element.innerText);

          // Create a new div element with a bounding box for the summary
          const paragraph = document.createElement("div");
          paragraph.textContent = res;
          paragraph.classList.add(
            "summary-box",
            "mt-4",
            "mb-4",
            "p-4",
            "bg-orange-50",
            "border",
            "border-orange-200",
            "rounded-lg",
            "shadow-md",
            "text-gray-800",
            "max-w-fit"
          );

          // Insert the paragraph after `element`
          element.insertAdjacentElement("afterend", paragraph);

          // Hide spinner and update button text after summary is shown
          spinner.classList.add("hidden");
          summaryButton.innerHTML = `❌ Close Summary`;
        }
      };

      // Append the buttons after the paragraph element
      element.insertAdjacentElement("afterend", speakerButton);
      element.insertAdjacentElement("afterend", summaryButton);
      // Add a class to indicate buttons have been added
      element.classList.add("speaker-added");
    });

    // Select all images inside #content
    const images = document.querySelectorAll("#content img");

    images.forEach((img) => {
      const starButton = document.createElement("button");
      starButton.innerHTML = `⭐ Describe`; // Star button text
      starButton.classList.add(
        "star-button",
        "ml-2",
        "cursor-pointer",
        "text-yellow-500",
        "bg-yellow-100",
        "px-3",
        "py-1",
        "rounded",
        "transition",
        "duration-200",
        "ease-in-out"
      );

      starButton.onclick = async function () {
        await getImageDescription(img.src); // Call the function to describe the image
      };

      // Append the star button after the image element
      img.insertAdjacentElement("afterend", starButton);

      // Mark the image with a class to prevent duplicate button creation
      img.classList.add("star-added");
    });
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Close the popup
  };

  useEffect(() => {
    if (content) {
      addButtons();
    }
  }, [content, language]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header Section */}
      <div className="sticky top-0 bg-white shadow-md z-10 p-4">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-teal-600">
            Accezy
          </h1>
        <div className="flex flex-col lg:flex-row items-start justify-between w-full max-w-6xl mx-auto space-y-4 lg:space-y-0 lg:space-x-4 p-4">

          {/* Form Section */}
          <form
            onSubmit={handleSubmit}
            className="flex-grow w-full max-w-lg bg-gray-50 shadow-sm rounded-md p-3"
          >
            <div className="flex items-center border-b border-teal-500 py-1">
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none text-sm"
              />
              <button
                id="fetch"
                type="submit"
                className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-3 text-sm rounded"
              >
                Fetch
              </button>
            </div>
            <div className="mt-3 flex items-center justify-center">
              <button
                type="button"
                id="speech"
                onClick={isListening ? stopListening : startListening}
                className={`ml-2 flex-shrink-0 ${
                  isListening
                    ? "bg-red-500 hover:bg-red-700"
                    : "bg-blue-500 hover:bg-blue-700"
                } text-white font-bold py-1 px-2 text-sm rounded`}
              >
                {isListening ? "🛑 Stop Listening" : "🎤 Start Listening"}
              </button>
            </div>
            {content && (
              <div className="flex mt-3 items-center justify-center">
                <div className="flex flex-col items-center">
                  <p className="text-xs text-gray-600">
                    Drag the slider to zoom in and out
                  </p>
                  <input
                    id="zoom-slider"
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.01"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                    className="w-full max-w-md mt-1"
                  />
                </div>
              </div>
            )}
          </form>

          {/* Instruction and Translate Section */}
          <div className="w-full lg:w flex flex-col lg:flex-row items-start space-y-4 lg:space-y-0 lg:space-x-4">
            {/* Instruction Box */}
            <div className="flex-1 lg:flex-[2] bg-gray-50 border border-gray-300 rounded-md p-3 shadow-sm">
              <h2 className="text-base font-semibold mb-1">Instructions</h2>
              <ul className="text-xs list-disc pl-4">
                <li>🔍 Enter a URL to fetch content.</li>
                <li>🎤 Use "Start Listening" for voice commands.</li>
                <li>🛑 Use "Stop Listening" to disable voice commands.</li>
                <li>📊 Adjust zoom level with the slider below.</li>
              </ul>
              <h2 className="text-base font-semibold mt-3 mb-1">
                Voice Commands
              </h2>
              <ul className="text-xs list-disc pl-4">
                <li>Scroll up</li>
                <li>Scroll down</li>
              </ul>
            </div>

            {/* Google Translate */}
            <div className="flex-1 lg:flex-[1]">
              <GoogleTranslate />
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div
        id="content"
        className="flex-grow overflow-auto mt-4 p-4"
        style={{
          transform: `scale(${zoomLevel})`,
          transformOrigin: "top center",
          transition: "transform 0.3s ease",
        }}
      >
        {content && (
          <div>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        )}
      </div>

      {/* Popup */}
      {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg relative mx-4 md:mx-0 md:w-3/4 lg:w-3/4">
            <h2 className="text-lg font-bold">Output</h2>
            <p>{popupContent}</p>
            <button
              onClick={closePopup}
              className="mt-4 bg-gray-200 p-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
