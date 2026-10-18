# Cupboard design site

- This checkout starts at Sites saved version 3, source c9d363e065cb90d057cdb0d4e26664aea35c0fa4.
- Read README.md and docs/PROJECT.md before changing the planner. Preserve millimetres in exported JSON and convert only at the renderer boundary.
- GitHub source is private under paulburger40-maker/cupboard-design-site. Use codex/ branches for substantial changes.
- Run npm.cmd test and npm.cmd run build for planner changes. Keep package-lock.json in Git.
- Keep credentials, node_modules, dist, work, temporary archives and browser output out of Git.
- The existing Sites identity is in .openai/hosting.json. Reuse it for future publishing. Saving to GitHub does not publish the website.
- Browser-local saved designs require JSON export for backup. Do not claim Git backs up users' browser storage.
