import React from 'react';

export default class extends React.Component {
  static propTypes = {
    value: React.PropTypes.string
  }

  static defaultProps = {
    value: ''
  }

  state = {
    
  };

  render() {
    return <div>child component</div>;
  }
};
