"use client";

import { useEffect, useRef } from "react";

export default function ThreeHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let rafId = 0;
    let THREE: typeof import("three") | null = null;

    const init = async () => {
      const threeModule = await import("three");
      THREE = threeModule;
      const canvas = canvasRef.current;
      if (!canvas || !THREE) return;

      // Scene
      const scene    = new THREE.Scene();
      const camera   = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 2.8;

      const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(420, 420);
      renderer.setClearColor(0x000000, 0);

      // Helper: read a CSS brand-* variable as a Three.js color number
      const getBrand = (shade: number): number => {
        const rgb = getComputedStyle(document.documentElement)
          .getPropertyValue(`--brand-${shade}`).trim();
        if (!rgb) return 0x3b82f6;
        const [r, g, b] = rgb.split(" ").map(Number);
        return (r << 16) | (g << 8) | b;
      };

      // Icosahedron geometry
      const geo    = new THREE.IcosahedronGeometry(1.05, 0);
      const edges  = new THREE.EdgesGeometry(geo);

      // Wireframe lines
      const lineMat = new THREE.LineBasicMaterial({
        color: getBrand(500),
        transparent: true,
        opacity: 0.7,
      });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      scene.add(wireframe);

      // Glowing faces (subtle fill)
      const meshMat = new THREE.MeshBasicMaterial({
        color: getBrand(500),
        transparent: true,
        opacity: 0.04,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, meshMat);
      scene.add(mesh);

      // Inner smaller icosahedron
      const innerGeo   = new THREE.IcosahedronGeometry(0.65, 0);
      const innerEdges = new THREE.EdgesGeometry(innerGeo);
      const innerMat   = new THREE.LineBasicMaterial({
        color: getBrand(400),
        transparent: true,
        opacity: 0.35,
      });
      const innerWire = new THREE.LineSegments(innerEdges, innerMat);
      scene.add(innerWire);

      // Ambient point lights (subtle glow effect)
      const light1 = new THREE.PointLight(getBrand(500), 2, 10);
      light1.position.set(3, 3, 3);
      scene.add(light1);

      // Update colors when theme changes
      const observer = new MutationObserver(() => {
        lineMat.color.set(getBrand(500));
        meshMat.color.set(getBrand(500));
        innerMat.color.set(getBrand(400));
      });
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });

      let time = 0;
      const animate = () => {
        time += 0.008;
        wireframe.rotation.y = time * 0.6;
        wireframe.rotation.x = time * 0.25;
        mesh.rotation.y      = time * 0.6;
        mesh.rotation.x      = time * 0.25;
        innerWire.rotation.y = -time * 0.4;
        innerWire.rotation.x = time * 0.35;

        // Subtle breathing scale
        const scale = 1 + Math.sin(time * 1.2) * 0.015;
        wireframe.scale.setScalar(scale);
        mesh.scale.setScalar(scale);

        renderer.render(scene, camera);
        rafId = requestAnimationFrame(animate);
      };
      animate();

      return () => {
        observer.disconnect();
        cancelAnimationFrame(rafId);
        renderer.dispose();
      };
    };

    const cleanup = init();

    return () => {
      cancelAnimationFrame(rafId);
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label="Rotating 3D geometric icosahedron"
      className="w-full h-full"
      // TODO: Replace with <Image src="/photo.jpg" alt="Dranreb Jay Arzadon" /> when photo is ready
    />
  );
}
