import { useEffect, useRef, useState } from "react";

export default function BouncingLogo() {
  const logoRef = useRef<HTMLImageElement>(null);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const [velocity, setVelocity] = useState({ x: 2, y: 2 });

  useEffect(() => {
    const move = () => {
      const logo = logoRef.current;
      if (!logo) return;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const rect = logo.getBoundingClientRect();

      let newX = position.x + velocity.x;
      let newY = position.y + velocity.y;

      if (newX + rect.width >= screenWidth || newX <= 0) {
        setVelocity((v) => ({ ...v, x: -v.x }));
      }
      if (newY + rect.height >= screenHeight || newY <= 0) {
        setVelocity((v) => ({ ...v, y: -v.y }));
      }

      setPosition({ x: newX, y: newY });
    };

    const interval = setInterval(move, 10);
    return () => clearInterval(interval);
  }, [position, velocity]);

  return (
    <img
      ref={logoRef}
      src="/icone_sem_fundo.png"
      alt="Logo Aether"
      style={{
        position: "fixed",
        top: position.y,
        left: position.x,
        height: 150,
        width: "auto",
        zIndex: 30,
      }}
    />
  );
}
