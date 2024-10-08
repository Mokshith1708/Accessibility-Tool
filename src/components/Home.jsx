import React, { useState, useEffect } from "react";

const Home = () => {
  const [url, setUrl] = useState("");
  const [content, setContent] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const [popupContent, setPopupContent] = useState(""); // State to manage popup content
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for popup visibility

  const recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.interimResults = false; // Get only final results
  recognition.lang = language; // Set language

  let inactivityTimer;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      fetchContent(url);
    }
  };

  const startListening = () => {
    console.log("Starting recognition in language:", language);
    recognition.start();
    resetInactivityTimer();
  };

  const stopListening = () => {
    console.log("Stopping recognition");
    setIsListening(false);
    recognition.stop();
    clearTimeout(inactivityTimer);
  };

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

  const handleCommand = (command) => {
    const currentLanguage = recognition.lang;

    // Handle commands in English
    if (currentLanguage === "en-US") {
      if (command.includes("scroll down")) {
        window.scrollBy(0, 100); // Scroll down
      } else if (command.includes("scroll up")) {
        window.scrollBy(0, -100); // Scroll up
      }
    }

    // Handle commands in Hindi
    else if (currentLanguage === "hi-IN") {
      if (command.includes("नीचे स्क्रॉल करें") || command.includes("नीचे")) {
        window.scrollBy(0, 100); // Scroll down
      } else if (
        command.includes("ऊपर स्क्रॉल करें") ||
        command.includes("ऊपर")
      ) {
        window.scrollBy(0, -100); // Scroll up
      }
    }

    // Handle commands in Telugu
    else if (currentLanguage === "te-IN") {
      if (
        command.includes("క్రిందకు స్క్రోల్ చేయి") ||
        command.includes("క్రిందకి")
      ) {
        window.scrollBy(0, 100); // Scroll down
      } else if (
        command.includes("పైకి స్క్రోల్ చేయి") ||
        command.includes("పైకి")
      ) {
        window.scrollBy(0, -100); // Scroll up
      }
    }
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      console.log("Stopping recognition after 30 seconds of inactivity");
      stopListening();
    }, 30000);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
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
      const response = await fetch("http://localhost:5000/process-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageUrl }), // Send the image URL as payload
      });
      const data = await response.json();
      console.log("Image description:", data.description); // Handle/display the description
    } catch (error) {
      console.error("Error sending image for description:", error);
    }
  };

  const translateParagraph = async (text, targetLang) => {
    try {
      const response = await fetch("http://localhost:5000/translate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, target_lang: targetLang }),
      });
      const translatedText = await response.text();

      // Show popup after translation
      setPopupContent(translatedText); // Set the content for the popup
      setIsPopupVisible(true); // Show the popup
    } catch (error) {
      console.error("Error translating text:", error);
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
      const summary = await response.text();
      
      // Show summary in a popup
      setPopupContent(summary);
      setIsPopupVisible(true);
    } catch (error) {
      console.error("Error summarizing text:", error);
    }
  };

  const addButtons = () => {
    const paragraphs = document.querySelectorAll("#content p");
    paragraphs.forEach((p) => {
      if (!p.classList.contains("speaker-added")) {
        const speakerButton = document.createElement("button");
        speakerButton.innerHTML = "🔊";
        speakerButton.classList.add(
          "speaker",
          "ml-2",
          "cursor-pointer",
          "text-blue-600",
          "hover:text-blue-800"
        );
        speakerButton.onclick = function () {
          if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            var msg = new SpeechSynthesisUtterance();
            msg.text = p.innerText;
            msg.lang = "en-US";
            window.speechSynthesis.speak(msg);
          }
        };
        p.insertAdjacentElement("afterend", speakerButton);
        p.classList.add("speaker-added");

        const translateButton = document.createElement("button");
        translateButton.innerHTML = "🌐 Translate";
        translateButton.classList.add(
          "translate",
          "ml-2",
          "cursor-pointer",
          "text-green-600",
          "hover:text-green-800"
        );
        translateButton.onclick = async function () {
          const targetLang = prompt("Enter target language code (e.g., 'en', 'hi', 'te'):");
          if (targetLang) {
            console.log(p.innerText);
            await translateParagraph(p.innerText, targetLang);
          }
        };
        p.insertAdjacentElement("afterend", translateButton);

        // Adding summary button
        const summaryButton = document.createElement("button");
        summaryButton.innerHTML = "📝 Summary";
        summaryButton.classList.add(
          "summary",
          "ml-2",
          "cursor-pointer",
          "text-orange-600",
          "hover:text-orange-800"
        );
        summaryButton.onclick = async function () {
          console.log("Getting summary for:", p.innerText);
          await getSummary(p.innerText);
        };
        p.insertAdjacentElement("afterend", summaryButton);
      }
    });
  };

  const closePopup = () => {
    setIsPopupVisible(false); // Close the popup
  };

  const addClickListener = () => {
    // Select all images
    const images = document.querySelectorAll("#content img");
    images.forEach((img) => {
      if (img.src.includes("//upload") && !img.classList.contains("star-added")) {
        const starButton = document.createElement("button");
        starButton.innerHTML = "⭐"; // Star button for image
        starButton.classList.add(
          "star-button",
          "ml-2",
          "cursor-pointer",
          "text-yellow-500"
        );

        starButton.onclick = function () {
          console.log("clicked on image: ", img.src); // Log when the image is clicked
          getImageDescription(img.src); // Pass the image source to the backend for description
        };

        img.insertAdjacentElement("beforeBegin", starButton); // Add star button before the image
        img.classList.add("star-added");
      }
    });
  };

  useEffect(() => {
    if (content) {
      addButtons();
      addClickListener();
    }
  }, [content]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        Fetch and Speak Webpage Content
      </h1>

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL"
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
          />
          <button
            type="submit"
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 text-white font-bold py-1 px-2 rounded"
          >
            Fetch
          </button>
        </div>
        <div className="mt-2 flex items-center justify-center">
        <button
            type="button"
            onClick={startListening}
            className="ml-2 flex-shrink-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
          >
            🎤 Start Listening
          </button>
          <button
            type="button"
            onClick={stopListening}
            className="ml-2 flex-shrink-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
          >
            🛑 Stop Listening
          </button>
          </div>
        <div className="flex mt-2 items-center justify-center">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-white border rounded py-2 px-4 mr-2"
          >
            <option value="en-US">English</option>
            <option value="hi-IN">Hindi</option>
            <option value="te-IN">Telugu</option>
          </select>
        </div>
      </form>

      <div id="content" className="mt-8 w-full">
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
      </div>

      {/* Popup for displaying translations or summaries */}
      {isPopupVisible && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg relative mx-4 md:mx-0 md:w-3/4 lg:w-3/4">
            <h2 className="text-lg font-bold">Output</h2>
            <p>{popupContent}</p>
            <button onClick={closePopup} className="mt-4 bg-gray-200 p-2 rounded">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
