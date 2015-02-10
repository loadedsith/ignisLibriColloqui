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
      var styles = {
        backgroundImage:'url(' + imageUrl + ')'
      };
      /* <p>FBID:{this.props.data.facebookId}</p>*/
      /** <p>fetching:{this.props.data.fetching}</p>*/
      // <img src={imageUrl} className='matchImage'/>
      var profile;

      if(this.props.data.profile!==undefined){
        profile = <div class="userInfo">
          <div class="name">name{this.props.data.profile.name}</div>
          <div class="about">about{this.props.data.profile.aboutMe}</div>
        </div>;
      }else{
        console.log('profile empty');
        profile = <div class="userInfo">userinfo</div>;
      }

      return <div className='matchDisplay' style={styles}>
        {profile}
      </div>
      /*jshint ignore:end */

    }
  });
});