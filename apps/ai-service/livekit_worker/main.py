import os

from livekit import agents
from livekit.agents import WorkerOptions
from config.settings import get_settings
from lib.logging.logging import get_logger
from livekit_worker.entrypoint import entrypoint
from dotenv import load_dotenv


load_dotenv()
logger = get_logger(__name__)

if __name__ == "__main__":
    settings = get_settings()
    try:
        agents.cli.run_app(
            WorkerOptions(
                entrypoint_fnc=entrypoint,
                ws_url=settings.LIVEKIT_URL,
                api_key=settings.LIVEKIT_API_KEY,
                api_secret=settings.LIVEKIT_API_SECRET,
            )
        )
    except Exception as e:
        logger.error(f"Error: {str(e)}", error = e)