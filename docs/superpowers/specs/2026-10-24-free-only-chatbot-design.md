# Free-only chatbot model selection

## Goal

Keep the public portfolio chatbot usable without OpenRouter credits by preventing
paid model routing and falling back to the built-in responses when no free model
is available.

## Design

- Preserve the build-time `VITE_OPENROUTER_API_KEY` and optional model mapping.
- Accept an explicitly configured model only when its identifier ends in `:free`.
- Try the configured free model first, followed by the known free-model list.
- Remove `openrouter/auto` from fallback candidates because it can select paid
  routes.
- When all free OpenRouter candidates fail, return the existing local chatbot
  response instead of surfacing an API-credit error.
- Keep explicit API errors available in the browser console for diagnosis.

## Validation

- TypeScript check and production build must pass.
- The live request path must never include `openrouter/auto` or a non-`:free`
  model unless the user explicitly configures a free model.
