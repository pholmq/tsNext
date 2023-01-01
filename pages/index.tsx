// import Head from 'next/head'
// import Image from 'next/image'
// import { Inter } from '@next/font/google'
// import styles from '../styles/Home.module.css'

import type { NextPage } from "next";
import { Canvas } from "@react-three/fiber"

const Home: NextPage = () => {
  return (
    <div className="container">
      <Canvas>
        <ambientLight intensity={0.1} />
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>

      </Canvas>
    </div>
  )
}
export default Home