import { TreeNode } from '../../TreeNode';

export interface VisibleNode {
  path: string;
  node: TreeNode;
  level: number;
  hasChildren: boolean;
  isExpanded: boolean;
}

export const buildVisibleNodes = (
  nodes: TreeNode[],
  expandedPaths: Set<string>,
  parentPath = '',
  level = 0,
): VisibleNode[] => {
  const result: VisibleNode[] = [];

  nodes.forEach((node, index) => {
    const path = parentPath ? `${parentPath}.${index}` : `${index}`;
    const hasChildren = !!(node.children && node.children.length > 0);
    const isExpanded = expandedPaths.has(path);

    result.push({
      path,
      node,
      level,
      hasChildren,
      isExpanded,
    });

    if (hasChildren && isExpanded) {
      result.push(
        ...buildVisibleNodes(node.children!, expandedPaths, path, level + 1),
      );
    }
  });

  return result;
};

export const togglePathWithDescendants = (
  expanded: Set<string>,
  path: string,
): Set<string> => {
  const next = new Set(expanded);

  if (next.has(path)) {
    next.forEach((p) => {
      if (p === path || p.startsWith(`${path}.`)) {
        next.delete(p);
      }
    });
  } else {
    next.add(path);
  }

  return next;
};
