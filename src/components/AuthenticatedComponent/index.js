import React, {PureComponent} from 'react';
import LoadingComponent from '../LoadingComponent';
import Logout from '../Logout';
import jwtDecode from 'jwt-decode';

export default class AuthenticatedComponent extends LoadingComponent {
  constructor(props) {
    super(props);
    this.state.user = 'Butter'
//let user;
//    try {
//      const authedUser = jwtDecode(sessionStorage.getItem('idToken'));
//      const currentTimestamp = new Date().getTime() / 1000;
//      const expiration = authedUser.exp - 600; // Expired if expiring within 10 mins
//      const isExpired = currentTimestamp >= expiration;
//
//      if (isExpired) {
//        throw "User's session has expired";
//      } else {
//        // TODO: Write code to update the accessToken
//        //resolve({user: user});
//        console.log("^^^^^^^^^^^^^^^ Authed ^^^^^^^^^^^^^^")
//        user = authedUser;
//      }
//    } catch(e) {
//      console.log(e);
//      Logout.logout();
//    }
//
//    this.state.user = user;
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
