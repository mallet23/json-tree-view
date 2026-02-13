import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { TreeNode } from '../TreeNode';

import { TreeItem } from './TreeItem';
import styles from './TreeView.module.css';
import { useResizeObserver, useVirtualList } from './hooks';
import { buildVisibleNodes, togglePathWithDescendants } from './utils';

interface TreeViewProps {
  data: TreeNode[];
  onSelect: (node: TreeNode) => void;
  selected: TreeNode | null;
}

const ROW_HEIGHT = 24;
const OVERSCAN_COUNT = 5;

const TreeView: React.FC<TreeViewProps> = ({ data, onSelect, selected }) => {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());
  const [scrollTop, setScrollTop] = useState(0);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const containerHeight = useResizeObserver(containerRef.current);

  useEffect(() => {
    setExpandedPaths(new Set());
    setScrollTop(0);
  }, [data]);

  const visibleNodes = useMemo(
    () => buildVisibleNodes(data, expandedPaths),
    [data, expandedPaths],
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
                node={item.node}
                level={item.level}
                hasChildren={item.hasChildren}
                isExpanded={item.isExpanded}
                onToggle={() => handleToggle(item.path)}
                onSelect={onSelect}
                selected={selected}
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
