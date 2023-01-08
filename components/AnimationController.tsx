
import { useStore } from "../store";
import { useFrame } from "@react-three/fiber"

const AnimationController = () => {

const posRef:any = useStore((s) => s.posRef);
const run = useStore((s) => s.run);
const speedFact = useStore((state) => state.speedFact);

useFrame((state, delta) => {
  if (run) {
    // posRef.current = posRef.current + delta * 0.1;
    posRef.current = posRef.current + delta * speedFact;
  }
})
return null
};

export default AnimationController
