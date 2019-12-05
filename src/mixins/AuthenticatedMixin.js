import Auth from '../auth/auth0.js';

const AuthenticatedMixin = (Base) => class extends Base {
  constructor(props) {
    super(props);
    this.auth = new Auth();    
    this.state.user = this.auth.verifySession();
  }
}

export default AuthenticatedMixin;
