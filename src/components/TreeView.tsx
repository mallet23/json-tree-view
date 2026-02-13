import React from 'react';

import { TreeNode } from '../TreeNode';

import { TreeItem } from './TreeItem';
import styles from './TreeView.module.css';

interface TreeViewProps {
  data: TreeNode[];
  onSelect: (node: TreeNode) => void;
  selected: TreeNode | null;
}

const TreeView: React.FC<TreeViewProps> = ({ data, onSelect, selected }) => {
  return (
    <ul className={styles.treeRoot}>
      {data.map((node, idx) => (
        <TreeItem
          key={idx}
          node={node}
          onSelect={onSelect}
          selected={selected}
          level={0}
        />
      ))}
    </ul>
  );
};

const ComponentContainer = React.memo(TreeView);
export { ComponentContainer as TreeView };
