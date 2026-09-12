import test from 'node:test';
import assert from 'node:assert/strict';
import { blankProject, demoProject, measuredProject, layoutWarnings } from '../src/data/room.ts';
test('unmeasured project never inherits demo dimensions',()=>{
  assert.equal(blankProject.room.width,null);
  assert.equal(blankProject.items.length,0);
  assert.match(layoutWarnings(blankProject)[0],/Enter all three/);
});
test('sample pieces fit without intersection',()=>assert.deepEqual(layoutWarnings(demoProject),[]));
test('room boundary and overlap violations are reported',()=>{
  const p=structuredClone(demoProject);
  p.items[0].position.x=-10;
  p.items[1].position={...p.items[0].position};
  const result=layoutWarnings(p);
  assert.ok(result.some(s=>s.includes('outside')));
  assert.ok(result.some(s=>s.includes('overlaps')));
});
test('edge contact is permitted',()=>{
  const p=structuredClone(demoProject);
  p.items=p.items.slice(0,2);
  assert.deepEqual(layoutWarnings(p),[]);
});
test('high furniture at the low end hits the slope even below max room height',()=>{
  const p=structuredClone(measuredProject);
  p.items=[{...structuredClone(demoProject.items[0]),position:{x:0,z:3290},size:{width:900,depth:600,height:3000}}];
  assert.ok(layoutWarnings(p).some(s=>s.includes('sloping ceiling')));
  p.items[0].size.height=2800;
  assert.deepEqual(layoutWarnings(p),[]);
});
