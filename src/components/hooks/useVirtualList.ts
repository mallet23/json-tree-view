import { useMemo } from 'react';

interface UseVirtualListParams<T> {
  items: T[];
  rowHeight: number;
  containerHeight: number;
  scrollTop: number;
  overscan?: number;
}

export const useVirtualList = <T>({
  items,
  rowHeight,
  containerHeight,
  scrollTop,
  overscan = 5,
}: UseVirtualListParams<T>) => {
  return useMemo(() => {
    const totalHeight = items.length * rowHeight;

    const startIndex = Math.max(
      0,
      Math.floor(scrollTop / rowHeight) - overscan,
    );

    const visibleCount = Math.ceil(containerHeight / rowHeight) + overscan * 2;

    const endIndex = Math.min(items.length, startIndex + visibleCount);

    const windowedItems = items.slice(startIndex, endIndex);

    return {
      totalHeight,
      startIndex,
      windowedItems,
    };
  }, [items, rowHeight, containerHeight, scrollTop, overscan]);
};
