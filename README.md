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

- 

## Future Enhancements

- **Advanced AI Models**: Improving the accuracy of language simplification and image descriptions.
- **Expanded Language Support**: Increasing the range of supported languages.
- **New Features**: New features like glossary generation, infographics generation, audio amplification and more.

## Team Members

- T Mokshith Reddy
- V Pavan
- M V Sonith
- Y Sai Venkat
- Sasaank Janapati
- Akshatha R.H
