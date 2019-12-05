import Auth from '../auth.js';

const AuthenticatedMixin = (Base) => class extends Base {
  constructor(props) {
    super(props);
    this.auth = new Auth();    
    this.state.user = this.auth.verifySession();
  }
}

export default AuthenticatedMixin;
