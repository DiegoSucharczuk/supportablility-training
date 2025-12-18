import google.generativeai as genai
import os

# Configure with your API key
api_key = os.getenv('GOOGLE_AI_API_KEY') or 'your_api_key_here'
genai.configure(api_key=api_key)

# List available models
print("\nAvailable models that support generateContent:\n")
for model in genai.list_models():
    if 'generateContent' in model.supported_generation_methods:
        print(f"- {model.name}")
