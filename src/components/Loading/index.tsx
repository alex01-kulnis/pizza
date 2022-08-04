import React from 'react';
import styles from './Loading.module.scss';

const Loading: React.FC = () => {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.loadingSpinner}></div>
    </div>
  );
};

export default Loading;
