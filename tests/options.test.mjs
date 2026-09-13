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
test('rotated item over the back wall is detected',()=>{
 const p=structuredClone(measuredProject);p.items=makeLayout(p,options[0]);p.items[0].position.z=3000;assert.ok(layoutWarnings(p).some(w=>w.includes('outside')));
});
test('shrinking the room does not silently shrink purchased products',()=>{
 const p=structuredClone(measuredProject);p.items=makeLayout(p,options[2]);p.room.width=1200;assert.ok(layoutWarnings(p).some(w=>w.includes('outside')));assert.equal(p.items[0].size.width,600);
});
