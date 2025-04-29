from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class InferenceRequest(BaseModel):
    text: str

class InferenceResponse(BaseModel):
    result: str

@app.post("/api/infer", response_model=InferenceResponse)
async def infer(req: InferenceRequest):
    fake_result = f"AI 결과: '{req.text}' 요약됨!"
    return InferenceResponse(result=fake_result)