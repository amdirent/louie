import React, {PureComponent} from 'react';
import Auth from '../../auth.js';

export default class Logout extends React.PureComponent {
  constructor(props) {
    super(props);
    this.auth = new Auth();
  }

  componentDidMount() {
    this.auth.logout();
  }

  static logout() {
    const auth = new Auth();
    auth.logout();
  } 
}
