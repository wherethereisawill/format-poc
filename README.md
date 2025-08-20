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

https://github.com/user-attachments/assets/b772bfdc-442c-4e47-8b56-1ecfaa4b2733