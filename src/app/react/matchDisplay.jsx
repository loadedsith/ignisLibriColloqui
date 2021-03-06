define(['react', 'strings'], function(React, Strings) {/*jshint ignore:line */
  'use strict';
  return React.createClass({
    getInitialState: function() {
      return {
        'openOrClose': Strings.open,
        'aboutStyles': {
          height: '0em',
          opacity: '0.3'
        }
      };
    },
    more : function() {
      if (this.state.aboutStyles.opacity === '1') {
        this.setState({
          aboutStyles: {
            height:'0em',
            opacity:'0.3'
          },
          openOrClose: Strings.open
        });
      } else {
        this.setState({
          aboutStyles: {
            height:'auto',
            opacity:'1'
          },
          openOrClose: Strings.close
        });
      }

    },
    render: function() {
      var defaultImageUrl = './assets/images/FBProfile.jpg';
      var imageUrl = defaultImageUrl;

      //looking for this.props.data.profile.image.data.url, and else fail silently
      var hasThisPropsDataProfileImageDataUrl = (((
        (this.props.data||{})
        .profile || {})
        .image || {})
        .data || {})
        .url !== undefined;

      if (hasThisPropsDataProfileImageDataUrl) {
        //Local User Image, techically this shouldnt happen, cuz who has their own card in their stack? lol
        imageUrl = this.props.data.profile.image.data.url;
      }

      //This is essentailly the same as if (___===undefined) {} blocks. getting this.props.data.image.data
      if ((this.props.profile || {}).fetching !== undefined) {
        //Remote User Image
        if ((this.props.profile.image || {}).data !== undefined) {
          var imageData = this.props.profile.image.data;
          if (imageData['is_silhouette'] !== true) {
            imageUrl = imageData.url || defaultImageUrl;
          }
        }
      }

      /*jshint ignore:start */
      if (((this.props.profile || {}).image || {}).data !== undefined) {
        //Local User Image, techically this shouldnt happen, cuz who has their own card in their stack? lol
        imageUrl = this.props.profile.image.data.url;
      }


      var styles = {//JsIgnore because unused
        backgroundImage:'url(' + imageUrl + ')',
        backgroundSize:'cover',
        backgroundPosition:'center center'
      };
      var getInterests = function(userProfile, cardProfile) {
        var interests = [];

        if (userProfile.interests !== undefined && cardProfile.interests !== undefined) {
          if (angular.equals(cardProfile.interests, userProfile.interests)) {
            return cardProfile.interests;
          }
          for (var i = userProfile.interests.length - 1; i >= 0; i--) {
            var userInterest = userProfile.interests[i];
            for (var ii = cardProfile.interests.length - 1; ii >= 0; ii--) {
              var cardInterest = cardProfile.interests[ii];
              if (cardInterest === userInterest) {
                if (interests.indexOf(cardInterest) === -1) {
                  interests.push(cardInterest);
                }
              }
            }
          }
        }
        return interests;
      }
      var profile;//JsIgnore because unused
      if (this.props.data!==undefined) {
        var matches;
        if (this.props.userProfile !== undefined) {
          var interests = getInterests(this.props.userProfile, this.props.data.profile);
        }
        profile = <div className="userInfo">
          <div className="name">{this.props.data.profile.name}</div>
          <div className="more" onClick={this.more}>{this.state.openOrClose}</div>
          <div className="about" style={this.state.aboutStyles}>
            <div className="row">
              <div className="small-12 medium-4 columns">
                <p>{Strings.interests}</p>
              </div>
              <div className="small-12 medium-8 columns">
                <p>{interests}</p>
              </div>
            </div>
            <div className="row">
              <div className="small-12 medium-4 columns">
                <p>{Strings.aboutMe}</p>
              </div>
              <div className="small-12 medium-8 columns">
                {this.props.data.profile.aboutMe}
              </div>
            </div>
          </div>
        </div>;
      } else {
        profile = <div className="userInfo">{Strings.emptyUserInfo}</div>;
      }

      return <div className='matchDisplay' style={styles}>
      {profile}
      </div>
      /*jshint ignore:end */

    }
  });
});