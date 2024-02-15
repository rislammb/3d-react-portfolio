import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import Loader from '../components/Loader';
import Bird from '../models/Bird';
import Island from '../models/Island';
import Plane from '../models/Plane';
import Sky from '../models/Sky';

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);

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
    </section>
  );
};

export default Home;
