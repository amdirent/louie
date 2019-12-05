import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';

export default class Auth0 {

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
    this.refreshToken = this.refreshToken.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  setSession(authResult, callback) {
    sessionStorage.setItem('expiresAt', (authResult.expiresIn) + this.getCurrentTimestamp());
    sessionStorage.setItem('accessToken', authResult.accessToken);
    sessionStorage.setItem('idToken', authResult.idToken);
    sessionStorage.setItem('scope', authResult.scope);
    sessionStorage.setItem('role', jwtDecode(authResult.idToken)['https://rentbutter.com/roles']);
    sessionStorage.setItem('accountId', jwtDecode(authResult.idToken)['https://rentbutter.com/accountId']);

    if (callback) callback();
  }

  logout() {
    sessionStorage.clear();
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
       prompt: 'none'
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

  verifySession() {
    let user;
  
    try {
      const authedUser = jwtDecode(sessionStorage.getItem('idToken'));
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
    return jwtDecode(sessionStorage.getItem('idToken'));
  }

  getAccessToken() {
    return sessionStorage.getItem('accessToken');
  }

}
