/* jshint unused: false */
/* exported MYLIST */
define(['react'], function(React) {
  'use strict';
  return React.createClass({
    render: function() {
      var rows = [];

      var messages = this.props.data;
      var errorElement = <p>messages failed to load. Sorry!</p>;
      
      if (messages === undefined) {
        console.log('data is undefined in messages.jsx');
        /*jshint ignore:start */
        return errorElement;
        /*jshint ignore:end */
      }
      var classes = 'user';
      var lastTime;
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
                classes = classes+' local';
              } else {
                classes = classes+' remote';
              }
            }
          }
        }

        var timeStamp = false;
        var datumTime = new Date(datum.date).toDateString();
        
        if (lastTime === undefined) {
          lastTime = datumTime;
          timeStamp = true;
        }
        if (lastTime !== datumTime) {
          lastTime = datumTime;
          timeStamp = true;
        }
        

        /*jshint ignore:start */
        if(timeStamp){
          rows.push(
            <span className="time">
              {datumTime}
            </span>
          );
        }
        
        rows.push(
          <p 
            className='messageBubble' 
            key={messageKey}
            >
            <span className={classes}>
              {messageIsFromLocalUser?"me":"remoteUserName"}:
            </span>&nbsp;
            <span className="message">
              {datum.message}
            </span>
          </p>
          );
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
