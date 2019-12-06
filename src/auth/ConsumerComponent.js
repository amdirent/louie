import AuthContext from './AuthContext.js';

const ConsumerComponent = (props) => (
  <AuthContext.Consumer>
    { value => React.cloneElement(props.children, {auth: value}) }
  </AuthContext.Consumer>
);
