import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useStore } from "../store";
import { Line } from "@react-three/drei";

type ArrowProps = {
  rotation: number;
  radius: number;
  color: string;
  reverse?: boolean;
};

function Arrow({ rotation, radius, color, reverse = false }: ArrowProps ) {
  let arrowDirection = 0;
  if (reverse) {
    arrowDirection = Math.PI;
  }
  return (
    <group rotation={[0, 0, rotation]}>
      <mesh position={[radius, 0, 0]} rotation={[0, 0, arrowDirection]}>
        <coneGeometry args={[3, 8]} />
        <meshBasicMaterial color={color} opacity={0.5} transparent />
      </mesh>
    </group>
  );
}

type OrbitProps = {
radius: number;
color: string;
lineWidth: number;
arrows: boolean;
reverse: boolean;
rotation: number;
};


export function Orbit({
  radius,
  color,
  lineWidth = 1,
  arrows = false,
  reverse = false,
  rotation = 0
}: OrbitProps) {
  const orbitRef: any = useRef();
  const posRef: any = useStore((state) => state.posRef);

  useFrame(() => {
    if (showOrbits) {
      // const pos = useStore.getState().pos;
      orbitRef.current.rotation.z = rotation * posRef.current;
    }
  });

  let points: any[] = [];
  let arrowPoints = [];
  let arrowStepSize = 45;

  // // 360 full circle will be drawn clockwise
  for (let i = 0; i <= 360; i++) {
    points.push([
      Math.sin(i * (Math.PI / 180)) * radius,
      Math.cos(i * (Math.PI / 180)) * radius,
      0
    ]);
    if (i === arrowStepSize) {
      arrowPoints.push([
        Math.sin(i * (Math.PI / 180)) * radius,
        Math.cos(i * (Math.PI / 180)) * radius,
        0
      ]);
      arrowStepSize += arrowStepSize;
    }
  }
  const showArrows = useStore((s) => s.arrows);
  const showOrbits = useStore((s) => s.orbits);
  // console.log(showOrbits);

  return (
    <>
      {/* {showOrbits && ( */}
      <group ref={orbitRef} visible={showOrbits}>
        <group visible={arrows && showArrows}>
          <Arrow
            rotation={Math.PI / 4}
            radius={radius}
            color={color}
            reverse={reverse}
          />
          <Arrow
            rotation={(Math.PI / 4) * 3}
            radius={radius}
            color={color}
            reverse={reverse}
          />
          <Arrow
            rotation={(Math.PI / 4) * 5}
            radius={radius}
            color={color}
            reverse={reverse}
          />
          <Arrow
            rotation={(Math.PI / 4) * 7}
            radius={radius}
            color={color}
            reverse={reverse}
          />
        </group>

        <Line
          points={points} // Array of points
          color={color} // Default
          lineWidth={lineWidth} // In pixels (default)
          dashed={false}
          transparent
          opacity={0.5}
        />
      </group>
      {/* )} */}
    </>
  );
}
