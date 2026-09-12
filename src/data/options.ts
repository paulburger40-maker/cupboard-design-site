import type {Item,RoomProject} from './room';
export const products=[
 {id:'open180',name:'180 cm open wardrobe kit',price:1649,width:1800,depth:400,height:1800,url:'https://leroymerlin.co.za/built-in-wardrobe-kit-180cm-81505323'},
 {id:'white150',name:'150 cm white wardrobe',price:3749,width:1500,depth:475,height:2100,url:'https://leroymerlin.co.za/built-in-wardrobe-150cm-white-81505307'},
 {id:'white100',name:'100 cm white wardrobe',price:2649,width:1000,depth:475,height:2100,url:'https://leroymerlin.co.za/built-in-wardrobe-100cm-w100xh210xd47-5cm-81505294'}
];
export const options=[
 {id:'open',name:'01 · Open & affordable',description:'One 180 cm organiser on each side. Most budget remains for a vanity, shoe storage and finishes. White kit; oak colour is a design alternative.',lines:[{id:'open180',qty:2}],note:'400 mm carcass depth; allow about 600 mm for hanging clothes. Approximate usable aisle: 1,060 mm.'},
 {id:'mixed',name:'02 · Open + enclosed',description:'An open organiser and a 100 cm wardrobe on each side. A balance of visible hanging and enclosed storage.',lines:[{id:'open180',qty:2},{id:'white100',qty:2}],note:'2,850 mm run per side including a 50 mm gap. Hinged doors need additional opening clearance.'},
 {id:'enclosed',name:'03 · White fitted look',description:'A 150 cm wardrobe and a 100 cm wardrobe on each side. Best for keeping clothes behind doors.',lines:[{id:'white150',qty:2},{id:'white100',qty:2}],note:'2,550 mm run per side including a 50 mm gap. 1,310 mm aisle between closed cupboards; check door swings.'}
];
export const total=(option:typeof options[number])=>option.lines.reduce((n,l)=>n+products.find(p=>p.id===l.id)!.price*l.qty,0);
export function makeLayout(project:RoomProject,option:typeof options[number]):Item[]{
 const roomWidth=project.room.width??2260,roomDepth=project.room.depth??3890;
 const items:Item[]=[];
 for(const side of ['left','right']){let z=250;for(const line of option.lines){const p=products.find(p=>p.id===line.id)!;items.push({id:`${side}-${p.id}`,kind:'cupboard',name:`${side} · ${p.name}`,size:{width:p.width,depth:p.depth,height:p.height},position:{x:side==='left'?0:roomWidth-p.depth,z},rotation:side==='left'?270:90,finish:'white',productId:p.id,interior:{shelves:3,drawers:p.id==='open180'?2:0,railHeight:p.height-300,split:0.4,doors:p.id!=='open180'}});z+=p.width+50;}}
 items.push({id:'vanity',kind:'vanity',name:'Make-up table · size proposal, unpriced',size:{width:1000,depth:400,height:760},position:{x:(roomWidth-1000)/2,z:roomDepth-400},finish:'oak',productId:null},{id:'chair',kind:'chair',name:'Vanity chair · size proposal, unpriced',size:{width:450,depth:450,height:750},position:{x:(roomWidth-450)/2,z:roomDepth-950},finish:'white',productId:null});return items;
}
