## Format OpenAI API output POC
Two-folder project with a backend (Python, managed by uv) and a frontend (React + Vite).
This README explains how to clone, configure, and run both locally.

## Prerequisites:
- UV (Python package manager) https://docs.astral.sh/uv/
- Node.js (for React Frontend) https://nodejs.org/

## To test:
1. Clone repo locally
    - `git clone https://github.com/wherethereisawill/format-poc.git`
    - `cd format-poc`
2. In backend folder create a .env file and add an OPENAI_API_KEY
    - e.g. `OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxx`
3. Install & run frontend - In project root via CLI:
    - `cd frontend`
    - `npm install`
    - `npm run dev`
    - Open http://localhost:5173/ in the Browser
4. Install and run backend - In project root via CLI:
    - `cd backend`
    - `uv sync`
    - `uv run -- uvicorn main:app --reload --host 0.0.0.0 --port 8000`

## How it works

- **Frontend (`frontend/src/App.tsx`)**: A simple React UI lets you paste raw survey-style text into a `Textarea` and click "Generate report". It `POST`s `{ data }` to the backend endpoint at `${API_BASE_URL}/generate-report`, where `API_BASE_URL` comes from `VITE_API_BASE_URL` (defaults to `http://localhost:8000`). The response is rendered into four sections: zinger headline, killer insight, what we asked, and a list of "what stood out" bullets. Hooks are bolded in the UI after removing any Markdown bold markers.
- **Backend API (`backend/main.py`)**: A FastAPI app exposes `POST /generate-report` (CORS-enabled for `http://localhost:5173`). It accepts a JSON body `{ "data": string }` and delegates to `utils.generateReport.generate_report`.
- **Report generation (`backend/utils/generateReport.py`)**: Uses `OPENAI_API_KEY` from `.env` to initialize the OpenAI client. It defines strict Pydantic schemas (`Report`, `Bullet`) and calls `client.responses.parse(model="gpt-5", text_format=Report)` with two messages: a detailed `developer_prompt` and a `user` message composed of `assistant_prompt` plus the raw data. The parsed fields (`zinger_headline`, `killer_insight`, `what_we_asked`, `what_stood_out`) are extracted and returned as JSON.
- **Prompting (`backend/utils/prompts.py`)**: `developer_prompt` sets voice, method, and strict output formatting rules (UK audience, section order, bullet limits, percentage formatting, bold hook rules). `assistant_prompt` prefixes the raw data.

End-to-end, the UI sends raw text → FastAPI calls OpenAI with structured prompts → the model response is schema-validated and returned → the UI renders the four sections and bullets.

## Working demo
https://github.com/user-attachments/assets/b772bfdc-442c-4e47-8b56-1ecfaa4b2733