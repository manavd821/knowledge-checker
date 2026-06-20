from fastapi import FastAPI
from fastapi_app.bootstrap.lifespan import lifespan
from fastapi_app.bootstrap.middleware import register_middleware
from fastapi_app.bootstrap.exception import add_exception_handlers

def create_app() -> FastAPI:
    app = FastAPI(lifespan=lifespan)
    
    add_exception_handlers(app)
    register_middleware(app)
    
    return app