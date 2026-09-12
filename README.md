# Paul & Carla — Closet planner

Free React + TypeScript + React Three Fiber starter. No paid design software or service is required. The browser interface opens with the draft measurements from AANTREK KAMER.pdf, with a separate optional demo and empty template.

## Run

Requires Node.js 20.19+ or 22.12+ for development. End users only need a modern WebGL-capable browser when hosted.

```sh
npm install
npm run dev
npm run build
```

## Structure

- `src/data/room.ts`: canonical typed room record, empty project, demo and fit checks.
- `src/components/RoomView.tsx`: scale-based 3D room and furniture.
- `src/main.tsx`: measurement and furniture editor, JSON export.
- `docs/PROJECT.md`: preserved requirements, measurement conventions and next stages.
- `public/room-template.json`: empty measurement record, ready for Carla's information.

The renderer converts millimetres to metres once at its boundary. JSON exports keep millimetres. Data stays in memory: **export before refreshing**. This foundation does not yet import exports or store project changes automatically.

## First version

Editable rectangular room dimensions; editable cupboard/table/chair sizes and positions; three finish colours; overview and interior camera; out-of-room and overlap warnings; JSON export. A lockfile pins the installed dependencies.

## Deliberate limits

Not a construction drawing or a completed closet design. Door and window openings and a sloped ceiling are rendered. The overview cuts away front/right walls and makes the ceiling transparent; inside view shows all walls. Fixtures and supplier offers are stored but not rendered yet. One actual room photo is shown under Project. Furniture is schematic with 18 mm cupboard panels, without manufacturing validation. Finishes are colour approximations, not realistic timber textures or calibrated samples. No mirror reflections yet. No rotation, non-rectangular geometry, door swing or aisle checks. No paid accounts, analytics, API keys or backend.


## September 12 update
Three prefab layout comparisons are available in Options, based on Leroy Merlin listings. Budget R20,000; rural Hekpoort delivery is unquoted. Cupboard-only totals R3,298 / R8,596 / R12,796. Interiors, table and chair are schematic, not manufacturer drawings. Stock signals conflict, so confirm availability before purchase.

The browser automatically saves the current project locally. Export JSON for backup. The local preview must be running to open http://127.0.0.1:5173/. Run npm run dev from this folder to restart it.

Furniture dimensions, positions, cardinal orientation, finish, shelf/drawer counts, rail height, shelf-bay proportion and door visibility can be edited. Room opening and fixture dimensions can be edited; fixtures are recorded but not rendered. No automatic door-swing or clothing-envelope collision checks.
