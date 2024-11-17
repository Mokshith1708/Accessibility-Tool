# Accezy

## Project Overview

**Accezy** is a software solution that tackles the issue of web content accessibility for diverse and underserved groups, such as the elderly, children, uneducated individuals, and multilingual users. In today's digital landscape, many users face barriers to fully comprehending and interacting with online information due to cognitive, educational, or technological constraints. **Accezy** ensures digital inclusivity by analyzing and adapting web content to meet the specific needs of these user groups, making it easier to understand and engage with.

## Problem Statement

In the digital era, the internet is a primary source of information. However, a significant portion of the global population struggles to fully engage with online content. **Accezy** addresses a unique problem that combines social and technological aspects: making digital content accessible to marginalized or challenged user groups. 

The importance of solving this problem cannot be overstated. Millions of people worldwide, including:
- **Uneducated individuals**, who may not comprehend complex language;
- **Children**, who require simpler content and interactive formats;
- **Elderly users**, who might face cognitive decline or technical challenges;
  
These groups face real barriers to accessing essential information, and existing content often fails to accommodate them. As more services and interactions move online, this exclusion risks widening the gap between those who can fully participate in the digital world and those who cannot. 

**Uniqueness**: While many accessibility tools focus on specific impairments (such as vision or hearing loss), **Accezy** takes a holistic approach. It adapts content for various challenges—educational, linguistic, cognitive, and sensory—offering a multi-dimensional solution to ensure no one is left behind in the digital age.

## Key Features (Implemented for Phase-1)

1. **Auto-Generate Summarized Reports**: 
   Automatically generates simplified summaries of web content tailored to specific user groups (e.g., elderly, children, uneducated individuals).

2. **Audio Narration**: 
   Converts text to speech, making content accessible through narration for users who prefer or require audio, such as the elderly or visually impaired.
   
3. **Multi-Lingual Support**: 
   Translates content into multiple languages, enabling users to access information in their preferred language. (10 languages)
   
4. **Voice Commands**: 
   Allows users to navigate the software using voice commands, making it easier for elderly or visually impaired users to interact with the system.
   
5. **Image Description**: 
   Automatically generates descriptive text for images, enhancing accessibility for users with visual impairments.
   

## System Requirements

### Functional Requirements
- **Web Scraping**: Retrieves web content and processes it to provide simplified text, summaries etc.
- **Natural Language Processing (NLP)**: Leverages AI models for text simplification, generating summaries .
- **Text-to-Speech and Translation**: Supports audio narration and multi-lingual content output.
- **Image Description**: generating image descriptions for images.
### Non-Functional Requirements
- **Usability**: Ensures the software is user-friendly and intuitive across all user demographics.
- **Compatibility**: Provides a consistent experience across desktops, tablets, and smartphones.

## Technical Stack

### Frontend
- **React.js**: For dynamic and interactive user interface components.

### Backend
- **Python with Flask**: To handle web scraping, data processing, and API requests.
- **Web Scraping Tools**: Beautiful Soup or Scrapy for extracting web content.

- **AI Models used in Backend**:
    - **Translator from Gooletrnas**: This model was used to translate text of different paragraphs to different languages.
    - **Salesforce/blip-image-captioning-base**: This model was used for generating discription for different images.
    - **Pipeline from Transformers**: This model was used for generating summaraies for different paragraph texts. 

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Mokshith1708/Accessibility-Tool
    cd Accessibility-Tool
    ```

2. Install dependencies:
    ```bash
    npm install
    cd server
    pip install -r requirements.txt  
    ```

3. Run the frontend:
    ```bash
    npm start
    ```

4. Run the backend:
    ```bash
    cd server
    python server.py
    ```

## Usage

Once the system is running, access the web interface to interact with web content through simplified reports, glossary definitions, infographics, audio narrations, and more.

- First you will be entering into the web interface where your name , category, physically disability, mother tongue. Please enter the following information and move forward.
- You will be asked to enter the link of the website you want to run this tool on. Please enter the link of that website.
( We mainly focussed on text and image intensive websites like wikipedia, geeks for geeks and medium. More websites will be made accessible in the future.)
- After giving the link of the website you will be redirected to that website with our toold running on it. There we will have different options like:
    - First we can select the language in which we want our website to use in furthur features.
    - For every paragraph we will be having a speaker which speaks out the content.
    - We will also have a translator button on clicking which gives the content in the selected language.
    - We also have a summarize button for every paragraph on clicking which gives the summarized content.
    - Every picture will have a star symbol on clicking which gives the description of the pisture
    - We also have a voice command which can be used to give commands in different languages. But for now we have limited commands. Also please make sure that the command has the given words. (Only Scroll-up and Scroll-down for now).
    - We have a scroll bar which can be used for zooming in and out.
    - Also we have a instruction box which specifies all the functionalities that cn be performed.
        -  "en-US": {
            "scroll_down": ["scroll down"],
            "scroll_up": ["scroll up"]
          },
        - "hi-IN": {
            "scroll_down": ["नीचे स्क्रॉल करें", "नीचे"],
            "scroll_up": ["ऊपर स्क्रॉल करें", "ऊपर"]
          },
         - "te-IN": {
            "scroll_down": ["క్రిందికి స్క్రోల్ చేయి", "క్రిందకి"],
            "scroll_up": ["పైకి స్క్రోల్ చేయి", "పైకి"]
          },
        -  "ta-IN": {
            "scroll_down": ["கீழே ஸ்க்ரோல் செய்", "கீழே"],
            "scroll_up": ["மேலே ஸ்க்ரோல் செய்", "மேலே"]
          },
        -  "kn-IN": {
            "scroll_down": ["ಕೆಳಗೆ ಸ್ಕ್ರೋಲ್ ಮಾಡಿ", "ಕೆಳಗೆ"],
            "scroll_up": ["ಮೇಲೆ ಸ್ಕ್ರೋಲ್ ಮಾಡಿ", "ಮೇಲೆ"]
          },
        -  "ml-IN": {
            "scroll_down": ["താഴേക്ക് സ്ക്രോൾ ചെയ്യുക", "താഴേക്ക്"],
            "scroll_up": ["മുകളിലേക്ക് സ്ക്രോൾ ചെയ്യുക", "മുകളിലേക്ക്"]
          },
        -  "gu-IN": {
            "scroll_down": ["નીચે સ્ક્રોલ કરો", "નીચે"],
            "scroll_up": ["ઉપર સ્ક્રોલ કરો", "ઉપર"]
          },
         - "bn-IN": {
            "scroll_down": ["নিচে স্ক্রোল করুন", "নিচে"],
            "scroll_up": ["উপর স্ক্রোল করুন", "উপর"]
          },
        -  "mr-IN": {
            "scroll_down": ["खाली स्क्रोल करा", "खाली"],
            "scroll_up": ["वर स्क्रोल करा", "वर"]
          },
         - "pa-IN": {
            "scroll_down": ["ਥੱਲੇ ਸਕ੍ਰੋਲ ਕਰੋ", "ਥੱਲੇ"],
            "scroll_up": ["ਉੱਪਰ ਸਕ੍ਰੋਲ ਕਰੋ", "ਉੱਪਰ"]
          }
  
  

- Note:
    - After clicking the summarizer button we need to wait for some time before the summary is displayed as the model takes some time to generate the summary. Same case will translate but it is much faster than the summarizer.

 

## Team Members

- T Mokshith Reddy
- V Pavan
- M V Sonith
- Y Sai Venkat
- Sasaank Janapati
- Akshatha R.H
