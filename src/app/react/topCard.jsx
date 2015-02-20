define(['react', 'strings'], function(React, Strings) {
  'use strict';
  return React.createClass({
    render: function() {
      //This is essentailly the same as if (___===undefined) {} blocks. getting this.props.data.image.data
      var name = '';
      var size = '';
      if (this.props.data!==undefined) {
        name = this.props.data.name;
      }
      if (this.props.data!==undefined) {
        size = this.props.data.size;
      }

      /*jshint ignore:start */
      return <div className='topCard'>
        <div className='name'>{name}</div>
        <div className='size'>
          <label>{Strings.count}</label>
          <p>{size}</p>
        </div>
      </div>
      /*jshint ignore:end */

    }
  });
});