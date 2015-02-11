/* jshint unused: false */
/* exported MYLIST */
define(['react'], function(React) {
  'use strict';
  return React.createClass({
    getRemoteUserFromLocalUserMatches : function(userId) {
      var remoteUser;
      var localUser= this.props.localUser;
      if (localUser.data['user_id'] === userId) {
        return false;
      }
      if (localUser.matches !== undefined) {
        var matchTopics = localUser.matches;
        if (typeof matchTopics === 'object') {
          for (var matchKey in matchTopics) {
            var matches = matchTopics[matchKey]
            if (matches.length > 0) {
              for (var i = matches.length - 1; i >= 0; i--) {
                var match = matches[i];
                if (match.id === userId){
                  return match;
                }
              }
            }
          }
        }
      }

      return false
    },
    render: function() {
      var rows = [];

      var messages = this.props.data;
        /*jshint ignore:start */
      var errorElement = <p>messages failed to load. Sorry!</p>;

      if (messages === undefined) {
        console.log('data is undefined in messages.jsx');
        return errorElement;
      }
        /*jshint ignore:end */
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
