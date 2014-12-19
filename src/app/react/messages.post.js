/* jshint unused: false */
/* exported MYLIST */

var MYLIST = React.createClass({displayName: 'MYLIST',
  render: function() {
    'use strict';
    var data = this.props.data;

    var rows = data.map(function (datum) {
      /*jshint ignore:start */
      return React.createElement("p", {key: datum.key}, datum.name, ":", datum.message);
      /*jshint ignore:end */
    });

    return (
      /*jshint ignore:start */
      React.createElement("pre", {className: ""}, 
        rows
      )
      /*jshint ignore:end */
    );
  }
});