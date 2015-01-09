/* jshint unused: false */
define(['react'],function (React) {
   return  React.createClass({
     render: function() {
       'use strict';
    
       var data = this.props.data;
       var handelClick = function (a,b,c,d) {
         debugger;

       };
       if (data !== undefined) {
         var rows = data.map(function (datum) {
           /*jshint ignore:start */
           return <li className='card' onClick={handelClick} key={datum.key}> Cards{datum} </li>;
           /*jshint ignore:end */
         });
       }
    
       return (
         /*jshint ignore:start */
         <pre className="">Cards2
           {rows} 
         </pre>
         /*jshint ignore:end */
      );
    }
  });  
});
