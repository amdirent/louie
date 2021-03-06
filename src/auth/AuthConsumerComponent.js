import React from 'react';
import AuthContext from './AuthContext.js';

const AuthConsumerComponent = (props) => (
  <AuthContext.Consumer>
    { value => React.cloneElement(props.children, {auth: value}) }
  </AuthContext.Consumer>
);

export default AuthConsumerComponent;
