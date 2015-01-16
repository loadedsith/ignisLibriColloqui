define(['react'], function(React) {
  'use strict';
  return React.createClass({
   
    render: function() {
      var imageUrl;
      
      //This is essentailly the same as if(___===undefined){} blocks. getting this.props.data.image.data
      var imageData = (((this.props.data||{}).image||{}).data||{});
      
      if(imageData['is_silhouette'] === true){
        imageUrl = './assets/images/FBProfile.jpg';
      }else{
        imageUrl = imageData.url||'./assets/images/FBProfile.jpg';
      }
      /*jshint ignore:start */
      var styles = {
        backgroundImage:'url(' + imageUrl + ')'
      };
      /* <p>FBID:{this.props.data.facebookId}</p>*/
      /** <p>fetching:{this.props.data.fetching}</p>*/
      // <img src={imageUrl} className="matchImage"/>
      return <div className="matchDisplay" style={styles}>
      </div>
      /*jshint ignore:end */
      
    }
  });
});