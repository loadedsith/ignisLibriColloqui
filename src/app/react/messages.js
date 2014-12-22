/* jshint unused: false */
/* exported MYLIST */

var MYLIST = React.createClass({
  render: function() {
    'use strict';
    var data = this.props.data;
    
    if (data !== undefined) {
      var rows = data.map(function (datum) {
        /*jshint ignore:start */
        return <p key={datum.key}>{datum.name}:{datum.message}</p>;
        /*jshint ignore:end */
      });
    }

    return (
      /*jshint ignore:start */
      <pre className="">
        {rows} 
      </pre>
      /*jshint ignore:end */
    );
  }
});