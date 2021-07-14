import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export default class Auth0Strategy {

  auth0 = new auth0.WebAuth({
    domain: process.env.AUTH0_DOMAIN,
    clientID: process.env.AUTH0_CLIENT_ID,
    responseType: process.env.AUTH0_RESPONSE_TYPE,
    scope: process.env.AUTH0_SCOPE,
    audience: process.env.AUTH0_API_AUDIENCE,
    redirectUri: process.env.AUTH0_REDIRECT_URI
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.clearSession = this.clearSession.bind(this);
    this.setDataItem = this.setDataItem.bind(this);
  }

  setDataItem(key, value) {
    sessionStorage.setItem(key, value);
    Cookies.set(key, value);
  }

  clearSession() {
    localStorage.clear();
    sessionStorage.clear();

    Cookies.remove('id_token', {domain: window.location.hostname});
    Cookies.remove('access_token', {domain: window.location.hostname});
    Cookies.remove('expiresAt', {domain: window.location.hostname});
    Cookies.remove('scope', {domain: window.location.hostname});
    Cookies.remove('role', {domain: window.location.hostname});
    Cookies.remove('accountId', {domain: window.location.hostname});

    //Cookies.remove('id_token', {domain: `${process.env.NODE_ENV === 'development' ? '127.0.0.1' : '.rentbutter.com'}`});
    //Cookies.remove('access_token', {domain: `${process.env.NODE_ENV === 'development' ? '127.0.0.1' : '.rentbutter.com'}`});
  }

  setSession(authResult, callback) {
    this.setDataItem('accessToken', authResult.accessToken);
    this.setDataItem('idToken', authResult.idToken);
    this.setDataItem('expiresAt', (authResult.expiresIn) + this.getCurrentTimestamp());
    this.setDataItem('scope', authResult.scope);
    this.setDataItem('role', jwtDecode(authResult.idToken)['https://rentbutter.com/roles']);
    this.setDataItem('accountId', jwtDecode(authResult.idToken)['https://rentbutter.com/accountId']);

//    sessionStorage.setItem('accessToken', authResult.accessToken);
//    sessionStorage.setItem('idToken', authResult.idToken);
//    sessionStorage.setItem('expiresAt', (authResult.expiresIn) + this.getCurrentTimestamp());
//    sessionStorage.setItem('scope', authResult.scope);
//    sessionStorage.setItem('role', jwtDecode(authResult.idToken)['https://rentbutter.com/roles']);
//    sessionStorage.setItem('accountId', jwtDecode(authResult.idToken)['https://rentbutter.com/accountId']);
//
//    Cookies.set('id_token', authResult.idToken);

    if (callback) callback();
  }

  logout() {
    //sessionStorage.clear();
    //Cookies.remove('id_token', {domain: `${process.env.NODE_ENV === 'development' ? '127.0.0.1' : '.rentbutter.com'}`});
    //Cookies.remove('access_token', {domain: `${process.env.NODE_ENV === 'development' ? '127.0.0.1' : '.rentbutter.com'}`});

    this.clearSession();
    this.auth0.logout({returnTo: process.env.LOGIN_URL});
  }

  login(username, password, callback, errback) {
    const that = this;

    this.auth0.client.login(
      {
        realm: 'Username-Password-Authentication',
        username: username,
        password: password
      },
      function(err, authResult) {
        if (err) {
          errback(err);
        } else {
          that.setSession(authResult, callback);
        }
      }
    );
  }

  getCurrentTimestamp() {
    return (new Date().getTime() / 1000);
  }

  refreshToken(callback, errback) {
    this.auth0.checkSession(
      {
        audience: process.env.AUTH0_API_AUDIENCE,
        scope: process.env.AUTH0_SCOPE
      },
      function(err, authResult) {
        if (err) {
          if (errback) {
            errback(err);
          } else {
            console.log(err);
          }
        } else {
          this.setSession(authResult, callback);
        }
      }
    );
  }

  verifySession() {
    let user;

    try {
      const authedUser = this.getUser();
      const currentTimestamp = new Date().getTime() / 1000;
      const expiration = authedUser.exp - 600; // Expired if expiring within 10 mins
      const isExpired = currentTimestamp >= expiration;

      if (isExpired) {
        throw "User's session has expired";
      } else {
        // TODO: Write code to update the accessToken
        user = authedUser;
      }
    } catch(e) {
      console.log(e);
      this.logout();
    }

    return user;
  };

  getUser() {
    try {
      const token = sessionStorage.getItem('idToken') || Cookies.get('id_token');
      return jwtDecode(token);
    } catch(e) {
      this.logout();
    }
  }

  getAccessToken() {
    const token = sessionStorage.getItem('accessToken') || Cookies.get('access_token');
    return token;
  }

  changePassword(connection, email, callback) {
    this.auth0.changePassword({connection: connection, email: email}, callback);
  }

}
