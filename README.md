To test:
1. Clone repo locally
2. In backend folder create a .env file and add an OPENAI_API_KEY
3. In project root via CLI:
    - `cd frontend`
    - `npm install`
    - `npm run dev`
    - Open http://localhost:5173/ in the Browser
4. In project root via CLI:
    - `uv sync`
    - `cd backend`
    - `uv run -- uvicorn main:app --reload --host 0.0.0.0 --port 8000`