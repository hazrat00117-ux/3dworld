import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useGameStore } from '../../store/gameStore';
import { DESTINATIONS_DATA, latLngToVector3, Destination } from '../../config/destinationsData';
import { createLandmarkMesh, createCollectibleMesh } from './Landmark3D';
import { soundService } from '../../services/soundService';

export const SpaceCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    gameState,
    selectedDestination,
    visitedDestinationIds,
    collectedItemIds,
    activeContinentFilter,
    unlockedSecret,
    selectDestination,
    collectItem,
    registerMoonClick
  } = useGameStore();

  // Store 3D references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const globeGroupRef = useRef<THREE.Group | null>(null);
  const landmarksGroupRef = useRef<THREE.Group | null>(null);
  const collectiblesGroupRef = useRef<THREE.Group | null>(null);
  const moonMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // Interaction State
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  const cameraTargetPosRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 0, 12));

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.clientWidth || window.innerWidth;
    const height = containerRef.current.clientHeight || window.innerHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050508, 0.012);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 12);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 2.0);
    sunLight.position.set(15, 10, 15);
    scene.add(sunLight);

    const blueFillLight = new THREE.DirectionalLight(0x38bdf8, 0.8);
    blueFillLight.position.set(-15, -10, -10);
    scene.add(blueFillLight);

    // 5. Background Nebula & Stars Field
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starPos[i] = (Math.random() - 0.5) * 200;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.2,
      transparent: true,
      opacity: 0.8
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // 6. Globe Group (Earth + Atmosphere + Landmarks)
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);
    globeGroupRef.current = globeGroup;

    // Earth Ocean Sphere
    const earthRadius = 4.0;
    const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
    const earthMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      roughness: 0.4,
      metalness: 0.2,
      emissive: 0x0f2b66,
      emissiveIntensity: 0.2
    });
    const earthMesh = new THREE.Mesh(earthGeo, earthMat);
    globeGroup.add(earthMesh);

    // Earth Latitude/Longitude Grid Ring Overlay
    const gridGeo = new THREE.WireframeGeometry(new THREE.SphereGeometry(earthRadius + 0.02, 24, 24));
    const gridMat = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.12
    });
    const gridMesh = new THREE.LineSegments(gridGeo, gridMat);
    globeGroup.add(gridMesh);

    // Atmosphere Glow Ring
    const atmosGeo = new THREE.SphereGeometry(earthRadius + 0.35, 32, 32);
    const atmosMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.BackSide,
      transparent: true,
      opacity: 0.15
    });
    const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
    globeGroup.add(atmosMesh);

    // 7. Moon Orbit Mesh
    const moonGeo = new THREE.SphereGeometry(0.4, 16, 16);
    const moonMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.8
    });
    const moonMesh = new THREE.Mesh(moonGeo, moonMat);
    moonMesh.position.set(8, 2, -4);
    moonMesh.name = 'moon';
    scene.add(moonMesh);
    moonMeshRef.current = moonMesh;

    // 8. Landmarks Group
    const landmarksGroup = new THREE.Group();
    globeGroup.add(landmarksGroup);
    landmarksGroupRef.current = landmarksGroup;

    // 9. Collectibles Close-Up Group
    const collectiblesGroup = new THREE.Group();
    scene.add(collectiblesGroup);
    collectiblesGroupRef.current = collectiblesGroup;

    // Populate Landmarks
    updateLandmarkPins();

    // Mouse Controls
    const dom = containerRef.current;

    const handlePointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current || !globeGroupRef.current) return;

      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      globeGroupRef.current.rotation.y += deltaX * 0.005;
      globeGroupRef.current.rotation.x += deltaY * 0.005;

      // Limit pitch to prevent flipped camera
      globeGroupRef.current.rotation.x = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, globeGroupRef.current.rotation.x)
      );

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e: WheelEvent) => {
      if (!cameraRef.current) return;
      const zoomSpeed = 0.005;
      cameraRef.current.position.z = Math.max(
        5.5,
        Math.min(20, cameraRef.current.position.z + e.deltaY * zoomSpeed)
      );
    };

    // Raycaster Click Handler
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current || !cameraRef.current || !sceneRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, cameraRef.current);

      // Check click on Moon
      if (moonMeshRef.current) {
        const moonIntersect = raycaster.intersectObject(moonMeshRef.current);
        if (moonIntersect.length > 0) {
          soundService.playChime();
          registerMoonClick();
          return;
        }
      }

      // Check click on Collectibles (if in destination mode)
      if (collectiblesGroupRef.current && collectiblesGroupRef.current.children.length > 0) {
        const itemIntersects = raycaster.intersectObjects(collectiblesGroupRef.current.children, true);
        if (itemIntersects.length > 0) {
          let obj: THREE.Object3D | null = itemIntersects[0].object;
          while (obj && !obj.name.startsWith('collectible-')) {
            obj = obj.parent;
          }
          if (obj) {
            const itemId = obj.name.replace('collectible-', '');
            soundService.playCollect();
            collectItem(itemId);
            return;
          }
        }
      }

      // Check click on Landmarks
      if (landmarksGroupRef.current) {
        const intersects = raycaster.intersectObjects(landmarksGroupRef.current.children, true);
        if (intersects.length > 0) {
          let obj: THREE.Object3D | null = intersects[0].object;
          while (obj && !obj.name.startsWith('landmark-')) {
            obj = obj.parent;
          }

          if (obj) {
            const destId = obj.name.replace('landmark-', '');
            const foundDest = DESTINATIONS_DATA.find((d) => d.id === destId);
            if (foundDest) {
              soundService.playClick();
              selectDestination(foundDest);
            }
          }
        }
      }
    };

    dom.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    dom.addEventListener('wheel', handleWheel, { passive: true });
    dom.addEventListener('click', handleClick);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Idle Rotation of Globe when not dragging and in WORLD mode
      if (globeGroupRef.current && !isDraggingRef.current && gameState === 'WORLD') {
        globeGroupRef.current.rotation.y += 0.001;
      }

      // Rotate Moon in Orbit
      if (moonMeshRef.current) {
        const moonAngle = elapsedTime * 0.15;
        moonMeshRef.current.position.x = Math.cos(moonAngle) * 9.5;
        moonMeshRef.current.position.z = Math.sin(moonAngle) * 9.5;
        moonMeshRef.current.rotation.y += 0.005;
      }

      // Pulse landmark ring glow
      if (landmarksGroupRef.current) {
        landmarksGroupRef.current.children.forEach((child) => {
          child.rotation.y = elapsedTime * 0.5;
        });
      }

      // Float collectibles in destination close-up
      if (collectiblesGroupRef.current) {
        collectiblesGroupRef.current.children.forEach((child, index) => {
          child.rotation.y = elapsedTime * 1.5;
          child.position.y += Math.sin(elapsedTime * 2 + index) * 0.002;
        });
      }

      // Smooth camera position interpolation
      if (cameraRef.current) {
        cameraRef.current.position.lerp(cameraTargetPosRef.current, 0.05);
      }

      renderer.render(scene, camera);
    };

    animate();

    // Resize Observer
    const resizeObserver = new ResizeObserver(() => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const newW = containerRef.current.clientWidth;
      const newH = containerRef.current.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    });

    resizeObserver.observe(dom);

    return () => {
      resizeObserver.disconnect();
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
      dom.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      dom.removeEventListener('wheel', handleWheel);
      dom.removeEventListener('click', handleClick);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.remove();
      }
    };
  }, []);

  // Update Landmarks Pins when filter or secret state changes
  const updateLandmarkPins = () => {
    if (!landmarksGroupRef.current) return;

    // Clear old children
    while (landmarksGroupRef.current.children.length > 0) {
      const child = landmarksGroupRef.current.children[0];
      landmarksGroupRef.current.remove(child);
    }

    const earthRadius = 4.0;

    DESTINATIONS_DATA.forEach((dest) => {
      if (dest.id === 'secret-birthday-isle' && !unlockedSecret) return;

      if (
        activeContinentFilter !== 'All' &&
        dest.continent !== activeContinentFilter &&
        dest.id !== 'secret-birthday-isle'
      ) {
        return;
      }

      const landmarkMesh = createLandmarkMesh(dest);
      const pos = latLngToVector3(dest.lat, dest.lng, earthRadius + 0.02);
      landmarkMesh.position.copy(pos);

      // Orient mesh outward perpendicular to earth surface
      landmarkMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());

      landmarksGroupRef.current?.add(landmarkMesh);
    });
  };

  useEffect(() => {
    updateLandmarkPins();
  }, [activeContinentFilter, unlockedSecret, visitedDestinationIds]);

  // Handle Game State / Camera Transition
  useEffect(() => {
    if (gameState === 'DESTINATION' && selectedDestination) {
      // Zoom camera close to landmark
      const pos = latLngToVector3(selectedDestination.lat, selectedDestination.lng, 6.5);
      cameraTargetPosRef.current.copy(pos);

      // Spawn 3D collectibles for this landmark
      if (collectiblesGroupRef.current) {
        while (collectiblesGroupRef.current.children.length > 0) {
          collectiblesGroupRef.current.remove(collectiblesGroupRef.current.children[0]);
        }

        selectedDestination.collectibles.forEach((item, index) => {
          if (!collectedItemIds.includes(item.id)) {
            const itemMesh = createCollectibleMesh(item);
            const offset = new THREE.Vector3(
              (index - 0.5) * 0.8,
              0.2,
              (Math.random() - 0.5) * 0.5
            );
            itemMesh.position.copy(pos).add(offset);
            collectiblesGroupRef.current?.add(itemMesh);
          }
        });
      }
    } else {
      // Reset camera to orbit distance
      cameraTargetPosRef.current.set(0, 0, 12);

      if (collectiblesGroupRef.current) {
        while (collectiblesGroupRef.current.children.length > 0) {
          collectiblesGroupRef.current.remove(collectiblesGroupRef.current.children[0]);
        }
      }
    }
  }, [gameState, selectedDestination, collectedItemIds]);

  return <div ref={containerRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />;
};
