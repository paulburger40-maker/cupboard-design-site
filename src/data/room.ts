/** All measurements are millimetres. Origin: inside front-left floor corner.
 * x goes right, y goes up, z goes towards the back. Positions are minimum corners.
 * Unknown measurements are null, never 0. Demo data is separate from the real project.
 */
export type Wall = 'front' | 'back' | 'left' | 'right';
export type Size = { width: number; depth: number; height: number };
export type Item = { id: string; kind: 'cupboard' | 'vanity' | 'chair'; name: string; size: Size; position: { x: number; z: number }; finish: 'oak' | 'white' | 'walnut'; productId: string | null; rotation?:number; interior?:{shelves:number;drawers:number;railHeight:number;split:number;doors:boolean}; modified?:boolean };
export function footprint(item:Item){const swap=(item.rotation??0)%180!==0;return {width:swap?item.size.depth:item.size.width,depth:swap?item.size.width:item.size.depth};}
export interface RoomProject {
  schemaVersion: 1;
  layoutRevision: 2;
  name: string;
  units: 'mm';
  measurementStatus: 'awaiting-measurements' | 'draft' | 'verified' | 'demo';
  sourceChat: string;
  room: { shape: 'rectangle'; width: number | null; depth: number | null; height: number | null; ceiling?: {kind:'linear-slope'; frontHeight:number; backHeight:number; checkPoints:{z:number;height:number}[]}; wallMeasurements: Record<Wall, number | null>; notes: string };
  openings: { id: string; kind: 'door' | 'window'; wall: Wall; offset: number | null; width: number | null; height: number | null; sillHeight: number | null; swing: string | null }[];
  fixtures: { id: string; kind: 'socket' | 'switch' | 'beam' | 'bulkhead' | 'aircon' | 'other'; wall: Wall; offset: number | null; heightFromFloor: number | null; width: number | null; height: number | null; projection: number | null; notes: string }[];
  items: Item[];
  references: { id: string; kind: 'room-photo' | 'inspiration' | 'plan'; wall: Wall | null; file: string; notes: string }[];
  sourcing: { id: string; name: string; supplier: string; country: 'ZA'; url: string; priceZar: number | null; checkedAt: string | null; notes: string }[];
  preferences: { budgetZar: number | null; styleNotes: string; storageNeeds: string; currency: 'ZAR' };
}
export const blankProject: RoomProject = {
  schemaVersion: 1, layoutRevision: 2, name: 'Paul & Carla · Walk-in closet', units: 'mm', measurementStatus: 'awaiting-measurements',
  sourceChat: 'https://chatgpt.com/share/6aa540b1-2394-83e9-ab8f-fd889c2f37bf?ogimg=plain',
  room: { shape: 'rectangle', width: null, depth: null, height: null, wallMeasurements: { front: null, back: null, left: null, right: null }, notes: '' },
  openings: [], fixtures: [], items: [], references: [], sourcing: [],
  preferences: { budgetZar: null, styleNotes: '', storageNeeds: '', currency: 'ZAR' }
};
export const demoProject: RoomProject = {
  ...blankProject, measurementStatus: 'demo',
  room: { ...blankProject.room, width: 3600, depth: 4200, height: 2700 },
  items: [
    { id: 'wardrobe-1', kind: 'cupboard', name: 'Double wardrobe', size: { width: 1200, depth: 600, height: 2400 }, position: { x: 0, z: 3600 }, finish: 'oak', productId: null },
    { id: 'wardrobe-2', kind: 'cupboard', name: 'Drawer wardrobe', size: { width: 900, depth: 600, height: 2400 }, position: { x: 1200, z: 3600 }, finish: 'white', productId: null },
    { id: 'vanity-1', kind: 'vanity', name: 'Make-up table', size: { width: 1200, depth: 500, height: 760 }, position: { x: 2350, z: 3700 }, finish: 'oak', productId: null },
    { id: 'chair-1', kind: 'chair', name: 'Vanity chair', size: { width: 500, depth: 500, height: 800 }, position: { x: 2700, z: 2850 }, finish: 'white', productId: null, rotation: 180 }
  ]
};
export function layoutWarnings(project: RoomProject): string[] {
  project={...project,items:project.items.map(i=>({...i,size:{...i.size,...footprint(i)}}))};
  const {width,depth,height} = project.room;
  if (!width || !depth || !height) return ['Enter all three room dimensions to build the room.'];
  const warnings: string[] = [];
  for (const item of project.items) {
    if(item.interior && (item.interior.railHeight>item.size.height-30 || item.interior.drawers*190+30>item.size.height)) warnings.push(`${item.name}: interior exceeds cupboard height.`);
    if (item.position.x < 0 || item.position.z < 0 || item.position.x + item.size.width > width || item.position.z + item.size.depth > depth || item.size.height > height) warnings.push(`${item.name} extends outside the room.`);
    if(project.room.ceiling){const slope=project.room.ceiling;const at=(z:number)=>slope.frontHeight+(slope.backHeight-slope.frontHeight)*z/depth;const limit=Math.min(at(item.position.z),at(item.position.z+item.size.depth));if(item.size.height>limit)warnings.push(`${item.name} intersects the sloping ceiling.`);}
  }
  for (let i=0;i<project.items.length;i++) for (let j=i+1;j<project.items.length;j++) {
    const a=project.items[i], b=project.items[j];
    if(a.position.x < b.position.x+b.size.width && a.position.x+a.size.width > b.position.x && a.position.z < b.position.z+b.size.depth && a.position.z+a.size.depth > b.position.z) warnings.push(`${a.name} overlaps ${b.name}.`);
  }
  return warnings;
}
export const measuredProject: RoomProject = {
  ...structuredClone(blankProject), measurementStatus:'draft',
  preferences:{budgetZar:20000,currency:'ZAR',styleNotes:'Light oak and warm white, open hanging, drawers, shoe shelves, warm lighting, vanity and chair. Delivery area: Hekpoort; farm delivery quote required.',storageNeeds:'Paul and Carla: shared two-sided storage, make-up table and chair.'},
  room:{shape:'rectangle',width:2260,depth:3890,height:3570,wallMeasurements:{front:2260,back:2260,left:3890,right:3890},ceiling:{kind:'linear-slope',frontHeight:3570,backHeight:2880,checkPoints:[{z:2150,height:3220}]},notes:'Transcribed from AANTREK KAMER.pdf. Front = doorway; back = window. Straight slope between end heights assumed. Mid-height 3220 at z=2150 differs from linear interpolation by 31 mm. Window offsets 400+1460+410=2270 versus 2260 wall; left offset retained for draft (right becomes 400).'},
  openings:[{id:'door',kind:'door',wall:'front',offset:680,width:900,height:2350,sillHeight:0,swing:null},{id:'window',kind:'window',wall:'back',offset:400,width:1460,height:620,sillHeight:1750,swing:null}],
  fixtures:[{id:'socket-window',kind:'socket',wall:'back',offset:1080,heightFromFloor:410,width:100,height:null,projection:null,notes:'Bottom at 410 mm. 1080 mm each side implies 100 mm box width on a 2260 wall; actual box dimensions to verify. No guessed box height.'}],
  references:[{id:'plan',kind:'plan',wall:null,file:'AANTREK KAMER.pdf',notes:'Unfolded wall elevations around central floor; dimensions in centimetres converted to millimetres.'}],
};
