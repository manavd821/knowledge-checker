from fastapi import FastAPI
from api.middlewares.logging import logging_middlware

def register_middleware(app : FastAPI):
    app.middleware("http")(logging_middlware)