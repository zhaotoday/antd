import React from 'react';
import { Link } from 'react-router';
import MyComponent from 'component/myComponent';
import { connect } from 'react-redux';
import actionCreators from '../action';
import styles from 'theme/default/css';

module.exports = connect(
  state => ({
    article: state.article
  }),
  dispatch => ({
    addArticle: (options) => dispatch(actionCreators.addArticle(options))
  })
)(class extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.addArticle({
      params: {
        data: 123456789
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.article) {
      console.log(nextProps.article);
    }
  }

  render() {
    return <div>
      <i className="iconfont icon-search"/>
      <header>
        <ul>
          <li><Link to="/article" activeClassName="active">article</Link></li>
          <li><Link to="/article/add" activeClassName="active">article/add</Link></li>
        </ul>
      </header>
      <MyComponent/>
      {this.props.children}
    </div>;
  }
});
