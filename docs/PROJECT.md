# Project record

Owners: Paul and Carla. Source: https://chatgpt.com/share/6aa540b1-2394-83e9-ab8f-fd889c2f37bf?ogimg=plain

## Requirements to preserve

- Free, browser-based planning, preferably React and Three.js; no paid software requirement.
- Dimension-accurate room, cupboards, make-up table and chair, with editable sizes and positions.
- Eventually realistic timber/paint/hardware/upholstery, mirrors, lighting and views from inside their actual room.
- Compare 2â€“3 layouts after receiving measurements and storage needs.
- Source reasonably priced South African products and materials with purchase links, ZAR prices, supplier comparison and price-check dates.
- Work towards a dimensioned layout, cupboard internals, finishes, lighting, shopping/material list and approximate cost.

Carla has already been emailed the measurement/photo checklist, according to the supplied conversation. No additional email was sent during setup.

## Measurement intake

Record all four wall lengths, floor-to-ceiling height, door position/size/swing, window size/sill height/position, plugs and switches, beams/bulkheads/aircon and other obstructions. Include room photos from every wall/corner, a marked sketch, inspiration, hanging/drawer/shoe/bag/long-dress/suit/jewellery needs, and approximate budget.

Use `public/room-template.json` or the exported empty template. Keep unmeasured values null. Never substitute the illustrative demo. Mark data draft until cross-checked against photos and opposite wall measurements; verification is a deliberate later step.

## Coordinate convention

All lengths are millimetres. Stand at the designated front wall facing the back: origin is the inside front-left floor corner; x increases right, y upward, z towards the back. Width follows x; depth follows z; height follows y. Furniture positions describe the minimum x/z corner at floor level with no rotation in version 1.

For openings and fixtures, front/back offsets run from the left inside corner along +x. Left/right offsets run from the front inside corner along +z. Sill/fixture heights are measured up from finished floor. Record which wall is designated front on the sketch and photos. Door swing remains descriptive text for now.

The initial rectangular room uses width/depth/height. Preserve all four raw wall measurements separately. If opposite lengths differ or the room has recesses, extend the geometry before using it for design; do not average away irregularities.

`sourcing` stores exact product/material pages with supplier, ZA country, ZAR price and ISO price-check date. A furniture `productId` can reference a sourcing entry. Unknown prices are null. Do not label placeholders as purchase recommendations. Budget and delivery region should guide later live supplier research.

## Next stages

1. Enter Carla's measurements/photos; confirm room shape and front wall, resolve gaps.
2. Render doors/windows/obstructions and support room shapes as needed; add import and durable saves.
3. Compare layouts and test circulation/door swing; refine cupboard internals and furniture.
4. Add realistic textures, lighting and reflective mirrors using actual references.
5. Research current SA offers, compare cost/delivery and link real products to the design.


## Drawing received — 12 September 2026

Central floor: 2260 × 3890 mm (8.7914 m²). Side-wall elevation dimensions are vertical heights, not additional floor widths. Door/front ceiling: 3570 mm; window/back ceiling: 2880 mm. Fall: 690 mm over 3890 mm, approximately 10.1 degrees. The first model uses a straight slope between these endpoints.

Door opening: 900 wide × 2350 high, 680 mm wall each side, 1220 mm above. Window: 1460 wide × 620 high, sill 1750 mm, 510 mm above. Window side offsets 400 and 410 total 2270 mm with its width, 10 mm more than the stated 2260 wall. Draft uses the left offset of 400; right offset is therefore 400 pending verification.

At 2150 mm from the door (1740 mm from the window), drawing height is 3220 mm. The endpoint slope predicts 3189 mm: a 31 mm discrepancy retained for checking, not converted into an invented ceiling kink.

Socket: bottom 410 mm above floor. The drawing says 1080 mm clear on each side, suggesting a 100 mm box on a 2260 wall. Height and projection remain unknown; the socket is recorded but not drawn to an invented size.

13 room photos were supplied and inspected in the conversation. They confirm the doorway opposite the window, high window, socket below and sloping ceiling. `public/references` preserves the drawing and one representative room photo. Other original photos remain at their supplied paths.

No final furniture arrangement or verified supplier offer has been selected. Measure the discrepancies and door swing before construction-level planning.
