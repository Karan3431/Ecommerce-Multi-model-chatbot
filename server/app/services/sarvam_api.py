import os
import requests
import base64
from typing import Dict, List, Optional
from dotenv import load_dotenv

load_dotenv()

class SarvamAPI:
    """
    Sarvam AI API client for Indian language speech-to-text and text-to-speech
    Supports: Bengali, Gujarati, Kannada, Malayalam, Marathi, Odia, Punjabi, Tamil, Telugu, Hindi, English
    """
    
    def __init__(self):
        self.api_key = os.getenv("SARVAM_API_KEY")
        self.base_url = "https://api.sarvam.ai"
        
        if not self.api_key:
            raise ValueError("SARVAM_API_KEY not found in environment variables")
        
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        # Supported Indian languages
        self.supported_languages = {
            "bengali": "bn",
            "gujarati": "gu", 
            "kannada": "kn",
            "malayalam": "ml",
            "marathi": "mr",
            "odia": "or",
            "punjabi": "pa",
            "tamil": "ta",
            "telugu": "te",
            "hindi": "hi",
            "english": "en"
        }
        
        # Available voices for each language
        self.voices = {
            "hi": ["Anushka", "Abhilash", "Manisha"],  # Hindi voices
            "en": ["Anushka", "Abhilash", "Manisha"],  # English voices  
            "bn": ["Anushka"],  # Bengali
            "gu": ["Manisha"], # Gujarati
            "kn": ["Abhilash"], # Kannada
            "ml": ["Anushka"],  # Malayalam
            "mr": ["Manisha"], # Marathi
            "or": ["Abhilash"], # Odia
            "pa": ["Anushka"],  # Punjabi
            "ta": ["Manisha"], # Tamil
            "te": ["Abhilash"]  # Telugu
        }
        
        # Default voice (Anushka as requested)
        self.default_voice = "Anushka"

    def speech_to_text(self, audio_data: bytes, language: str = "hi") -> Dict:
        """
        Convert speech to text using Sarvam API
        
        Args:
            audio_data: Audio file bytes (WAV, MP3, etc.)
            language: Language code (hi, en, bn, etc.)
            
        Returns:
            Dict with transcription result
        """
        try:
            # Convert to base64
            audio_base64 = base64.b64encode(audio_data).decode('utf-8')
            
            payload = {
                "model": "saaras:v1",
                "language": language,
                "audio": audio_base64
            }
            
            response = requests.post(
                f"{self.base_url}/speech-to-text",
                headers=self.headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                return {
                    "success": True,
                    "transcript": result.get("transcript", ""),
                    "language": language,
                    "confidence": result.get("confidence", 0.0)
                }
            else:
                return {
                    "success": False,
                    "error": f"API Error: {response.status_code} - {response.text}"
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": f"Exception: {str(e)}"
            }

    def text_to_speech(self, text: str, language: str = "hi", voice: Optional[str] = None) -> Dict:
        """
        Convert text to speech using Sarvam API
        
        Args:
            text: Text to convert to speech
            language: Language code (hi, en, bn, etc.)
            voice: Voice name (Anushka, Abhilash, Manisha)
            
        Returns:
            Dict with audio data in base64 format
        """
        try:
            # Use default voice if not specified
            if not voice:
                voice = self.voices.get(language, [self.default_voice])[0]
            
            # Ensure voice is available for the language
            if voice not in self.voices.get(language, []):
                voice = self.voices.get(language, [self.default_voice])[0]
            
            payload = {
                "model": "bulbul:v1",
                "text": text,
                "language": language,
                "voice": voice,
                "speed": 1.0,
                "pitch": 1.0
            }
            
            response = requests.post(
                f"{self.base_url}/text-to-speech",
                headers=self.headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                result = response.json()
                return {
                    "success": True,
                    "audio_base64": result.get("audio", ""),
                    "language": language,
                    "voice": voice,
                    "duration": result.get("duration", 0)
                }
            else:
                return {
                    "success": False,
                    "error": f"API Error: {response.status_code} - {response.text}"
                }
                
        except Exception as e:
            return {
                "success": False,
                "error": f"Exception: {str(e)}"
            }

    def detect_language(self, text: str) -> str:
        """
        Simple language detection based on script/characters
        This is a basic implementation - you might want to use a proper language detection library
        """
        # Devanagari script (Hindi)
        if any('\u0900' <= char <= '\u097F' for char in text):
            return 'hi'
        # Bengali script
        elif any('\u0980' <= char <= '\u09FF' for char in text):
            return 'bn'
        # Gujarati script
        elif any('\u0A80' <= char <= '\u0AFF' for char in text):
            return 'gu'
        # Kannada script
        elif any('\u0C80' <= char <= '\u0CFF' for char in text):
            return 'kn'
        # Malayalam script
        elif any('\u0D00' <= char <= '\u0D7F' for char in text):
            return 'ml'
        # Odia script
        elif any('\u0B00' <= char <= '\u0B7F' for char in text):
            return 'or'
        # Tamil script
        elif any('\u0B80' <= char <= '\u0BFF' for char in text):
            return 'ta'
        # Telugu script
        elif any('\u0C00' <= char <= '\u0C7F' for char in text):
            return 'te'
        # Gurmukhi script (Punjabi)
        elif any('\u0A00' <= char <= '\u0A7F' for char in text):
            return 'pa'
        # Default to English if no Indian script detected
        else:
            return 'en'

    def get_supported_languages(self) -> Dict[str, str]:
        """Return supported languages mapping"""
        return self.supported_languages

    def get_voices_for_language(self, language: str) -> List[str]:
        """Return available voices for a language"""
        return self.voices.get(language, [self.default_voice])

# Create a global instance
sarvam_client = SarvamAPI()

def get_sarvam_client():
    """Get the Sarvam API client instance"""
    return sarvam_client
