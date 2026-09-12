import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { DoubleSide, Shape } from 'three';
import type { Item, RoomProject } from '../data/room';
const finishes = { oak: '#b68b57', white: '#eeeae2', walnut: '#60422e' };
function CameraRig({inside,w,d,h}:{inside:boolean;w:number;d:number;h:number}){
  const {camera}=useThree();const controls=useRef<any>(null);
  useEffect(()=>{camera.position.set(...(inside?[w/2,1.6,0.25]:[w*2.3,h*1.6,-d*0.9]) as [number,number,number]);if(controls.current){controls.current.target.set(w/2,inside?1.4:1.1,d*0.65);controls.current.update();}},[camera,inside,w,d,h]);
  return <OrbitControls ref={controls} maxPolarAngle={Math.PI/2-0.03} minDistance={0.1} maxDistance={25}/>;
}
function Box({size,position,color,metal=false}: {size:[number,number,number];position:[number,number,number];color:string;metal?:boolean}) {
  return <mesh position={position} castShadow receiveShadow><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={metal?0.25:0.7} metalness={metal?0.7:0}/></mesh>;
}
function Furniture({item,onSelect}: {item:Item;onSelect:(id:string)=>void}) {
  const w=item.size.width/1000, h=item.size.height/1000, d=item.size.depth/1000, t=0.018, c=finishes[item.finish];
  return <group position={[item.position.x/1000,0,item.position.z/1000]} onClick={e=>{e.stopPropagation();onSelect(item.id)}}>
    {item.kind==='cupboard' ? <>
      <Box size={[w,h,t]} position={[w/2,h/2,d-t/2]} color={c}/>
      {[t/2,w-t/2].map(x=><Box key={x} size={[t,h,d]} position={[x,h/2,d/2]} color={c}/>)}
      {[t/2,h*0.28,h*0.72,h-t/2].map(y=><Box key={y} size={[w,t,d]} position={[w/2,y,d/2]} color={c}/>)}
      <Box size={[t,h,d]} position={[w/2,h/2,d/2]} color={c}/>
      {[0.11,0.2].map(y=><Box key={y} size={[w/2-0.04,h*0.08,t]} position={[w*0.25,h*y,0.025]} color={c}/>)}
      <Box size={[w/2-0.04,0.025,0.025]} position={[w*0.75,h*0.65,d/2]} color="#bcb6a8" metal/>
    </> : <>
      <Box size={[w,0.045,d]} position={[w/2,item.kind==='chair'?h*0.53:h-0.023,d/2]} color={c}/>
      {[0.04,w-0.04].flatMap(x=>[0.04,d-0.04].map(z=><Box key={`${x}-${z}`} size={[0.035,item.kind==='chair'?h*0.5:h-0.045,0.035]} position={[x,item.kind==='chair'?h*0.25:(h-0.045)/2,z]} color="#393632"/>))}
      {item.kind==='chair' && <Box size={[w,h*0.45,0.05]} position={[w/2,h*0.775,d-0.025]} color={c}/>}
    </>}
  </group>;
}
export default function RoomView({project,inside,onSelect}: {project:RoomProject;inside:boolean;onSelect:(id:string)=>void}) {
  const w=(project.room.width||3600)/1000, d=(project.room.depth||4200)/1000, h=(project.room.height||2700)/1000;
  const front=(project.room.ceiling?.frontHeight??project.room.height??2700)/1000, back=(project.room.ceiling?.backHeight??project.room.height??2700)/1000;
  const side=new Shape();side.moveTo(0,0);side.lineTo(d,0);side.lineTo(d,back);side.lineTo(0,front);side.closePath();
  function endWall(wall:'front'|'back',height:number){
    const opening=project.openings.find(o=>o.wall===wall);
    const z=wall==='front'?-0.04:d+0.04;
    if(!opening || opening.offset===null || opening.width===null || opening.height===null || opening.sillHeight===null)return <Box size={[w,height,0.08]} position={[w/2,height/2,z]} color="#f1f0eb"/>;
    const x=opening.offset/1000,ow=opening.width/1000,oh=opening.height/1000,sill=opening.sillHeight/1000;
    return <group><Box size={[x,height,0.08]} position={[x/2,height/2,z]} color="#f1f0eb"/><Box size={[Math.max(0.001,w-x-ow),height,0.08]} position={[(x+ow+w)/2,height/2,z]} color="#f1f0eb"/>{sill>0&&<Box size={[ow,sill,0.08]} position={[x+ow/2,sill/2,z]} color="#f1f0eb"/>}<Box size={[ow,Math.max(.001,height-sill-oh),0.08]} position={[x+ow/2,(sill+oh+height)/2,z]} color="#f1f0eb"/>{opening.kind==='window'&&<><mesh position={[x+ow/2,sill+oh/2,d]}><planeGeometry args={[ow,oh]}/><meshStandardMaterial color="#b3d6dd" transparent opacity={0.25} side={DoubleSide}/></mesh>{[0,ow/3,ow*2/3,ow].map(v=><Box key={v} size={[0.025,oh,0.04]} position={[x+v,sill+oh/2,d]} color="#fafafa"/>)}{[sill,sill+oh/2,sill+oh].map(v=><Box key={v} size={[ow,0.025,0.04]} position={[x+ow/2,v,d]} color="#fafafa"/>)}</>}</group>;
  }
  return <Canvas key={`${inside}-${w}-${d}`} camera={{position:inside?[w/2,1.6,0.25]:[w*2.3,h*1.6,-d*0.9],fov:inside?75:45,near:0.01,far:100}} shadows dpr={[1,2]} fallback={<p>3D needs a browser with WebGL enabled. Your measurements are still editable.</p>}>
    <color attach="background" args={['#e8edef']}/><ambientLight intensity={1.1}/><directionalLight position={[2,6,-2]} intensity={2.2} castShadow shadow-mapSize={[2048,2048]}/>
    <Suspense fallback={null}>
      <CameraRig inside={inside} w={w} d={d} h={h}/>
      <Box size={[w,0.06,d]} position={[w/2,-0.03,d/2]} color="#cfc7b8"/>
      {endWall('back',back)}
      {inside&&endWall('front',front)}
      <mesh rotation={[0,-Math.PI/2,0]} receiveShadow><shapeGeometry args={[side]}/><meshStandardMaterial color="#e1e4e0" side={DoubleSide}/></mesh>
      {inside&&<mesh position={[w,0,0]} rotation={[0,-Math.PI/2,0]} receiveShadow><shapeGeometry args={[side]}/><meshStandardMaterial color="#f1f0eb" side={DoubleSide}/></mesh>}
      <mesh position={[w/2,(front+back)/2,d/2]} rotation={[-Math.PI/2-Math.atan2(back-front,d),0,0]}><planeGeometry args={[w,Math.hypot(d,back-front)]}/><meshStandardMaterial color="#f0f0e9" side={DoubleSide} transparent opacity={inside?1:0.14} depthWrite={inside}/></mesh>
      {project.items.map(item=><Furniture key={item.id} item={item} onSelect={onSelect}/>)}
      <Grid position={[w/2,-0.065,d/2]} args={[20,20]} cellSize={0.5} sectionSize={1} cellColor="#bdc9cc" sectionColor="#a6b7bd" fadeDistance={20}/>
    </Suspense>
  </Canvas>;
}
