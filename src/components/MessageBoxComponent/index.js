import React, {PureComponent} from 'react';

export default class MessageBoxComponent extends React.PureComponent {
  render() {
    let {message, level, MessageComponent=null} = this.props;
    let ml;

    switch(level) {
      case 'error':
        ml = { error: true };
        break;
      case 'success':
        ml = { success: true };
        break;
      case 'warning':
        ml = { warning: true };
        break;
      default:
        ml = { info: true };
    }

    if (!MessageComponent)
      MessageComponent = (props) => (
        <div className={Object.keys(ml)[0]}>
          <h2>{message.header}</h2>
          <p>{message.body}</p>
        </div>
      );

    return <MessageComponent level={ml} message={message} />;
  }
};
