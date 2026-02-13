import React from 'react';

import { TreeNode } from '../TreeNode';

import styles from './DetailedPanel.module.css';

interface DetailedPanelProps {
  node: TreeNode | null;
}

const DetailedPanel: React.FC<DetailedPanelProps> = ({ node }) => {
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
