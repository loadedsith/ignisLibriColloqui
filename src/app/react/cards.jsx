/* jshint unused: false */
define(['react'],function (React) {
   return  React.createClass({
     handleClick: function (event) {
       console.log('event');
       debugger;
     },
     render: function() {
       'use strict';
       debugger;
    
       var data = this.props.data;

       if (data !== undefined) {
         var rows = data.map(function (datum) {
           /*jshint ignore:start */
           return <li class='card' key={datum.key}> Cards{datum} </li>;
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
