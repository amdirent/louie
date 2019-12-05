import React, {PureComponent} from 'react';

export default class Logout extends React.PureComponent {
  constructor(props) {
    super(props);
    //this.auth = new Auth();
  }

  componentDidMount() {
    this.props.auth.logout();
  }
}
