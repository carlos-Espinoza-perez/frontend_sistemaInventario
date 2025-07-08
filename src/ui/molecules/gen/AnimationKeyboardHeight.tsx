import React, { useEffect, useState } from 'react';

const KeyboardAwareContainer = ({ children }: { children: React.ReactNode }) => {
  const [minHeight, setMinHeight] = useState(window.innerHeight);

  useEffect(() => {
    const initialHeight = window.innerHeight;

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      // Si el tamaño es menor, asumimos que el teclado está abierto
      if (currentHeight < initialHeight) {
        setMinHeight(currentHeight);
      } else {
        setMinHeight(initialHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="transition-all duration-300 ease-in-out bg-white"
      style={{ minHeight: `${minHeight}px` }}
    >
      {children}
    </div>
  );
};

export default KeyboardAwareContainer;