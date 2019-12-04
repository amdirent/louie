import React, {PureComponent} from 'react';
import Auth from '../../auth.js';

export default class LoginForm extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {error: null, buttonText: 'login'};
    this.auth = new Auth();
    this.handleSubmission = this.handleSubmission.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleSubmission(e) {
    const that = this;

    if (e) e.preventDefault();

    this.auth.login(
      this.refs.usernameInput.value, 
      this.refs.passwordInput.value,
      this.props.onAuthenticated, // Success callback
      function(err) { // Error callback
        that.setState({error: err.description});
      }
    );
  }

  onFormSubmit(e) {
    const handler = this.props.onSubmit 
      ? this.props.onSubmit 
      : this.handleSubmission; 

    this.setState(
      {buttonText: 'authenticating...'},
      function() {
        handler(e);
      }
    );
  }
  
  render() {
    const Logo = this.props.logo;
    
    return (
      <div className="login-page">
        { this.props.logo && <Logo /> }
        <div className="form">
          <form className="login-form" onSubmit={this.onFormSubmit}>
            { this.state.error && <div className='error'>{this.state.error}</div> }
            <input type="text" placeholder="username" ref="usernameInput"/>
            <input type="password" placeholder="password" ref="passwordInput"/>
            <button>{this.state.buttonText}</button>
            <p className="message">
              Forgot password? <a href="#">Request a reset.</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
