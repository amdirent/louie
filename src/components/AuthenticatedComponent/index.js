import React, {PureComponent} from 'react';
import LoadingComponent from '../LoadingComponent';
import Logout from '../Logout';
import jwtDecode from 'jwt-decode';

export default class AuthenticatedComponent extends LoadingComponent {
  componentDidMount(promises=[]) {
    const verifySession = new Promise(function(resolve) {
      try {
        const user = jwtDecode(sessionStorage.getItem('idToken'));
        const currentTimestamp = new Date().getTime() / 1000;
        const expiration = user.exp; // - 600;
        const isExpired = currentTimestamp >= expiration;

        if (isExpired) {
          throw "User's session has expired";
        } else {
          // Write code to update the accessToken
          resolve({user: user});
        }
      } catch(e) {
        console.log(e);
        Logout.logout();
      }
    });

    promises.push(verifySession);
    super.componentDidMount(promises);
  }
}
