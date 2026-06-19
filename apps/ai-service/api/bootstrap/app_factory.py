from fastapi import FastAPI
from api.bootstrap.lifespan import lifespan
from api.bootstrap.middleware import register_middleware

def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    
    register_middleware(app)
    
    return app