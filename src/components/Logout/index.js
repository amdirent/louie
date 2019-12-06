import React, {PureComponent} from 'react';

export default class Logout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.props.auth.logout();
  }

  //componentDidMount() {
  //  this.props.auth.logout();
  //}
}
