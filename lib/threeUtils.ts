import * as THREE from "three";

/** Random points scattered across the 6 faces of a centered box — used to seed a FragmentField's target silhouette. */
export function sampleBoxSurfacePoints(width: number, height: number, depth: number, count: number) {
  const hw = width / 2;
  const hh = height / 2;
  const hd = depth / 2;
  const points: THREE.Vector3[] = [];

  for (let i = 0; i < count; i++) {
    const face = Math.floor(Math.random() * 6);
    const u = (Math.random() * 2 - 1);
    const v = (Math.random() * 2 - 1);

    switch (face) {
      case 0:
        points.push(new THREE.Vector3(hw, u * hh, v * hd));
        break;
      case 1:
        points.push(new THREE.Vector3(-hw, u * hh, v * hd));
        break;
      case 2:
        points.push(new THREE.Vector3(u * hw, hh, v * hd));
        break;
      case 3:
        points.push(new THREE.Vector3(u * hw, -hh, v * hd));
        break;
      case 4:
        points.push(new THREE.Vector3(u * hw, v * hh, hd));
        break;
      default:
        points.push(new THREE.Vector3(u * hw, v * hh, -hd));
        break;
    }
  }

  return points;
}
