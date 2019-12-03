import React, {PureComponent} from 'react';

export default class LoginForm extends React.PureComponent {
  render() {
    const submissionHandler = this.props.onSubmit || function(event) {
      if (event) event.preventDefault();
        console.log(this.refs.usernameInput.value);
        console.log(this.refs.passwordInput.value); 
    };

    return (
      <div className="login-page">
        <div className="form">
          <form className="login-form" onSubmit={this.props.onSubmit}>
            <input type="text" placeholder="username" ref="usernameInput"/>
            <input type="password" placeholder="password" ref="passwordInput"/>
            <button>login</button>
            <p className="message">Forgot password? <a href="#">Request a reset.</a></p>
          </form>
        </div>
      </div>
    );
  }
}
