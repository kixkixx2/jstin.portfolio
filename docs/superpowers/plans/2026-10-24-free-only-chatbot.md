# Free-only Chatbot Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ensure the public chatbot requests OpenRouter's explicit free router instead of paid-capable automatic routing.

**Architecture:** Keep model selection in `chatbotService.ts`. Restore Vite's build-time model mapping, default to OpenRouter's `openrouter/free` router, remove paid-capable `openrouter/auto`, and preserve console diagnostics without exposing the API key.

**Tech Stack:** React 19, TypeScript, Vite, OpenRouter Chat Completions API, npm scripts.

---

### Task 1: Restore build-time model configuration

**Files:**
- Modify: `vite.config.ts:10-14`

- [ ] **Step 1: Restore the model environment mapping**

Add the model definition beside the existing API-key definition:

```ts
'import.meta.env.VITE_OPENROUTER_MODEL': JSON.stringify(
  process.env.VITE_OPENROUTER_MODEL || process.env.OPENROUTER_MODEL || ''
),
```

- [ ] **Step 2: Run the type check**

Run:

```powershell
npm run lint
```

Expected: TypeScript exits with code `0`.

- [ ] **Step 3: Commit the configuration change**

```powershell
git add vite.config.ts
git commit -m "fix: restore chatbot model build configuration"
```

### Task 2: Make OpenRouter candidate selection free-only

**Files:**
- Modify: `src/services/chatbotService.ts:220-305`

- [ ] **Step 1: Add a free-model predicate**

Use a small typed helper before `fetchOpenRouterResponse`:

```ts
const isFreeModel = (model: string): boolean => model.trim().endsWith(':free');
```

- [ ] **Step 2: Remove paid-capable fallback routing**

Delete `openrouter/auto` from `FALLBACK_FREE_MODELS`. Build candidates from only free identifiers:

```ts
const modelsToTry = Array.from(
  new Set([requestedModel, DEFAULT_MODEL, ...FALLBACK_FREE_MODELS])
).filter((model): model is string => Boolean(model) && isFreeModel(model));
```

This means an empty model configuration or a paid model cannot be sent accidentally.

- [ ] **Step 3: Add a deterministic no-candidate error**

If `modelsToTry.length === 0`, throw an error that clearly states no free model was configured. Do not include the API key in the message.

- [ ] **Step 4: Run the type check and production build**

Run:

```powershell
npm run lint
npm run build
```

Expected: Both commands exit with code `0`.

### Task 3: Fall back to local chatbot responses

**Files:**
- Modify: `src/services/chatbotService.ts:307-346`

- [ ] **Step 1: Change live-query failure behavior**

In the existing `if (apiKey)` block, retain the console error but return the built-in response after `fetchOpenRouterResponse` fails:

```ts
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      console.error('OpenRouter live query error:', errorMsg);
      return getLocalChatbotResponse(q);
    }
```

This preserves live AI when available and guarantees commands such as `skills`, `projects`, `resume`, `education`, `hire me`, and `contact` still work without credits.

- [ ] **Step 2: Verify the complete build**

Run:

```powershell
npm run lint
npm run build
```

Expected: Both commands exit with code `0`, and the build emits `dist/index.html` plus bundled assets.

- [ ] **Step 3: Inspect the diff**

Run:

```powershell
git diff --check
git diff -- src/services/chatbotService.ts vite.config.ts
```

Expected: No whitespace errors; no API key value or `openrouter/auto` remains in the changed routing code.

- [ ] **Step 4: Commit the behavior change**

```powershell
git add src/services/chatbotService.ts
git commit -m "fix: route chatbot through free models only"
```

### Task 4: Validate the deployed behavior

**Files:**
- No source changes.

- [ ] **Step 1: Confirm the worktree and commits**

Run:

```powershell
git status --short --branch
git log -3 --oneline
```

Expected: Only intentional commits are present and no unrelated files are staged.

- [ ] **Step 2: Push the implementation**

Run:

```powershell
git push origin main
```

Expected: `main` advances on `https://github.com/kixkixx2/jstin.portfolio.git`.

- [ ] **Step 3: Test the local fallback path**

Open the deployed site after GitHub Pages finishes the workflow, enter `skills`, and confirm a normal local chatbot response appears even when OpenRouter reports insufficient credits. The browser console may contain the diagnostic OpenRouter error, but the visitor-facing terminal must not show the credit error.
