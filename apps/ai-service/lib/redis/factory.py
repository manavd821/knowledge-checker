from lib.redis.cache.redis_cloud import  CacheRedisCloud
from lib.redis.client import get_redis_client
from lib.redis.stream.redis_cloud import StreamRedisCloud

def get_cache_redis_cloud():
    client = get_redis_client()
    return CacheRedisCloud(client)

def get_stream_redis_cloud():
    client = get_redis_client()
    return StreamRedisCloud(client)