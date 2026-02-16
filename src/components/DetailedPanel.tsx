import React, { useMemo } from 'react';

import { useTreeStore } from '../store';

import styles from './DetailedPanel.module.css';
import { findNodeByPath } from './utils';

const DetailedPanel: React.FC = () => {
  const treeData = useTreeStore((state) => state.treeData);
  const selectedPath = useTreeStore((state) => state.selectedPath);

  const node = useMemo(() => {
    if (!selectedPath) return null;
    return findNodeByPath(treeData, selectedPath);
  }, [treeData, selectedPath]);

  if (!node) {
    return (
      <div className={styles.placeholder}>Select a node to see details</div>
    );
  }

  return (
    <div className={styles.panel}>
      <h2>Detailed Data</h2>
      <pre>{JSON.stringify(node, null, 2)}</pre>
    </div>
  );
};

const ComponentContainer = React.memo(DetailedPanel);
export { ComponentContainer as DetailedPanel };
