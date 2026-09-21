import type {Item,RoomProject} from './room';
type Product={id:string;name:string;price:number;url:string;width?:number;depth?:number;height?:number;interior?:'shelf'|'hanging';finish?:Item['finish'];doors?:boolean};
export const products:Product[]=[
 {id:'open180',name:'180 cm open wardrobe kit',price:1649,width:1800,depth:400,height:1800,interior:'shelf',finish:'white',url:'https://leroymerlin.co.za/built-in-wardrobe-kit-180cm-81505323'},
 {id:'buco-shelf',name:'BUCO double-door shelf cupboard',price:3263.11,width:900,depth:580,height:2250,interior:'shelf',finish:'white',doors:true,url:'https://www.buco.co.za/cupboard-shelf-double-door-2250x900x580-unassembled-incl-h-ware-1277325'},
 {id:'buco-hanging',name:'BUCO double-door hanging cupboard',price:2577.89,width:900,depth:580,height:2250,interior:'hanging',finish:'white',doors:true,url:'https://www.buco.co.za/departments/cupboards-cabinetry/insta-cupboards/cupboard-hanging-double-door-2250x900x580-unassembled-incl-h-ware-1277326'},
 {id:'ucan-narrow',name:'UCAN 600 mm shelf unit',price:1399,width:600,depth:400,height:2100,interior:'shelf',finish:'white',url:'https://ucandoit.co.za/products/freestanding-cupboard-with-shelves'},
 {id:'ucan-shelf',name:'UCAN 1000 mm shelving carcass',price:2699,width:1000,depth:500,height:2100,interior:'shelf',finish:'white',url:'https://ucandoit.co.za/products/built-in-cupboard-frame-with-shelving-space'},
 {id:'ucan-hanging',name:'UCAN 1000 mm hanging carcass',price:1799,width:1000,depth:500,height:2100,interior:'hanging',finish:'white',url:'https://ucandoit.co.za/collections/bedroom-cupboards/products/built-in-cupboard-frame-with-hanging-space-1'},
 {id:'track',name:'Leroy Merlin 3.6 m sliding track',price:1269,url:'https://leroymerlin.co.za/kit-2-track-sets-geg-white-3600-mm'},
 {id:'rollers',name:'Sliding roller/guide hardware',price:399,url:'https://leroymerlin.co.za/sliding-door-hardware-set-2-upper-guides-2-bottom-rollers-2-end-stops-screws-068c0f6b'},
 {id:'melamine',name:'16 mm Picco White melamine sheet',price:638,url:'https://freemo.co.za/product/16mm-picco-white-mellaine-2750-x-1830/'},
 {id:'edging',name:'White pre-glued edging, 5 m',price:23,url:'https://leroymerlin.co.za/wood/boards-for-interior-use/edging-accessories/precut-edging'},
 {id:'handles',name:'Oslo 128 mm matt-black pull',price:35,url:'https://leroymerlin.co.za/pull-handle-profile-oslo-128-mm-inspire-plain-matt-black-1-pc-81478650'},
 {id:'screws',name:'4 x 50 mm chipboard screws, 40-pack',price:56,url:'https://leroymerlin.co.za/fixing-and-fastening/fasteners'},
 {id:'anchors',name:'Wall fixing / anchor allowance',price:80,url:'https://leroymerlin.co.za/fixing-and-fastening/fasteners/anchors'}
];
export const options=[
 {id:'open',name:'01 · Open & affordable',description:'One 180 cm organiser on each side, leaving the largest reserve for a vanity, shoe storage, lighting and installation.',lines:[{id:'open180',qty:2}],note:'R3,298 cupboard total. The 400 mm carcass needs roughly a 600 mm clothing envelope, leaving about a 1,060 mm usable aisle.'},
 {id:'buco',name:'02 · BUCO hinged cupboards',description:'Eight complete Insta-Cupboards: two shelf and two hanging cupboards on each wall, all with standard hinged double doors and basic hardware.',lines:[{id:'buco-shelf',qty:4},{id:'buco-hanging',qty:4}],note:'3,600 mm run per side, 580 mm deep, 2,250 mm high and a 1,100 mm aisle. Cupboards touch the entrance wall, leaving the full 290 mm gap at the window end. R3,364 over budget before extras.'},
 {id:'ucan',name:'03 · UCAN sliding-door system',description:'Eight doorless carcasses behind continuous sliding-door fronts: one 600 mm shelf, one 1000 mm shelf and two 1000 mm hanging units per side.',lines:[{id:'ucan-narrow',qty:2},{id:'ucan-shelf',qty:2},{id:'ucan-hanging',qty:4},{id:'track',qty:2},{id:'rollers',qty:8},{id:'melamine',qty:8},{id:'edging',qty:11},{id:'handles',qty:8},{id:'screws',qty:2},{id:'anchors',qty:1}],note:'All front faces align at 500 mm depth; the 400 mm units have 100 mm behind them. Cupboards touch the entrance wall, leaving 290 mm at the window. About 1,260 mm remains between sliding-door faces.'}
] as const;
export const total=(option:typeof options[number])=>option.lines.reduce((sum,line)=>sum+products.find(p=>p.id===line.id)!.price*line.qty,0);
export function makeLayout(project:RoomProject,option:typeof options[number]):Item[]{
 const roomWidth=project.room.width??2260,roomDepth=project.room.depth??3890,items:Item[]=[];
 for(const side of ['left','right'] as const){let z=option.id==='open'?250:0;
  for(const line of option.lines){const product=products.find(p=>p.id===line.id)!;if(!product.width||!product.depth||!product.height)continue;
   for(let i=0;i<line.qty/2;i++){const shelf=product.interior==='shelf',alignedDepth=option.id==='ucan'?500:product.depth;items.push({id:`${option.id}-${side}-${product.id}-${i}`,kind:'cupboard',name:`${side} · ${product.name}`,size:{width:product.width,depth:product.depth,height:product.height},position:{x:side==='left'?alignedDepth-product.depth:roomWidth-alignedDepth,z},rotation:side==='left'?270:90,finish:product.finish??'white',productId:product.id,interior:{shelves:shelf?(product.id==='buco-shelf'?5:4):1,drawers:product.id==='open180'?2:0,railHeight:product.height-300,split:shelf?.7:.18,doors:product.doors??option.id==='ucan'}});z+=product.width;}
  }
 }
 items.push({id:'vanity',kind:'vanity',name:'Make-up table · unpriced proposal',size:{width:1000,depth:400,height:760},position:{x:(roomWidth-1000)/2,z:roomDepth-400},finish:'oak',productId:null},{id:'chair',kind:'chair',name:'Vanity chair · faces window',size:{width:450,depth:450,height:750},position:{x:(roomWidth-450)/2,z:roomDepth-950},finish:'white',productId:null,rotation:180});return items;
}
