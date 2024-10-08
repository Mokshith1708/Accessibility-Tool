import torch
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
from io import BytesIO

# Load the processor and model
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def generate_description(response):
    """
    Generate a description for the given image file.

    Args:
    - image_file: Path to the image file or image object.

    Returns:
    - A string description of the image.
    """
    # Open the image file and process it
    image = Image.open(BytesIO(response.content))
    inputs = processor(image, return_tensors="pt").pixel_values

    # Generate the description using the model
    with torch.no_grad():
        generated_ids = model.generate(inputs)
    
    # Decode the generated ids to get the text description
    description = processor.decode(generated_ids[0], skip_special_tokens=True)
    
    return description
