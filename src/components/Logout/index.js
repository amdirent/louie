import React, {PureComponent} from 'react';
import Auth from '../../auth.js';

export default class Logout extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.auth = new Auth();
    this.auth.logout();
  }
}
