define(['react'], function(React) {
  'use strict';
  return React.createClass({
    render: function() {
      var imageUrl;
      try{
        imageUrl = this.props.data.image.data.url;
      }catch(e) {
        imageUrl = './assets/images/FBProfile.jpg';
      }
      /*jshint ignore:start */
      /* <p>FBID:{this.props.data.facebookId}</p>*/
      /** <p>fetching:{this.props.data.fetching}</p>*/
      return <div>
        <img src={imageUrl} className="matchImage"/>
      </div>
      /*jshint ignore:end */
      
    }
  });
});