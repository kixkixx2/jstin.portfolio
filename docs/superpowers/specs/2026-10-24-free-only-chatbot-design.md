# Free-only chatbot model selection

## Goal

Keep the public portfolio chatbot usable without OpenRouter credits by preventing
paid model routing and falling back to the built-in responses when no free model
is available.

## Design

- Preserve the build-time `VITE_OPENROUTER_API_KEY` and optional model mapping.
- Use `openrouter/free` by default, while allowing the deployment environment to
  provide a different explicit model.
- Try the configured model first, followed by the known free-model list.
- Do not use `openrouter/auto`, because it can select paid routes.
- Preserve the existing API error when all model attempts fail.
- Keep explicit API errors available in the browser console for diagnosis.

## Validation

- TypeScript check and production build must pass.
- The default live request path must send `openrouter/free`.
