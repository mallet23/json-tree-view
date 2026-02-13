import { useEffect, useState } from 'react';

export const useResizeObserver = (element: HTMLElement | null): number => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (!element) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      setHeight(entry.contentRect.height);
    });

    observer.observe(element);

    return () => observer.disconnect();
  }, [element]);

  return height;
};
