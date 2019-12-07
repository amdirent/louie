import React, {PureComponent} from 'react';

export default class ResetPasswordForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {error: null, buttonText: 'request reset'};
    this.handleSubmission = this.handleSubmission.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  handleSubmission(e) {
    const that = this;

    this.props.auth.changePassword(
      'Username-Password-Authentication',
      this.refs.usernameInput.value,
      function(err, resp) {
        if (err) {
          that.setState({error: err.description});
        } else {
          if (that.props.onResetRequestSent) 
            that.props.onResetRequestSent(resp);
        }
      }
    );
  }

  onFormSubmit(e) {
    if (e) e.preventDefault();

    const handler = this.props.onSubmit 
      ? this.props.onSubmit 
      : this.handleSubmission; 

    this.setState(
      {buttonText: 'reset request sent'},
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
        <div className="auth-form">
          <form className="login-form" onSubmit={this.onFormSubmit}>
            { this.state.error && <div className='error'>{this.state.error}</div> }
            <input type="text" placeholder="email" ref="usernameInput"/>
            <button>{this.state.buttonText}</button>
            <p className="message">
              Ready to logoin? <a href={process.env.LOGIN_URL}>Login Page.</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}
