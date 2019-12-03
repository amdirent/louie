import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    responseType: process.env.AUTH0_RESPONSE_TYPE,
    scope: process.env.AUTH0_SCOPE,
    audience: process.env.AUTH0_API_AUDIENCE
  });

  user = null;
  expiresAt = null;
  accessToken = null;
  idToken = null;
  scope = null;

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.renewSession = this.renewSession.bind(this);
    this.decodeIdToken = this.decodeIdToken.bind(this);
    this.setUser = this.setUser.bind(this);
    this.sendToDashboard = this.sendToDashboard.bind(this);
  }

  decodeIdToken(token) {
    if (token) {
      return jwtDecode(token);
    } else {
      return jwtDecode(localStorage.getItem('idToken'));
    }
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setSession(err, authResult) {
    //console.log(authResult.refreshToken)
    //this.expiresAt = (authResult.expiresIn) + this.getCurrentTimestamp();
    //this.accessToken = authResult.accessToken;
    //this.idToken = authResult.idToken;
    //this.scope = authResult.scope;
    //this.role = jwtDecode(authResult.idToken)['https://rentbutter.com/roles'];

    console.log("++++++++++++++++++++++++++")
    console.log(authResult)
    console.log("++++++++++++++++++++++++++")

    //this.sendToDashboard(this.role);
    //this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
    //  console.log(user)
    //  this.setUser(user);
    //  this.sendToDashboard(user['https://rentbutter.com/roles']);
    //});
  }

  sendToDashboard(role) {
    role === 'admin' ? history.push('/tool/admin/accounts') : history.push('/tool/account-overview');
  }

  // TODO: This code is not working. Look into at some point.
  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
      }
    });
  }

  // Consider expired if this timestamp will expire 600 seconds (10 minutes) from now.
  isExpired() {
    return !((this.getCurrentTimestamp() + 600) < this.expiresAt);
  }

  logout() {
    this.expiresAt = null;
    this.accessToken = null;
    this.idToken = null;
    this.scope = null;

    this.auth0.logout({returnTo: process.env.LOGIN_URL});
  }

  login(username, password) {
    this.auth0.client.login(
      {
        realm: 'Username-Password-Authentication',
        username: username,
        password: password
      },
      this.setSession 
    );
  }

  getCurrentTimestamp() {
    return (new Date().getTime() / 1000);
  }
}
