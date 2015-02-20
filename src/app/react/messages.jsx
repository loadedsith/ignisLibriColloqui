/* jshint unused: false */
/* exported MYLIST */
define(['react', 'strings'], function(React, Strings) {
  'use strict';
  return React.createClass({
    getRemoteUserFromLocalUserMatches : function(userId) {
      var remoteUser;
      var localUser= this.props.localUser;
      if (localUser.data['user_id'] === userId) {
        return false;
      }
      if (localUser.matches !== undefined) {
        var matchInterests = localUser.matches;
        if (typeof matchInterests === 'object') {
          for (var matchKey in matchInterests) {
            var matches = matchInterests[matchKey];
            if (matches.length > 0) {
              for (var i = matches.length - 1; i >= 0; i--) {
                var match = matches[i];
                if (match.id === userId) {
                  return match;
                }
              }
            }
          }
        }
      }
      return false;
    },
    getInitialState: function() {
      return {
        profileDisplayed : false
      };
    },
    profileDisplayClick : function() {
      this.setState({profileDisplayed:!this.state.profileDisplayed});
    },
    render: function() {
      var rows = [];
      var messages = this.props.data;
      var localUser= this.props.localUser;
        /*jshint ignore:start */
      var errorElement = <p>{Strings.messagesFailedToLoad}</p>;

      if (messages === undefined) {
        console.log('data is undefined in messages.jsx');
        return errorElement;
      }
        /*jshint ignore:end */
      var classes = 'user';
      var lastTime;
      for (var messageKey in messages) {
        var datum = messages[messageKey];
        if (datum.user===undefined) {
          continue;
        }

        var userName = 'me';
        var messageIsFromLocalUser;
        this.props.remoteUser = this.getRemoteUserFromLocalUserMatches(datum.user.data['user_id']);
        classes = 'user user-' + datum.user.data['user_id'];
        if (this.props.remoteUser !== false) {
          messageIsFromLocalUser = false;
          userName = this.props.remoteUser.profile.name;
          classes = classes+' remote';
        } else {
          messageIsFromLocalUser = true;
          classes = classes+' local';
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
        if (timeStamp) {
          rows.push(
            <span className='time'>
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
              {userName}:
            </span>&nbsp;
            <span className='message'>
              {datum.message}
            </span>
          </p>
          );
        /*jshint ignore:end */
      }
      var profileImage;

      this.props.remoteUser = this.getRemoteUserFromLocalUserMatches(this.props.room);

      var profile = (this.props.profile || {}); //profile or empty
      if (profile.image !== undefined) {
        if (profile.image.data['is_silhouette'] === true) {
          profile.image.data.url = './assets/images/fbProfile.jpg';
        }
        /*jshint ignore:start */
        profileImage = <img className='profileImage' src={profile.image.data.url}/>
        /*jshint ignore:end */
      }

      var boundClick = function(remoteUser, event) {
        this.props.closeRoom(event, remoteUser.id);
      };

      var profileDisplayed = this.state.profileDisplayed ? 'profileDisplay' : 'profileHide';
      /*jshint ignore:start */
      return (
        <div>
          <div onClick={this.profileDisplayClick} className={("controls ng-click " + profileDisplayed)} >
            {profileImage}
            <span className="close" onClick={boundClick.bind(this, this.props.remoteUser)}>&times;</span>
            <span className="name">
              {(this.props.remoteUser.profile || {}).name || userName || ''}
            </span>
            <div className="profile">
              <div className="row">
                <div className="columns small-4">
                  <label className="right">{Strings.aboutMe}</label>
                </div>
                <div className="columns small-8">
                  <p>{this.props.remoteUser.profile.aboutMe}</p>
                </div>
              </div>
              <div className="row">
                <div className="columns small-4">
                  <label className="right">{Strings.interests}</label>
                </div>
                <div className="columns small-8">
                  <p>{this.props.remoteUser.profile.interests}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="messageWrapper">{rows}</div>
        </div>
            )
      /*jshint ignore:end */

    }
  });
});
