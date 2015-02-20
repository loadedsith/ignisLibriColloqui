define(['react'], function(React) {
  'use strict';
  return React.createClass({
    render: function() {
      //This is essentailly the same as if (___===undefined) {} blocks. getting this.props.data.image.data
      var name = '';
      if (this.props.data!==undefined) {
        name = this.props.data.name;
      }

      /*jshint ignore:start */
      return <div className='topCard'>
        <div className='name'>{name}</div>
      </div>
      /*jshint ignore:end */

    }
  });
});