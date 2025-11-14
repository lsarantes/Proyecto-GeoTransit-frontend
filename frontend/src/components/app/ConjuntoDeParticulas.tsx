"use client";

import React, { useEffect, useState } from "react";
import FloatingDot from "./Particulas";

interface Particle {
  id: number;
  top: string;
  left: string;
  size: string;
  duration: string;
}

export default function ParticleField({ count = 40 }) {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 4 + 1}px`, // 1–5px
      duration: `${Math.random() * 3 + 3}s`, // 3–6s
    }));

    setParticles(newParticles);
  }, [count]);

  return (
    <>
      {particles.map((p) => (
        <FloatingDot key={p.id} {...p} />
      ))}
    </>
  );
}
