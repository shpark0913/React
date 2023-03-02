### 회전하는 정육면체 만들기



```jsx
npm install three
npm install @react-three/fiber
npm install @react-three/drei
```

```jsx
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function App() {
  return (
    <>
      <Canvas>

        {/* 마우스 휠로 회전, 확대/축소 가능, autoRotate={true} 하면 자동회전 */}
        <OrbitControls />

        {/* 3D 도형을 감쌀 mesh 태그 */}
        <mesh>  
          {/* 1:1:1 비율의 정육면체 */}
          <boxGeometry args={[1, 1, 1]} />
          {/* 색상 추가 */}
          <meshStandardMaterial attach="material" color={0xa3b18a} />
          {/* 조명 추가. default는 1. directionalLight는 방향이 있음 */}
          <ambientLight intensity={1} />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;
```
