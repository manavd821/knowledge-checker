from fastapi import FastAPI
from fastapi_app.bootstrap.lifespan import lifespan
from fastapi_app.bootstrap.middleware import register_middleware

def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    
    register_middleware(app)
    
    return app