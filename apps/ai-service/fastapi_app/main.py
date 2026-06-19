
from fastapi_app.bootstrap.app_factory import create_app
from fastapi_app.core.singletons import get_database, get_redis_client

app = create_app()

@app.get('/')
async def home():
    return "hello"