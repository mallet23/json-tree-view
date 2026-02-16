import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { useTreeStore } from '../store';

import { TreeItem } from './TreeItem';
import styles from './TreeView.module.css';
import { useResizeObserver, useVirtualList } from './hooks';
import { buildVisibleNodes, togglePathWithDescendants } from './utils';

const ROW_HEIGHT = 24;
const OVERSCAN_COUNT = 5;

const TreeView: React.FC = () => {
  const treeData = useTreeStore((state) => state.treeData);
  const selectedPath = useTreeStore((state) => state.selectedPath);
  const setSelectedPath = useTreeStore((state) => state.setSelectedPath);

  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [scrollTop, setScrollTop] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerHeight = useResizeObserver(containerRef.current);

  useEffect(() => {
    setExpandedPaths(new Set());
    setScrollTop(0);
  }, [treeData]);

  const visibleNodes = useMemo(
    () => buildVisibleNodes(treeData, expandedPaths),
    [treeData, expandedPaths],
  );

  const { totalHeight, startIndex, windowedItems } = useVirtualList({
    items: visibleNodes,
    rowHeight: ROW_HEIGHT,
    containerHeight,
    scrollTop,
    overscan: OVERSCAN_COUNT,
  });

  const handleToggle = useCallback((path: string) => {
    setExpandedPaths((prev) => togglePathWithDescendants(prev, path));
  }, []);

  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  const handleSelect = useCallback(
    (path: string) => {
      setSelectedPath(path);
    },
    [setSelectedPath],
  );

  return (
    <div
      ref={containerRef}
      className={styles.treeContainer}
      onScroll={handleScroll}
    >
      <div className={styles.treeInner} style={{ height: totalHeight }}>
        {windowedItems.map((item, idx) => {
          const itemIndex = startIndex + idx;

          return (
            <div
              key={item.path}
              className={styles.treeRowWrapper}
              style={{
                top: itemIndex * ROW_HEIGHT,
                height: ROW_HEIGHT,
              }}
            >
              <TreeItem
                path={item.path}
                level={item.level}
                hasChildren={item.hasChildren}
                isExpanded={item.isExpanded}
                isSelected={selectedPath === item.path}
                onToggle={handleToggle}
                onSelect={handleSelect}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ComponentContainer = React.memo(TreeView);
export { ComponentContainer as TreeView };
