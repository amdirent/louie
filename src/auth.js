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

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
  }

  setSession(authResult, callback) {
    sessionStorage.setItem('expiresAt', (authResult.expiresIn) + this.getCurrentTimestamp());
    sessionStorage.setItem('accessToken', authResult.accessToken);
    sessionStorage.setItem('idToken', authResult.idToken);
    sessionStorage.setItem('scope', authResult.scope);
    sessionStorage.setItem('role', jwtDecode(authResult.idToken)['https://rentbutter.com/roles']);
    sessionStorage.setItem('accountId', jwtDecode(authResult.idToken)['https://rentbutter.com/accountId']);

    if (callback) callback();

    //this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
    //  console.log(user)
    //  this.setUser(user);
    //  this.sendToDashboard(user['https://rentbutter.com/roles']);
    //});
  }

  // TODO: This code is not working. Look into at some point.
  //renewSession() {
  //  this.auth0.checkSession({}, (err, authResult) => {
  //    if (authResult && authResult.accessToken && authResult.idToken) {
  //      this.setSession(authResult);
  //    } else if (err) {
  //      this.logout();
  //    }
  //  });
  //}

  // Consider expired if this timestamp will expire 600 seconds (10 minutes) from now.
  //isExpired() {
  //  return !((this.getCurrentTimestamp() + 600) < this.expiresAt);
  //}

  logout() {
    sessionStorage.clear();
    this.auth0.logout({returnTo: process.env.LOGIN_URL});
  }

  login(username, password, callback) {
    const that = this;
    this.auth0.client.login(
      {
        realm: 'Username-Password-Authentication',
        username: username,
        password: password
      },
      function(err, authResult) {
        if (!err) that.setSession(authResult, callback);
        // TODO: Handle error
      }
    );
  }

  getCurrentTimestamp() {
    return (new Date().getTime() / 1000);
  }
}
