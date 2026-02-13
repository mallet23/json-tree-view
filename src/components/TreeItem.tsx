import React, { useCallback } from 'react';

import { TreeNode } from '../TreeNode';

import styles from './TreeItem.module.css';

interface TreeItemProps {
  node: TreeNode;
  level: number;
  hasChildren: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  onSelect: (node: TreeNode) => void;
  selected: TreeNode | null;
}

const TreeItem: React.FC<TreeItemProps> = ({
  node,
  level,
  hasChildren,
  isExpanded,
  onToggle,
  onSelect,
  selected,
}) => {
  const isSelected = selected === node;

  const rowClassName = `${styles.itemRow} ${isSelected ? styles.itemRowSelected : ''}`;
  const childPadding = { paddingLeft: level * 12 };

  return (
    <div className={rowClassName} style={childPadding}>
      {hasChildren && (
        <button onClick={onToggle}>{isExpanded ? '-' : '+'}</button>
      )}
      <span onClick={() => onSelect(node)}>{node.name}</span>
    </div>
  );
};

const ComponentContainer = React.memo(TreeItem);
export { ComponentContainer as TreeItem };
