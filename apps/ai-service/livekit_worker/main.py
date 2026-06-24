import asyncio
from livekit import agents
from livekit.agents import WorkerOptions

from config.settings import get_settings
from infrastructure import get_logger
from livekit_worker.entrypoint import entrypoint
from dotenv import load_dotenv
from core.startup import init_infra

load_dotenv()

# async def prewarm(proc):
#     await init_infra() 

if __name__ == "__main__":
    settings = get_settings()
    
    agents.cli.run_app(
        WorkerOptions(
            entrypoint_fnc=entrypoint,
            # prewarm_fnc=prewarm,
        )
    )