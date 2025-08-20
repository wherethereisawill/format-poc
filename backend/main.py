# cd backend
# uv run -- uvicorn main:app --reload --host 0.0.0.0 --port 8000

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from utils.generateReport import generate_report

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateReportRequest(BaseModel):
    data: str

@app.post("/generate-report")
async def api_generate_report(payload: GenerateReportRequest):
    return generate_report(payload.data)