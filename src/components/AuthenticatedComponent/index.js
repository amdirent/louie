import React, {PureComponent} from 'react';
import LoadingComponent from '../LoadingComponent';
import Logout from '../Logout';
import jwtDecode from 'jwt-decode';

export default class AuthenticatedComponent extends LoadingComponent {
  componentDidMount(promises=[]) {
    const verifySession = new Promise(function(resolve) {
      try {
        const user = jwtDecode(sessionStorage.getItem('idToken'));
        resolve({user: user});
      } catch(e) {
        console.log(e);
        Logout.logout();
      }
    });

    promises.push(verifySession);
    super.componentDidMount(promises);
  }
}
