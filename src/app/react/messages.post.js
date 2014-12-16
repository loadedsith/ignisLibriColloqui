
var MYLIST = React.createClass({displayName: 'MYLIST',
  render: function() {
    var data = this.props.data;

    var rows = data.map(function (datum) {
      return React.createElement("p", null, datum.name, ":", datum.message);
    })

    return (
      React.createElement("pre", {className: ""}, 
        rows
      )
    );
  }
});