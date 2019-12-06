import React, {PureComponent} from 'react';

export default class Logout extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    this.props.auth.logout();
    return null;
  }
}
