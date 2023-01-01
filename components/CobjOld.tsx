import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { folder, useControls, button } from "leva";
import celestialSettings from "../settings/celestial-settings"
import miscSettings from "../settings/misc-settings";
import { useStore } from "../store";
import { Vector3 } from "three";

import { Orbit } from "./Orbit";
import { Planet } from "./Planet";
import { Earth } from "./Earth";

export function Cobj({ name, children }: {name: string, children: any}) {
  //REMINDER to self: DONT FORGET PLANET TILT OF EARTH tilt and tiltb
  // Cobj = Celestial Object
  //console.log(name + " rendered");
  //Destructuring with a dynamic key

  //Get the settings for this object and merge
  const { [name]: cSettings } = celestialSettings;
  const { [name]: aSettings } = miscSettings;
  const s = { ...cSettings, ...aSettings };

  const containerRef = useRef();
  const pivotRef = useRef();
  const orbitRef = useRef();

  //const _vector = new Vector3();
  function printPositions() {
    const worldPosVec = new Vector3();
    const worldDirVec = new Vector3();

    containerRef.current.getWorldPosition(worldPosVec);
    containerRef.current.getWorldDirection(worldDirVec);
    console.log(`${name} group
    World position
    x : ${worldPosVec.x}
    y : ${worldPosVec.y}
    z : ${worldPosVec.z}
    World direction
    x : ${worldDirVec.x}
    y : ${worldDirVec.y}
    z : ${worldDirVec.z}
    `);
    pivotRef.current.getWorldPosition(worldPosVec);
    pivotRef.current.getWorldDirection(worldDirVec);
    console.log(`${name} Sphere
    World position
    x : ${worldPosVec.x}
    y : ${worldPosVec.y}
    z : ${worldPosVec.z}
    World direction
    x : ${worldDirVec.x}
    y : ${worldDirVec.y}
    z : ${worldDirVec.z}
    `);
  }

  //  useControls(s.orbitRadius)
  const {
    startPos,
    speed,
    orbitRadius,
    orbitCentera,
    orbitCenterb,
    orbitCenterc,
    orbitTilta,
    orbitTiltb
  } = useControls(
    "Celestial settings",
    {
      [name]: folder({
        startPos: {
          value: s.startPos
        },
        speed: {
          value: s.speed
        },
        orbitRadius: {
          value: s.orbitRadius,
          min: 0
        },
        orbitCentera: {
          value: s.orbitCentera
        },
        orbitCenterb: {
          value: s.orbitCenterb
        },
        orbitCenterc: {
          value: s.orbitCenterc
        },
        orbitTilta: {
          value: s.orbitTilta
        },
        orbitTiltb: {
          value: s.orbitTiltb
        },
        printPosToConsole: button(() => {
          printPositions();
        })
      })
    },
    { collapsed: true }
  );

  const containerPos = s.containerPos ? s.containerPos : 0;
  // let pos = 0;
  //  const pos = useStore((state) => state.pos);
  const posRef = useStore((state) => state.posRef);
  useFrame(() => {
    // const pos = posx.current;
    //pos += 0.01;
    // console.log(MathUtils.lerp(orbitRef.current.rotation.y, posRef.current - startPos * (Math.PI / 180, 0.5))
    // console.log(orbitRef.current.rotation.y)

    orbitRef.current.rotation.y =
      speed * posRef.current - startPos * (Math.PI / 180);
  });

  return (
    <group
      name="Container"
      ref={containerRef}
      position={[orbitCentera, orbitCenterc, orbitCenterb]}
      rotation={[
        orbitTilta * (Math.PI / 180),
        -containerPos * (Math.PI / 180),
        orbitTiltb * (Math.PI / 180)
      ]}
    >
      {orbitRadius && (
        <group rotation-x={-Math.PI / 2} visible={s.visible}>
          <Orbit
            radius={orbitRadius}
            color={s.color}
            lineWidth={0.5}
            arrows={s.arrows}
            reverse={s.reverseArrows}
            rotation={s.rotationArrows ? s.rotationArrows : 0}
          />
        </group>
      )}
      <group name="Orbit" ref={orbitRef}>
        <group name="Pivot" ref={pivotRef} position={[orbitRadius, 0, 0]}>
          {/* <Sphere args={[1, 30, 30]} visible={s.visible}>
            <meshBasicMaterial
              attach="material"
              color={s.color}
              opacity={0.9}
              transparent
            /> */}
          {s.axesHelper && <axesHelper args={[10, 10, 10]} />}
          {s.earth && <Earth {...s} />}
          {s.type === "planet" && <Planet {...s} />}
          {/* </Sphere> */}
          {children}
        </group>
      </group>
    </group>
  );
}
