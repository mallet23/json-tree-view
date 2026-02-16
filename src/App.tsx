import React, { useCallback } from 'react';

import styles from './App.module.css';
import { DetailedPanel, TreeView } from './components';
import { useTreeStore } from './store';

const App: React.FC = () => {
  const setTreeData = useTreeStore((state) => state.setTreeData);

  const handleUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const json = JSON.parse(event.target?.result as string);
      setTreeData(json);
    };
    reader.readAsText(file);
  }, [setTreeData]);

  return (
    <div className={styles.app}>
      <div className={styles.sidebar}>
        <input
          className={styles.chooseFileBtn}
          type="file"
          accept=".json"
          onChange={handleUpload}
        />
        <TreeView />
      </div>
      <div className={styles.content}>
        <DetailedPanel />
      </div>
    </div>
  );
};

export default App;
