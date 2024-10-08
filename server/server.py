from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import requests
from urllib.parse import urljoin
from bs4 import BeautifulSoup
from models.image2text import generate_description
from googletrans import Translator

app = Flask(__name__)

CORS(app, methods=['GET', 'POST', 'OPTIONS'], allow_headers=['Content-Type'], resources={r"/*": {"origins": "http://localhost:3000"}})

translator = Translator()  # Initialize the Google Translator

# Function to fetch and return the HTML from a given URL
def fetch_and_render_url(url):
    try:
        # Fetch the content from the URL
        response = requests.get(url)
        response.raise_for_status()  # Raise an error for bad response
        # Parse the HTML with BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # modify relative to absolute paths
        # handle mw-deduplicated-inline-style
        for link in soup.find_all('link', href=True): 
            link['href'] = urljoin(url, link['href'])

        # for script in soup.find_all('script', src=True):
        #     script['src'] = urljoin(url, script['src'])

        for img in soup.find_all('img', src=True):
            
            # handle static sources
            if img['src'].startswith('/static'):
                img['src'] = urljoin(url, img['src'])

            # handle protocol relative URLs starts with '//' for external sources would work fine

        # need to check later
        for a in soup.find_all('a',href=True):
            a['onclick'] = "event.preventDefault();"
            a['href'] = urljoin(url, a['href'])

        # Return the modified HTML content
        return str(soup), response.headers.get('Content-Type', 'text/html')

    except requests.exceptions.RequestException as e:
        return f"Error fetching the URL: {str(e)}", 'text/html'

@app.route('/', methods=['POST'])
def index():
    url = request.json.get('url')  # Assuming we're sending JSON from React
    if url:
        html_content, content_type = fetch_and_render_url(url)
        return Response(html_content, content_type=content_type)
    return Response("No URL provided", content_type='text/plain')

@app.route('/process-image', methods=['POST'])
def process_image():
    try:
        data = request.get_json()

        if 'image' not in data:
            return jsonify({"error": "No image URL provided."}), 400

        image_url = data['image']
        # print(image_url)

        # Fetch the image from the URL
        response = requests.get(image_url)
        response.raise_for_status()  # Raise an error if the request failed

        description = generate_description(response)  # Ensure your process_image function can handle URLs

        return jsonify({"description": description})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint to handle translations
@app.route('/translate', methods=['POST'])
def translate_text():
    text = request.json.get('text')
    target_lang = request.json.get('target_lang')
    if text and target_lang:
        try:
            translated = translator.translate(text, dest=target_lang)
            return Response(translated.text, content_type='text/plain')
        except Exception as e:
            return Response(f"Translation error: {str(e)}", status=400)
    return Response("Invalid input", status=400)

if __name__ == '__main__':
    app.run(debug=True)
