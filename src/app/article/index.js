import React from 'react';

module.exports = class extends React.Component {
  constructor() {
    super();
  }

  render() {
    return <div>
      article index
      {this.props.children}
    </div>;
  }
};