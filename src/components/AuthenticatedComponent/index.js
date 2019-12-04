import React, {PureComponent} from 'react';
import LoadingComponent from '../LoadingComponent';
import Logout from '../Logout';
import jwtDecode from 'jwt-decode';

export default class AuthenticatedComponent extends LoadingComponent {
  constructor(props) {
    super(props);

    try {
      const user = jwtDecode(sessionStorage.getItem('idToken'));
      const currentTimestamp = new Date().getTime() / 1000;
      const expiration = user.exp - 600; // Expired if expiring within 10 mins
      const isExpired = currentTimestamp >= expiration;

      if (isExpired) {
        throw "User's session has expired";
      } else {
        // TODO: Write code to update the accessToken
        //resolve({user: user});
        this.state.user = user;
      }
    } catch(e) {
      console.log(e);
      Logout.logout();
    }
  }

  //componentDidMount(promises=[]) {
  //  const verifySession = new Promise(function(resolve) {
  //    try {
  //      const user = jwtDecode(sessionStorage.getItem('idToken'));
  //      const currentTimestamp = new Date().getTime() / 1000;
  //      const expiration = user.exp - 600; // Expired if expiring within 10 mins
  //      const isExpired = currentTimestamp >= expiration;

  //      if (isExpired) {
  //        throw "User's session has expired";
  //      } else {
  //        // TODO: Write code to update the accessToken
  //        resolve({user: user});
  //      }
  //    } catch(e) {
  //      console.log(e);
  //      Logout.logout();
  //    }
  //  });

  //  promises.push(verifySession);
  //  super.componentDidMount(promises);
  //}
}
