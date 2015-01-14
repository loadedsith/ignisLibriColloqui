/* jshint unused: false */
/* exported MYLIST */
define(['react'], function(React) {
  'use strict';
  return React.createClass({
    render: function() {
    
      var data = this.props.data;

      if (data !== undefined) {
        var rows = data.map(function(datum) {
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
});
