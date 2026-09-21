import test from 'node:test';
import assert from 'node:assert/strict';
import {options,total,makeLayout} from '../src/data/options.ts';
import {measuredProject,footprint,layoutWarnings} from '../src/data/room.ts';
test('three product totals match the design reports',()=>{
 assert.deepEqual(options.map(total),[3298,23364,26951]);
});
test('all proposed layouts fit the measured shell including rotation',()=>{
 for(const option of options){const p=structuredClone(measuredProject);p.items=makeLayout(p,option);assert.deepEqual(layoutWarnings(p),[]);assert.equal(footprint(p.items[0]).width,p.items[0].size.depth);}
});
test('BUCO and UCAN runs touch the entrance wall and leave 290 mm at the window',()=>{
 for(const option of options.slice(1)){const items=makeLayout(measuredProject,option).filter(i=>i.kind==='cupboard');assert.equal(Math.min(...items.map(i=>i.position.z)),0);assert.equal(Math.max(...items.map(i=>i.position.z+footprint(i).depth)),3600);}
});
test('both UCAN front planes align despite the narrow cupboards',()=>{
 const items=makeLayout(measuredProject,options[2]).filter(i=>i.kind==='cupboard');
 const left=items.filter(i=>i.id.includes('-left-')),right=items.filter(i=>i.id.includes('-right-'));
 assert.deepEqual([...new Set(left.map(i=>i.position.x+footprint(i).width))],[500]);
 assert.deepEqual([...new Set(right.map(i=>i.position.x))],[1760]);
});
test('every proposed chair faces the window',()=>{
 for(const option of options)assert.equal(makeLayout(measuredProject,option).find(i=>i.kind==='chair').rotation,180);
});
test('rotated item over the back wall is detected',()=>{
 const p=structuredClone(measuredProject);p.items=makeLayout(p,options[0]);p.items[0].position.z=3000;assert.ok(layoutWarnings(p).some(w=>w.includes('outside')));
});
test('shrinking the room does not silently shrink purchased products',()=>{
 const p=structuredClone(measuredProject);p.items=makeLayout(p,options[2]);p.room.width=1200;assert.ok(layoutWarnings(p).some(w=>w.includes('outside')));assert.equal(p.items[0].size.width,600);
});
