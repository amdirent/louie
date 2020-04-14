import React, {PureComponent} from 'react';

export default class MessageBoxComponent extends React.PureComponent {
  render() {
    let {message, level, MessageComponent=null, style} = this.props;
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
        <div className={Object.keys(ml)[0]} style={style ? style : {}}>
          <h2>{message.header}</h2>
          { message.body && <p>{message.body}</p> }
        </div>
      );

    return <MessageComponent level={ml} message={message} />;
  }
};
