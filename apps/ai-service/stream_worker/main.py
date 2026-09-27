import asyncio

from lib.redis.client import close_redis_client, get_redis_client
from stream_worker.factory import get_redis_worker

async def main():
    redis_client = get_redis_client()

    try:
        worker = get_redis_worker(redis_client)
        
        await worker.run()
        
    except Exception:
        await close_redis_client(redis_client)
        

if __name__ == "__main__":
    asyncio.run(main())