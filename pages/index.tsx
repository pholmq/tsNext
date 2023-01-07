import type { NextPage } from "next";
import { Canvas, useFrame } from "@react-three/fiber"
import { Stats, OrbitControls, Stars } from "@react-three/drei";


import SolarSystem from "../components/SolarSystem"
import AnimationController from "../components/AnimationController"
import Controls from "../components/Controls"
import { Leva } from "leva";

const Home: NextPage = () => {


  return (
    <>
    <div className="container">
      <Canvas
          camera={{
            fov: 15,
            position: [0, 3000, 0],
            near: 0.1,
            far: 10000000
          }}
      >
          <Stats/>
          <OrbitControls makeDefault enableDamping={false} maxDistance={500000} />
          <axesHelper args={[10]} position={[0, 0, 0]} />
          <ambientLight intensity={0.5} />
          <Stars radius={100000} />
          <AnimationController/>
          <SolarSystem />
      </Canvas>
      <Controls />
    </div>
    </>
)
}
export default Home