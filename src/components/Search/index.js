import React, {PureComponent} from 'react';

export default class Search extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      onSearchResults: props.onSearchResults,
      masterList: props.masterList,
      resultSet: props.resultSet,
      deleting: false,
      conf: props.conf
    };
  }

  static getDerivedStateFromProps(props, state) {
    return {
      resultSet: props.resultSet
    }
  }

  render() {
    const {masterList, resultSet, onSearchResults, deleting, conf} = this.state;
    const {style, type} = this.props;

    const filterResults = (query, useMaster) => {
      const list = (useMaster|| query.length === 0) ? masterList: resultSet;
      const results = list.filter(function(q) {
        if (conf.fields) {
          let match = false;
          conf.fields.forEach(f => {
            const value = q[f];
            if (value && value.includes(query))
              match = true;
          });

          return match;
        } else {
          return q.includes(query);
        }
      });

      return results;
    };

    return (
      <input
        type={type ? type : 'search'}
        style={style}
        placeholder='Search...'
        onKeyDown={(e) => {
          if (e.key === 'Backspace')
            this.setState({deleting: true});
        }}
        onChange={(e) => {
          const query = e.target.value;
          const results = filterResults(query, deleting);
          this.setState({deleting: false}, () => onSearchResults(results));
        }}
      />
    );
  }
}
