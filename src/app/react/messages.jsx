/* jshint unused: false */
/* exported MYLIST */
define(['react'], function(React) {
  'use strict';
  return React.createClass({
    render: function() {
      var rows = [];

      var messages = this.props.data;

      if (messages === undefined) {
        console.log('data is undefined in messages.jsx');
        /*jshint ignore:start */
        return <p>messages</p>;
        /*jshint ignore:end */
      }

      for (var messageKey in messages) {
        var datum = messages[messageKey];
        var classes = "user user-"+datum.user.data['user_id'];
        /*jshint ignore:start */
        rows.push(<p className="chatBubble" key={messageKey}><span className={classes} >{datum.user.data['user_id']}</span>:{datum.message}</p>);
        /*jshint ignore:end */
      }
      console.log('rows', rows);
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
