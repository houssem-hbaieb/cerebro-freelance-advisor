# Cerebro

Cerebro is a React portfolio built with Vite. The project gallery, project-detail
dialog, theme toggle, navigation panels, and drag-to-pan interaction are
implemented as React components. Portfolio artwork is served from the local
archive of original site media.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open the local URL printed by Vite (by default, `http://localhost:8766/`).

## Local Ollama chat

The Cerebro AI triangle uses the local Ollama API at `http://127.0.0.1:11434`.
Start Ollama before opening the chat; the UI discovers installed models and
streams replies locally. It prefers `llama3.2:3b` when installed and lets you
choose another installed model from the model selector.

Below the chat, a scrollable tools area contains a freelance proposal generator
and a customer-review sentiment classifier. Both use the currently selected
Ollama model.

If you do not have a model installed yet, run:

```powershell
ollama pull llama3.2:3b
```

Create a production build with `npm.cmd run build`. The Vite development and
preview servers proxy chat requests to the local Ollama API.

## Freelance Advisor

The **Freelance Advisor** triangle opens a research assistant backed by the
FastAPI service in `../agentic-freelance-advisor`. Describe a freelance project
(or start from one of the six example briefs) and the local agent researches
libraries, repositories, datasets and documentation, then returns a sourced
implementation guide.

Start the API first (`uv run uvicorn app.main:app --reload` in
`agentic-freelance-advisor`, with Ollama running), then `npm.cmd run dev` here.
The Vite servers proxy `/advisor` to `http://127.0.0.1:8000`.

- `src/AdvisorDialog.jsx`: the dialog, the animated loading screen driven by
  live progress events, and the result view (guide, sources, how it was
  researched, copy / download as Markdown).
- `src/advisor-run.js`: keeps the run outside React (closing the dialog does
  not lose it), posts to `/research/stream` and parses the event stream.
- `src/markdown.jsx`: renders the guide as React elements, never raw HTML.
- `src/advisor-examples.js`: the freelance example briefs.
