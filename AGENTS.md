# Frontend implementation rules

## Mandatory browser verification

Every frontend/UI change must be verified through Chrome DevTools before it is considered complete.

1. Run the local application and open the affected route in Chrome DevTools.
2. Verify the desktop layout at 1920 px width with a screenshot.
3. Verify the mobile layout at 390 px width with a screenshot.
4. Exercise every changed interaction (click, hover, keyboard focus, open/close, animation, and responsive behavior where applicable).
   For scroll-driven UI, programmatically scroll through the full interaction range in Chrome DevTools and verify both the initial and final rendered state.
5. Check the DevTools console. Fix all errors introduced by the change; do not treat visual inspection alone as verification.
6. Verify that visible assets load successfully and that the browser does not rely on temporary Figma asset URLs.
7. Run the production build after browser verification.

Do not claim a frontend change is complete without this Chrome DevTools verification.

## No partial handoff rule

For an active implementation request, do not stop after a build succeeds, a single interaction works, or a partial visual check passes. Continue the cycle **implement → Chrome DevTools validate → identify mismatch → fix → validate again** until every requested behavior has been demonstrated in the browser.

Before replying that work is complete, explicitly verify all acceptance criteria from the user's latest request. If any one is missing, broken, visually wrong, clipped, or only partially implemented, keep working. A progress update must state it is incomplete; never describe an interim workaround as the requested final behavior.

## Figma component fidelity: no substitutes

When the user specifies that a Figma frame is assembled from components and child layers, implement that exact component/layer hierarchy in code. Do not replace it with a flattened master image, a cropped image region, a visual overlay, a placeholder, or another approximation unless the user explicitly approves that substitution.

For interactive Figma components, transform and control the actual component wrapper and its real child layers. Examples: hide a real wall layer, toggle a real glass layer, or move the real room component. Never imitate these behaviors by filtering, masking, or copying pixels from a combined render.

If the requested hierarchy has not yet been completely implemented, say only that it is incomplete. Do not report an interaction as working based solely on state changes, CSS classes, a successful build, or a partial DevTools assertion. Completion requires: the complete requested hierarchy, every requested behavior, and Chrome DevTools validation of both visual output and interaction.

## Figma-to-HTML visual-fidelity loop

For any UI sourced from Figma, Figma MCP is the source of truth and Chrome DevTools MCP is the source of truth for the rendered implementation.

1. Read the intended Figma node and its screenshot before editing.
2. Map meaningful Figma nodes to semantic DOM elements. Add stable `data-testid` attributes where a reliable mapping is otherwise unavailable.
3. Load the application through its local Vite URL in Chrome DevTools. Do not use `file://` for this React application: its modules and assets require the dev server.
4. Confirm the active DevTools page is the intended route, not `about:blank`.
5. For every key mapped element, inspect `getBoundingClientRect()` and `getComputedStyle()` in DevTools.
6. Compare the implementation with Figma for dimensions, spacing, typography, colors, flex/grid alignment, layering, and responsive behavior.
7. Fix every in-scope mismatch and repeat the Figma/DevTools comparison loop until the screen matches.

Never infer visual correctness from source code alone. A screenshot is necessary but not sufficient: validate DOM geometry and computed styles for the important elements as well.

## React project conventions

- Keep presentational styles in the existing source stylesheet architecture. Do not introduce a parallel CSS/SCSS pipeline or edit generated build output in `dist/`.
- Prefer the project's existing units and tokens. Use `rem` for scalable typography and spacing when it does not compromise Figma fidelity; use `px` only where pixel precision is necessary (for example, Figma-matched geometry and 1px borders).
- Static React content may be declared in JSX. JavaScript should not generate static DOM from HTML strings, `innerHTML`, `replaceChildren()`, or opaque template helpers.
- Before handoff, test the changed controls through pointer and keyboard interaction and inspect browser console messages. Fix every error introduced by the change.
- For an interactive visual feature, a successful build is never sufficient: validate the actual state change in Chrome DevTools (for example, an element's computed transform, `getBoundingClientRect()`, visibility, and active target after each click).
