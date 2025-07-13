import requests
import base64
import io
import asyncio
import aiohttp
import asyncio
import aiohttp
import json
import base64
from typing import Optional
from app.core.config import settings

# Sarvam API endpoints
SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech"
SARVAM_STT_URL = "https://api.sarvam.ai/speech-to-text"
SARVAM_TRANSLATE_URL = "https://api.sarvam.ai/translate"

# Supported Indian languages by Sarvam with updated voices
SARVAM_LANGUAGES = {
    "hindi": {"code": "hi-IN", "voice": "meera", "name": "Hindi", "flag": "🇮🇳"},
    "bengali": {"code": "bn-IN", "voice": "kalpana", "name": "বাংলা (Bengali)", "flag": "🇧🇩"},
    "gujarati": {"code": "gu-IN", "voice": "ishani", "name": "ગુજરાતી (Gujarati)", "flag": "🇮🇳"},
    "kannada": {"code": "kn-IN", "voice": "nandini", "name": "ಕನ್ನಡ (Kannada)", "flag": "🇮🇳"},
    "malayalam": {"code": "ml-IN", "voice": "neerja", "name": "മലയാളം (Malayalam)", "flag": "🇮🇳"},
    "marathi": {"code": "mr-IN", "voice": "supriya", "name": "मराठी (Marathi)", "flag": "🇮🇳"},
    "odia": {"code": "or-IN", "voice": "subhashini", "name": "ଓଡ଼ିଆ (Odia)", "flag": "🇮🇳"},
    "punjabi": {"code": "pa-IN", "voice": "gurleen", "name": "ਪੰਜਾਬੀ (Punjabi)", "flag": "🇮🇳"},
    "tamil": {"code": "ta-IN", "voice": "kabir", "name": "தமிழ் (Tamil)", "flag": "🇮🇳"},
    "telugu": {"code": "te-IN", "voice": "ananya", "name": "తెలుగు (Telugu)", "flag": "🇮🇳"},
    "english": {"code": "en-IN", "voice": "arya", "name": "English (Indian)", "flag": "🇬🇧"}
}

# Available Sarvam voices
SARVAM_VOICES = {
    "anushka": {"name": "Anushka", "gender": "female", "style": "professional"},
    "abhilash": {"name": "Abhilash", "gender": "male", "style": "confident"},
    "manisha": {"name": "Manisha", "gender": "female", "style": "friendly"},
    "meera": {"name": "Meera", "gender": "female", "style": "traditional"},
    "kalpana": {"name": "Kalpana", "gender": "female", "style": "gentle"},
    "ishani": {"name": "Ishani", "gender": "female", "style": "modern"},
    "nandini": {"name": "Nandini", "gender": "female", "style": "elegant"},
    "neerja": {"name": "Neerja", "gender": "female", "style": "warm"},
    "supriya": {"name": "Supriya", "gender": "female", "style": "cheerful"},
    "subhashini": {"name": "Subhashini", "gender": "female", "style": "calm"},
    "gurleen": {"name": "Gurleen", "gender": "female", "style": "vibrant"},
    "kabir": {"name": "Kabir", "gender": "male", "style": "strong"},
    "ananya": {"name": "Ananya", "gender": "female", "style": "youthful"},
    "arya": {"name": "Arya", "gender": "male", "style": "neutral"}
}

class SarvamService:
    def __init__(self):
        self.api_key = settings.SARVAM_API_KEY
        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }

    async def text_to_speech(self, text: str, language: str = "hindi", voice: str = "anushka") -> Optional[bytes]:
        """
        Convert text to speech using Sarvam TTS API
        """
        if not self.api_key:
            raise ValueError("Sarvam API key not configured")
        
        if language not in SARVAM_LANGUAGES:
            language = "hindi"  # Default fallback
        
        # Use custom voice if provided and valid, otherwise use language default
        if voice not in SARVAM_VOICES:
            voice = SARVAM_LANGUAGES[language]["voice"]
        
        lang_config = SARVAM_LANGUAGES[language]
        
        payload = {
            "inputs": [text],
            "target_language_code": lang_config["code"],
            "speaker": voice,  # Use the selected voice
            "pitch": 0,
            "pace": 1.0,
            "loudness": 1.0,
            "speech_sample_rate": 22050,
            "enable_preprocessing": True,
            "model": "bulbul:v1"
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(SARVAM_TTS_URL, json=payload, headers=self.headers) as response:
                    if response.status == 200:
                        result = await response.json()
                        # Sarvam returns base64 encoded audio
                        if "audios" in result and len(result["audios"]) > 0:
                            audio_base64 = result["audios"][0]
                            audio_bytes = base64.b64decode(audio_base64)
                            return audio_bytes
                    else:
                        print(f"Sarvam TTS Error: {response.status}, {await response.text()}")
                        return None
        except Exception as e:
            print(f"Sarvam TTS Exception: {e}")
            return None

    async def speech_to_text(self, audio_data: bytes, language: str = "hindi") -> Optional[str]:
        """
        Convert speech to text using Sarvam STT API
        """
        if not self.api_key:
            raise ValueError("Sarvam API key not configured")
        
        if language not in SARVAM_LANGUAGES:
            language = "hindi"  # Default fallback
        
        lang_config = SARVAM_LANGUAGES[language]
        
        # Convert audio to base64
        audio_base64 = base64.b64encode(audio_data).decode('utf-8')
        
        payload = {
            "language_code": lang_config["code"],
            "audio": audio_base64,
            "model": "saaras:v1"
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(SARVAM_STT_URL, json=payload, headers=self.headers) as response:
                    if response.status == 200:
                        result = await response.json()
                        if "transcript" in result:
                            return result["transcript"]
                    else:
                        print(f"Sarvam STT Error: {response.status}, {await response.text()}")
                        return None
        except Exception as e:
            print(f"Sarvam STT Exception: {e}")
            return None

    async def translate_text(self, text: str, source_language: str, target_language: str = "english") -> Optional[str]:
        """
        Translate text between supported languages
        """
        if not self.api_key:
            raise ValueError("Sarvam API key not configured")
        
        if source_language not in SARVAM_LANGUAGES or target_language not in SARVAM_LANGUAGES:
            return text  # Return original if languages not supported
        
        source_code = SARVAM_LANGUAGES[source_language]["code"]
        target_code = SARVAM_LANGUAGES[target_language]["code"]
        
        payload = {
            "input": text,
            "source_language_code": source_code,
            "target_language_code": target_code,
            "speaker_gender": "Male",
            "mode": "formal",
            "model": "mayura:v1",
            "enable_preprocessing": True
        }

        try:
            async with aiohttp.ClientSession() as session:
                async with session.post(SARVAM_TRANSLATE_URL, json=payload, headers=self.headers) as response:
                    if response.status == 200:
                        result = await response.json()
                        if "translated_text" in result:
                            return result["translated_text"]
                    else:
                        print(f"Sarvam Translate Error: {response.status}, {await response.text()}")
                        return text
        except Exception as e:
            print(f"Sarvam Translate Exception: {e}")
            return text

    def get_supported_languages(self):
        """
        Return list of supported languages
        """
        return [
            {
                "key": key,
                "name": config["name"],
                "code": config["code"],
                "voice": config["voice"],
                "flag": config["flag"]
            }
            for key, config in SARVAM_LANGUAGES.items()
        ]

    def get_available_voices(self):
        """
        Return list of available voices
        """
        return [
            {
                "key": key,
                "name": config["name"],
                "gender": config["gender"],
                "style": config["style"]
            }
            for key, config in SARVAM_VOICES.items()
        ]

# Global instance
sarvam_service = SarvamService()
