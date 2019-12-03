import React, {PureComponent} from 'react';

class LoginForm extends React.PureComponent {
  render() {
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
