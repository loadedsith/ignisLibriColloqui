define(['react'], function(React) {
  'use strict';
  return React.createClass({

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
          <div className="name">name{this.props.data.profile.name}</div>
          <div className="about">about{this.props.data.profile.aboutMe}</div>
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