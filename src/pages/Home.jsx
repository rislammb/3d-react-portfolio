import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader';
import Bird from '../models/Bird';
import Island from '../models/Island';
import Plane from '../models/Plane';
import Sky from '../models/Sky';

import { soundoff, soundon } from '../assets/icons';

import sakura from '../assets/sakura.mp3';

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const adjustIslandForScreenSize = () => {
    const position = [0, -6.5, -43];
    let scale = null;
    const rotation = [0.1, 4.7, 0];

    if (window.innerWidth < 786) {
      scale = [0.9, 0.9, 0.9];
    } else {
      scale = [1, 1, 1];
    }

    return [position, scale, rotation];
  };

  const adjustPlaneForScreenSize = () => {
    let position, scale;
    const rotation = [0, 20, 0];

    if (window.innerWidth < 786) {
      position = [0, -1.7, 0];
      scale = [1.5, 1.5, 1.5];
    } else {
      position = [0, -4, -4];
      scale = [3, 3, 3];
    }

    return [position, scale, rotation];
  };

  const [islandPosition, islandScale, islandRotation] =
    adjustIslandForScreenSize();
  const [planePosition, planeScale, planeRotation] = adjustPlaneForScreenSize();

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    }

    return () => {
      audioRef.current.pause();
    };
  }, [isPlayingMusic]);

  return (
    <section className='h-screen w-full relative'>
      <div className='absolute top-24 left-0 right-0 z-10 flex items-center justify-center'>
        {currentStage && (
          <h3 className='bg-green-200 py-3 px-8 shadow-lg rounded-3xl text-2xl text-center'>
            {currentStage}
          </h3>
        )}
      </div>

      <Canvas
        className={`h-screen w-full bg-transparent ${
          isRotating ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        camera={{ near: 0.1, far: 1000 }}
      >
        <Suspense fallback={<Loader />}>
          <directionalLight position={[1, 1, 1]} intensity={2} />
          <ambientLight intensity={0.5} />
          <hemisphereLight
            skyColor={'#b1e1ff'}
            groundColor={'#000000'}
            intensity={1}
          />

          <Sky isRotating={isRotating} />
          <Bird />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
          />
          <Plane
            position={planePosition}
            scale={planeScale}
            rotation={planeRotation}
            isRotating={isRotating}
          />
        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img
          src={isPlayingMusic ? soundon : soundoff}
          alt='music'
          className='cursor-pointer w-10 h-10 object-contain'
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        />
      </div>
    </section>
  );
};

export default Home;
