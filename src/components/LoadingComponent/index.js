import React, {PureComponent} from 'react';

/**
 * A LoadingComponent presents a loading mask while the component retrieves 
 * data from an asynchronous source.
 */ 
export default class LoadingComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { loaded: false };

    this.loaded = this.loaded.bind(this);
    this.loading = this.loading.bind(this);
    this.showLoader = this.showLoader.bind(this);
    this.hideLoader = this.hideLoader.bind(this);

  }

  /**
   * Should be called from child class via super.componentDidMount(p). Method 
   * accepts promise which should resolve to a new state object with which to 
   * update the component.
   * 
   * @param {Promise} promise - Promise to retrieve data resolving to new state.
   */
  componentDidMount(promises) {
    //promise.then((result) => {
    //  const newState = {...result, ...{loaded: true}};
    //  this.setState(newState);
    //});
    Promise.all(promises).then((results) => {
      let newState = {};

      for (let i=0; i<=results.length; i++) {
        newState = {...newState, ...results[i]}
      }

      this.setState({...newState, ...{loaded: true}});
    });
  }

  /**
   * Shows the loading mask
   */
  showLoader() {
    this.setState({loaded: false});
  }

  /**
   * Hides the loading mask
   */
  hideLoader() {
    this.setState({loaded: true});
  }

  /**
   * Called when the data is finished loading. Returns the component that should
   * be rendered when all data is received. This method should be overwritten
   * to provide the appropriate functionality.
   */
  loaded() {
    return <div>Component Loaded!</div>;
  }

  /**
   * Called when the component is mounted and waiting for data to be received.
   * Returns a component to act as the loading mask. This method can optionally
   * be overwritten.
   */
  loading() {
    return <div>Loading...</div>;
  }

  render() {
    // Render the desired component when retrieved data has been loaded. 
    if (this.state.loaded)
      return this.loaded();

    return this.loading();
  }
}
