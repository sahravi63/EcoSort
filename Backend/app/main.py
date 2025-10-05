import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.logging import logger
from app.config import get_settings
from app.api.v1 import predict, gamification, auth


settings = get_settings()

def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        debug=settings.APP_DEBUG,
        docs_url="/docs" if settings.APP_ENV != "production" else None,
        redoc_url="/redoc" if settings.APP_ENV != "production" else None,
    )

    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Static folder
    static_dir = os.path.join(os.getcwd(), "app", "static")
    os.makedirs(os.path.join(static_dir, "uploads"), exist_ok=True)
    os.makedirs(os.path.join(static_dir, "audio"), exist_ok=True)
    app.mount("/static", StaticFiles(directory=static_dir), name="static")

    
    app.include_router(predict.router, prefix="/api/v1", tags=["predict"])
    app.include_router(gamification.router, prefix="/api/v1", tags=["gamification"])
    app.include_router(auth.router, prefix="/api/v1/auth", tags=["Authentication"])


    # Health check
    @app.get("/", tags=["health"])
    async def root():
        return {"app": settings.APP_NAME, "env": settings.APP_ENV, "status": "ok"}

    @app.on_event("startup")
    async def startup_event():
        logger.info("Starting {app} (env={env})", app=settings.APP_NAME, env=settings.APP_ENV)

    @app.on_event("shutdown")
    async def shutdown_event():
        logger.info("Shutting down {app}", app=settings.APP_NAME)

    return app

app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.APP_HOST,
        port=settings.APP_PORT,
        reload=False,  # Disable reload for stable demo
    )