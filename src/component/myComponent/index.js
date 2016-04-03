import React from 'react';
import styles from './theme/css';
import ChildComponent from './component/childComponent';

export default class extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div className={styles['my-component']}>
      <button className={styles.btn} type="button">
        button
      </button>
      component
      <ChildComponent/>
    </div>;
  }
};