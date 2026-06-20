from fastapi import FastAPI
from fastapi_app.error_handler import global_exception_handler

def add_exception_handlers(app : FastAPI):
    app.add_exception_handler(Exception, global_exception_handler)