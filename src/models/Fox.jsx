import { useAnimations, useGLTF } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import foxScene from '../assets/3d/fox.glb';

const Fox = ({ animationType, ...props }) => {
  const foxRef = useRef();
  const { scene, animations } = useGLTF(foxScene);
  const { actions } = useAnimations(animations, foxRef);

  useEffect(() => {
    Object.values(actions).forEach((action) => action.stop());

    actions[animationType].play();
  }, [animationType]);

  return (
    <mesh {...props} ref={foxRef}>
      <primitive object={scene} />
    </mesh>
  );
};

export default Fox;
