//import jwtDecode from 'jwt-decode';
//
//const verifyUser = () => {
//  let user;
//
//  try {
//    const authedUser = jwtDecode(sessionStorage.getItem('idToken'));
//    const currentTimestamp = new Date().getTime() / 1000;
//    const expiration = authedUser.exp - 600; // Expired if expiring within 10 mins
//    const isExpired = currentTimestamp >= expiration;
//
//    if (isExpired) {
//      throw "User's session has expired";
//    } else {
//      // TODO: Write code to update the accessToken
//      //resolve({user: user});
//      user = authedUser;
//    }
//  } catch(e) {
//    console.log(e);
//    Logout.logout();
//  }
//
//  return user;
//};

const AuthenticatedMixin = (Base) => class extends Base {
  state = { user: 'Butter' };
}

export default AuthenticatedMixin;
