import React, { useState } from 'react';

import { TreeNode } from '../TreeNode';

import styles from './TreeItem.module.css';

interface TreeItemProps {
  node: TreeNode;
  onSelect: (node: TreeNode) => void;
  selected: TreeNode | null;
  level: number;
}

const TreeItem: React.FC<TreeItemProps> = ({
  node,
  onSelect,
  selected,
  level,
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = node.children && node.children.length > 0;
  const isSelected = selected === node;

  const rowClassName = `${styles.itemRow} ${isSelected ? styles.itemRowSelected : ''}`;
  const childPadding = { paddingLeft: level * 12 };

  return (
    <li>
      <div className={rowClassName} style={childPadding}>
        {hasChildren && (
          <button onClick={() => setExpanded(!expanded)}>
            {expanded ? '-' : '+'}
          </button>
        )}
        <span onClick={() => onSelect(node)}>{node.name}</span>
      </div>

      {expanded && hasChildren && (
        <ul className={styles.treeChildren}>
          {node.children!.map((child, idx) => (
            <TreeItem
              key={idx}
              node={child}
              onSelect={onSelect}
              selected={selected}
              level={level + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

const ComponentContainer = React.memo(TreeItem);
export { ComponentContainer as TreeItem };
