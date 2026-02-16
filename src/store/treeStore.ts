import { create } from 'zustand';

import { TreeNode } from '../TreeNode';

interface TreeStore {
  treeData: TreeNode[];
  selectedPath: string | null;
  setTreeData: (data: TreeNode[]) => void;
  setSelectedPath: (path: string | null) => void;
  selectNodeByPath: (path: string | null) => void;
}

export const useTreeStore = create<TreeStore>((set) => ({
  treeData: [],
  selectedPath: null,
  setTreeData: (data) => set({ treeData: data, selectedPath: null }),
  setSelectedPath: (path) => set({ selectedPath: path }),
  selectNodeByPath: (path) => set({ selectedPath: path }),
}));
