/** @format */

import { useState, useEffect, useLayoutEffect } from "react";

interface ScreenSize {
  width: number;
  height: number;
}

const useScreenSize = (): ScreenSize => {
  const [screenSize, setScreenSize] = useState<ScreenSize>({
    width: 0,
    height: 0,
  });

  const useIsomorphicLayoutEffect =
    typeof window !== "undefined" ? useEffect : useLayoutEffect;

  useIsomorphicLayoutEffect(() => {
    const handleResize = () => {
      setScreenSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    typeof window !== "undefined" &&
      window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenSize;
};

export { useScreenSize };
