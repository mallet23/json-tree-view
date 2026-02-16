import React, { useCallback } from 'react';

import { useTreeStore } from '../store';

import styles from './TreeItem.module.css';

interface TreeItemProps {
  path: string;
  name: string;
  level: number;
  hasChildren: boolean;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: (path: string) => void;
  onSelect: (path: string) => void;
}

const TreeItem: React.FC<TreeItemProps> = ({
  path,
  name,
  level,
  hasChildren,
  isExpanded,
  isSelected,
  onToggle,
  onSelect,
}) => {
  const handleSelect = useCallback(() => {
    onSelect(path);
  }, [onSelect, path]);
  const handleToggle = useCallback(() => {
    onToggle(path);
  }, [onToggle, path]);

  const rowClassName = `${styles.itemRow} ${isSelected ? styles.itemRowSelected : ''}`;
  const childPadding = { paddingLeft: level * 12 };

  return (
    <div className={rowClassName} style={childPadding}>
      {hasChildren && (
        <button onClick={handleToggle}>{isExpanded ? '-' : '+'}</button>
      )}
      <span className={styles.itemName} onClick={handleSelect} title={name}>
        {name}
      </span>
    </div>
  );
};

const ComponentContainer = React.memo(TreeItem);
export { ComponentContainer as TreeItem };
