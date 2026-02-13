export interface TreeNode {
  name: string;
  children?: TreeNode[];
  [key: string]: any;
}
