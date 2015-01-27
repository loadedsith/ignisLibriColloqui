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
      var classes = 'user';
      for (var messageKey in messages) {
        var datum = messages[messageKey];
        if(datum.user===undefined){
          continue;
        }
        var messageIsFromLocalUser = false;
        if (messages.localUser !== undefined) {
          if (messages.localUser.info !== undefined) {
            if (datum.user !== undefined){
              classes = 'user user-' + datum.user.data['user_id'];
              if(String(messages.localUser.info.id) === String(datum.user.data['user_id'])){
                messageIsFromLocalUser = true;
              }
            }
          }
        }
        /*jshint ignore:start */
        rows.push(<p 
          className='messageBubble' 
          key={messageKey}
          >{messageIsFromLocalUser}
            <span className={classes}>
              {datum.user.data['user_id']}:
            </span>{datum.message}</p>);
        /*jshint ignore:end */
      }
      return (
        /*jshint ignore:start */
        <div>
          {rows} 
        </div>
        /*jshint ignore:end */
      );
    }
  });  
});
