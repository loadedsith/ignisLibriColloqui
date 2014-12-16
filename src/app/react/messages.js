
var MYLIST = React.createClass({
  render: function() {
    var data = this.props.data;

    var rows = data.map(function (datum) {
      return <p key={datum.key}>{datum.name}:{datum.message}</p>;
    })

    return (
      <pre className="">
        {rows} 
      </pre>
    );
  }
});