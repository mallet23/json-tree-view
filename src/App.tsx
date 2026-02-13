import React, { useCallback, useState } from 'react';

import styles from './App.module.css';
import { TreeNode } from './TreeNode';
import { DetailedPanel, TreeView } from './components';

const App: React.FC = () => {
  const [data, setData] = useState<TreeNode[]>([]);
  const [selected, setSelected] = useState<TreeNode | null>(null);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const json = JSON.parse(event.target?.result as string);
      setData(json);
      setSelected(null);
    };
    reader.readAsText(file);
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <input type="file" accept=".json" onChange={handleUpload} />
        <TreeView data={data} onSelect={setSelected} selected={selected} />
      </div>
      <div className={styles.content}>
        <DetailedPanel node={selected} />
      </div>
    </div>
  );
};

export default App;
