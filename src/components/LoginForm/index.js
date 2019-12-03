import React, {PureComponent} from 'react';
import Auth from '../../auth.js';

export default class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {error: null};
    this.auth = new Auth();
    this.handleSubmission = this.handleSubmission.bind(this);
  }

  handleSubmission(e) {
    if (e) e.preventDefault();

    this.auth.login(
      this.refs.usernameInput.value, 
      this.refs.passwordInput.value,
      this.props.onAuthenticated,
      function(err) {
        this.setState({error: err.description});
      }
    );
  }
  
  render() {
    const Logo = this.props.logo;
    
    const onSubmitHandler = this.props.onSubmit 
      ? this.props.onSubmit 
      : this.handleSubmission; 

    return (
      <div className="login-page">
        { this.props.logo && <Logo /> }
        <div className="form">
          <form className="login-form" onSubmit={onSubmitHandler}>
            { this.state.error && <div class='error'>{this.state.error}</div> }
            <input type="text" placeholder="username" ref="usernameInput"/>
            <input type="password" placeholder="password" ref="passwordInput"/>
            <button>login</button>
            <p className="message">
              Forgot password? <a href="#">Request a reset.</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
