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
    redirectUri: window.location.origin + process.env.AUTH0_REDIRECT_PATH
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.setSession = this.setSession.bind(this);
    //this.refreshToken = this.refreshToken.bind(this);
    this.getUser = this.getUser.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.clearSession = this.clearSession.bind(this);
    this.setDataItem = this.setDataItem.bind(this);
  }

  setDataItem(key, value) {
    Cookies.set(key, value);
  }

  clearSession() {
    console.log("Clearing Cookies");
    //Cookies.remove('idToken', {domain: window.location.hostname});
    //Cookies.remove('accessToken', {domain: window.location.hostname});
    //Cookies.remove('expiresAt', {domain: window.location.hostname});
    //Cookies.remove('scope', {domain: window.location.hostname});
    //Cookies.remove('role', {domain: window.location.hostname});
    //Cookies.remove('accountId', {domain: window.location.hostname});

    Cookies.remove('idToken'); 
    Cookies.remove('accessToken');
    Cookies.remove('expiresAt');
    Cookies.remove('scope');
    Cookies.remove('role');
    Cookies.remove('accountId');
  }

  setSession(authResult, callback) {
    this.clearSession();
    this.setDataItem('accessToken', authResult.accessToken);
    this.setDataItem('idToken', authResult.idToken);
    this.setDataItem('expiresAt', (authResult.expiresIn) + this.getCurrentTimestamp());
    this.setDataItem('scope', authResult.scope);
    this.setDataItem('role', jwtDecode(authResult.idToken)[`${process.env.APP_URI}/roles`]);
    this.setDataItem('accountId', jwtDecode(authResult.idToken)[`${process.env.APP_URI}/accountId`]);

    if (callback) callback();
  }

  logout() {
    this.clearSession();
    this.auth0.logout({returnTo: window.location.origin + process.env.LOGIN_ROUTE});
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

  //refreshToken() {
  //  const that = this;

  //  return new Promise((resolve, reject) => {
  //   that.auth0.checkSession(
  //    {
  //      //audience: process.env.AUTH0_API_AUDIENCE,
  //      //scope: process.env.AUTH0_SCOPE,
  //      //responseType: 'token',
  //      //redirectUri: window.location.origin + process.env.AUTH0_CALLBACK_PATH
  //    },
  //    function(err, authResult) {
  //      if (err)
  //        reject(err);

  //      //that.setSession(authResult, callback);
  //      resolve(authResult);
  //    }
  //  );
  //   
  //  });
  //}

  isSessionExpired() {
    const authedUser = this.getUser();
    const currentTimestamp = new Date().getTime() / 1000;
    //const isExpiring = currentTimestamp >= (authedUser.exp - 3600); // >= hour 
    const expired =  currentTimestamp >= authedUser.exp;

    if (!authedUser || expired) {
      return true;
    }

    //if (isExpiring) {
    //  this.refreshToken();
    //}

    return false;
  };

  getUser() {
    try {
      const token = Cookies.get('idToken');
      return jwtDecode(token);
    } catch(e) {
      return null;
    }
  }

  getAccessToken() {
    const token = Cookies.get('accessToken');
    return token;
  }

  getRole() {
    const role = Cookies.get('role');
    return role;
  }

  getAccountId() {
    const accountId = Cookies.get('accountId');
    return accountId;
  }

  changePassword(connection, email, callback) {
    this.auth0.changePassword({connection: connection, email: email}, callback);
  }

}
