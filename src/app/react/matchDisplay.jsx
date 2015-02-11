define(['react'], function(React) {
  'use strict';
  return React.createClass({
    getInitialState: function() {
      return {
        'openOrClose':'?',
        'aboutStyles' : {
          height:'0em',
          opacity:'0.3'
        }
      }
    },
    more : function() {
      if (this.state.aboutStyles.opacity === '1') {
        this.state.aboutStyles = {
          height:'0em',
          opacity:'0.3'
        };
        this.state.openOrClose='?';
      } else {
        this.state.aboutStyles = {
          height:'auto',
          opacity:'1'
        };
        this.state.openOrClose='close';
      }
      console.log('bad house mouse');
    },
    render: function() {
      var imageUrl;

      //This is essentailly the same as if(___===undefined){} blocks. getting this.props.data.image.data
      var imageData = (((this.props.data || {}).image || {}).data || {});


      if(imageData['is_silhouette'] === true){
        imageUrl = './assets/images/FBProfile.jpg';
      } else {
        imageUrl = imageData.url||'./assets/images/FBProfile.jpg';
      }
      /*jshint ignore:start */
      var styles = {//JsIgnore because unused
        backgroundImage:'url(' + imageUrl + ')'
      };
      var profile;//JsIgnore because unused
      if(this.props.data!==undefined){
        profile = <div className="userInfo">
          <div className="name">{this.props.data.profile.name}</div>
          <div className="more" onClick={this.more} >{this.state.openOrClose}</div>
          <div className="about" style={this.state.aboutStyles}>{this.props.data.profile.aboutMe}</div>
        </div>;
      }else{
        console.log('profile empty');
        profile = <div className="userInfo">userinfo</div>;
      }

      return <div className='matchDisplay' style={styles}>
        {profile}
      </div>
      /*jshint ignore:end */

    }
  });
});