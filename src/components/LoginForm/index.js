import React, {PureComponent} from 'react';

export default class LoginForm extends React.PureComponent {
  render() {
    const Logo = this.props.logo;
    
    const defaultSubmissionHandler = function(event) {
      if (event) event.preventDefault();
        console.log(this.refs.usernameInput.value);
        console.log(this.refs.passwordInput.value); 
    };

    const onSubmitHandler = this.props.onSubmit 
      ? this.props.onSubmit 
      : defaultSubmissionHandler; 

    return (
      <div className="login-page">
        { this.props.logo && <Logo /> }
        <div className="form">
          <form className="login-form" onSubmit={onSubmitHandler}>
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
