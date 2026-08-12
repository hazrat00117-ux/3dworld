import * as THREE from 'three';
import { Destination } from '../../config/destinationsData';

/**
 * Creates a unique procedural 3D landmark mesh for a destination
 */
export function createLandmarkMesh(destination: Destination): THREE.Group {
  const group = new THREE.Group();
  group.name = `landmark-${destination.id}`;

  const primaryColor = new THREE.Color(destination.accentColor || '#4ade80');
  const glowMaterial = new THREE.MeshBasicMaterial({
    color: primaryColor,
    wireframe: true,
    transparent: true,
    opacity: 0.8
  });

  const solidMaterial = new THREE.MeshStandardMaterial({
    color: primaryColor,
    roughness: 0.3,
    metalness: 0.7,
    emissive: primaryColor,
    emissiveIntensity: 0.2
  });

  // Base Pedestal
  const baseGeo = new THREE.CylinderGeometry(0.12, 0.16, 0.05, 12);
  const baseMesh = new THREE.Mesh(baseGeo, solidMaterial);
  group.add(baseMesh);

  // Custom Structure Geometry based on Category / Name
  let structure: THREE.Object3D;

  if (destination.id === 'eiffel-tower') {
    // Eiffel Tower 4-legged pyramid structure
    const towerGroup = new THREE.Group();
    const topGeo = new THREE.ConeGeometry(0.08, 0.4, 4);
    const topMesh = new THREE.Mesh(topGeo, glowMaterial);
    topMesh.position.y = 0.25;
    towerGroup.add(topMesh);

    const spireGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.2, 8);
    const spireMesh = new THREE.Mesh(spireGeo, solidMaterial);
    spireMesh.position.y = 0.45;
    towerGroup.add(spireMesh);

    structure = towerGroup;
  } else if (destination.id === 'giza-pyramids') {
    // Pyramids
    const pyramidGeo = new THREE.ConeGeometry(0.2, 0.25, 4);
    structure = new THREE.Mesh(pyramidGeo, solidMaterial);
    structure.position.y = 0.15;
  } else if (destination.id === 'taj-mahal' || destination.id === 'colosseum') {
    // Dome / Citadel Structure
    const domeGroup = new THREE.Group();
    const bodyGeo = new THREE.BoxGeometry(0.2, 0.15, 0.2);
    const bodyMesh = new THREE.Mesh(bodyGeo, solidMaterial);
    bodyMesh.position.y = 0.1;
    domeGroup.add(bodyMesh);

    const domeGeo = new THREE.SphereGeometry(0.09, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMesh = new THREE.Mesh(domeGeo, glowMaterial);
    domeMesh.position.y = 0.18;
    domeGroup.add(domeMesh);

    structure = domeGroup;
  } else if (destination.id === 'secret-birthday-isle') {
    // Glowing Birthday Gift & Star
    const starGroup = new THREE.Group();
    const boxGeo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
    const boxMesh = new THREE.Mesh(boxGeo, new THREE.MeshStandardMaterial({
      color: 0xfbcb43,
      emissive: 0xfbcb43,
      emissiveIntensity: 0.6
    }));
    boxMesh.position.y = 0.15;
    starGroup.add(boxMesh);

    // Floating Star Crown
    const starGeo = new THREE.OctahedronGeometry(0.12, 0);
    const starMesh = new THREE.Mesh(starGeo, new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true
    }));
    starMesh.position.y = 0.38;
    starGroup.add(starMesh);

    structure = starGroup;
  } else {
    // Generic Architectural Pin / Beacon Tower
    const beaconGroup = new THREE.Group();
    const cylinderGeo = new THREE.CylinderGeometry(0.03, 0.06, 0.3, 8);
    const cylinderMesh = new THREE.Mesh(cylinderGeo, solidMaterial);
    cylinderMesh.position.y = 0.18;
    beaconGroup.add(cylinderMesh);

    const orbGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const orbMesh = new THREE.Mesh(orbGeo, glowMaterial);
    orbMesh.position.y = 0.35;
    beaconGroup.add(orbMesh);

    structure = beaconGroup;
  }

  group.add(structure);

  // Add subtle pulsing light ring
  const ringGeo = new THREE.RingGeometry(0.18, 0.22, 16);
  const ringMat = new THREE.MeshBasicMaterial({
    color: primaryColor,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.6
  });
  const ringMesh = new THREE.Mesh(ringGeo, ringMat);
  ringMesh.rotation.x = Math.PI / 2;
  ringMesh.position.y = 0.01;
  group.add(ringMesh);

  return group;
}

/**
 * Creates 3D collectible items floating near a landmark in destination close-up mode
 */
export function createCollectibleMesh(item: { id: string; name: string; type: string }): THREE.Group {
  const group = new THREE.Group();
  group.name = `collectible-${item.id}`;

  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xfbcb43,
    metalness: 0.9,
    roughness: 0.1,
    emissive: 0xfbcb43,
    emissiveIntensity: 0.4
  });

  const starGeo = new THREE.OctahedronGeometry(0.15, 0);
  const mesh = new THREE.Mesh(starGeo, goldMaterial);
  group.add(mesh);

  // Outer ring glow
  const ringGeo = new THREE.TorusGeometry(0.22, 0.015, 8, 24);
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x4ade80,
    wireframe: true
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  group.add(ring);

  return group;
}
