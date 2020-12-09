import React, {PureComponent} from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

export default class DataWindow extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      items                 : props.items,
      itemCount             : props.items.length,
      itemHeight            : props.itemHeight,
      virtualPageHeight     : props.items.length * props.itemHeight,
      currentPosition       : 0,
      startIndex            : 0,
      scrollDirection       : undefined,
    };

    this.onPage           = this.onPage.bind(this);
  }

  static getDerivedStateFromProps(props) {
    return {
      items                 : props.items.map((i, idx) => {
        return {
          item: i,
          style: {
            position: 'absolute',
            left: '0px',
            top: `${idx * props.itemHeight}`,
            height: props.itemHeight,
            width: '100%'
          }
        }
      }),
      itemCount             : props.items.length,
      itemHeight            : props.itemHeight,
      virtualPageHeight     : props.items.length * props.itemHeight
    }
  }

  onPage(position, itemsInWindow) {
    const virtualWindowHeight = itemsInWindow * this.state.itemHeight;
    let updatedState = {};

    position < this.state.currentPosition ? updatedState.scrollDirection = 'up' : updatedState.scrollDirection = 'down';
    updatedState.startIndex = (Math.round((virtualWindowHeight - (virtualWindowHeight - position)) / this.state.itemHeight));

    this.setState(updatedState);
  }

  render() {
    const {buffer, children} = this.props;
    const {itemHeight, virtualPageHeight, startIndex} = this.state;

    return (
      <AutoSizer style={{height: '100%', width: '100%'}}>
        {({height, width}) => {
          const itemsInView = Math.round((height) / itemHeight);
          const itemsInWindow = Math.round((height / virtualPageHeight) * (buffer * 10)) + itemsInView;
          const window = this.state.items.slice(startIndex, (itemsInWindow + startIndex)); // Look into changing the window size (increase) if the element is being scrolled up. This may fix the issue with empty items rendering at the top of the view.

          return children({window, height, width, itemHeight, virtualPageHeight, itemsInView, itemsInWindow, onPage: (position) => this.onPage(position, itemsInWindow)});
        }}
      </AutoSizer>
    );
  }
}

//<DataWindow buffer={20} itemHeight={35} items={inventory}>
//  {({window, itemsInWindow, height, onPage}) => (
//    <Segment style={{overflow: 'auto', height: '100%'}} onScroll={(e) => onPage(e.target.scrollTop)} basic>
//      <div style={{height: (Math.round(height/itemsInWindow) * inventory.length)}}>
//        {window.map(({item, style}, idx) => (
//          <div style={style} key={idx}>{item.id} - {item.unit_address}</div>
//        ))}
//      </div>
//    </Segment>
//  )}
//</DataWindow>
