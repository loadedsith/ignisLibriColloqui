define(['react'],function (React) {
  'use strict';
  return React.createClass({
    render: function () {
      var imageUrl;
      try{
        imageUrl = this.props.data.image.data.url;
      }catch(e){
        imageUrl = './assets/images/FBProfile.jpg';
      }
      /*jshint ignore:start */
      return <div>
      <p>FBID:{this.props.data.facebookId}</p>
      <p>image: <img src={imageUrl}/></p>
      <p>fetching:{this.props.data.fetching}</p>
      </div>
      /*jshint ignore:end */
      
    }
  });
});