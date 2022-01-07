from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routers import youtube_views
from routers import bank_marketing

app = FastAPI()

origins = [
    "http://localhost:3000",
    "https://data-portfolio.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(youtube_views.router)
app.include_router(bank_marketing.router)

@app.get("/")
def read_root():
    return {
        "github": "https://github.com/dendihandian/data-portfolio"
    }