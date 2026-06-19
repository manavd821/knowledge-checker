from fastapi_app.bootstrap.app_factory import create_app

app = create_app()

@app.get('/')
async def home():
    return "hello"