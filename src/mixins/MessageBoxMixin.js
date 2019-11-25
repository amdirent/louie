import update from 'immutability-helper';

const MessageBoxMixin = (Base) => class extends Base {
  state = {
    show_message: false,
    message_level: null,
    message: { header: null, body: null }
  }

  static getDerivedStateFromError(error) {
    return {
      show_message: true,
      message_level: 'error',
      message: {
        header: "We've run into a problem.",
        body: error.message
      }
    }
  }

  componentDidCatch(error, errorInfo) {
    // Send to external logs.
    console.log(error, errorInfo);
    this.showMessage('error', errorInfo);
    return null;
  }

  clearMessage() {
    const updatedState = update(this.state, {
      show_message: {$set: false},
      message_level: {$set: null},
      message: {$set: {header: null, body: null}}
    });

    this.setState(updatedState);
  }

  showMessage(level, msg) {
    const updatedState = update(this.state, {
      show_message: {$set: true},
      message_level: {$set: level},
      message: {$set: msg}
    });

    this.setState(updatedState);
  }
}

export default MessageBoxMixin;
