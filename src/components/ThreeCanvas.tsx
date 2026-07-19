"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Dimensions
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 75;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle settings
    const particleCount = 75;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities: number[] = [];

    // Distribute particles in 3D grid cube
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 110;     // x
      positions[i * 3 + 1] = (Math.random() - 0.5) * 75;  // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 55;  // z

      // Slow drift velocity
      velocities.push(
        (Math.random() - 0.5) * 0.04, // dx
        (Math.random() - 0.5) * 0.04, // dy
        (Math.random() - 0.5) * 0.04  // dz
      );
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Particle Materials
    const material = new THREE.PointsMaterial({
      color: 0x00f0ff, // Electric Blue
      size: 1.6,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Connecting plexus wires
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xbd00ff, // Neon Purple
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Mouse coordinates tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX - width / 2) * 0.035;
      targetMouseY = (event.clientY - height / 2) * 0.035;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Resize Handler
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse damping
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      // Rotate camera group based on mouse movement
      scene.rotation.y = mouseX * 0.006;
      scene.rotation.x = mouseY * 0.006;

      const positionsAttr = geometry.getAttribute("position") as THREE.BufferAttribute;
      const positionsArr = positionsAttr.array as Float32Array;

      const linePositions: number[] = [];

      // Update velocities and bounds
      for (let i = 0; i < particleCount; i++) {
        positionsArr[i * 3] += velocities[i * 3];
        positionsArr[i * 3 + 1] += velocities[i * 3 + 1];
        positionsArr[i * 3 + 2] += velocities[i * 3 + 2];

        // Boundaries checks bounce back
        if (Math.abs(positionsArr[i * 3]) > 60) velocities[i * 3] *= -1;
        if (Math.abs(positionsArr[i * 3 + 1]) > 40) velocities[i * 3 + 1] *= -1;
        if (Math.abs(positionsArr[i * 3 + 2]) > 30) velocities[i * 3 + 2] *= -1;

        // Check relative distance for connections
        for (let j = i + 1; j < particleCount; j++) {
          const dx = positionsArr[i * 3] - positionsArr[j * 3];
          const dy = positionsArr[i * 3 + 1] - positionsArr[j * 3 + 1];
          const dz = positionsArr[i * 3 + 2] - positionsArr[j * 3 + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          // Connect particles within a threshold
          if (dist < 20) {
            linePositions.push(
              positionsArr[i * 3], positionsArr[i * 3 + 1], positionsArr[i * 3 + 2],
              positionsArr[j * 3], positionsArr[j * 3 + 1], positionsArr[j * 3 + 2]
            );
          }
        }
      }

      positionsAttr.needsUpdate = true;

      // Redraw lines
      if (linePositions.length > 0) {
        lineGeometry.setAttribute(
          "position",
          new THREE.Float32BufferAttribute(linePositions, 3)
        );
        lineMesh.visible = true;
      } else {
        lineMesh.visible = false;
      }

      // Continuous orbital rotation
      particles.rotation.y += 0.0004;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-40 select-none"
    />
  );
}
