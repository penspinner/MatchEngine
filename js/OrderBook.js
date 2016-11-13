var React = require('react');

var OrderBook = React.createClass
({
    loadTestData: function()
    {
        var self = this;
        $.confirm
        ({
            text: "Do you want to load some test data?",
            title: "Confirmation required",
            confirm: function(button) { self.props.loadTestData(); },
            cancel: function(button) {},
            confirmButton: "Yes",
            cancelButton: "No",
            post: true,
            confirmButtonClass: "btn-success",
            cancelButtonClass: "btn-default",
            dialogClass: "modal-dialog modal-sm"
        });
    },
    
    clearOrderBook: function()
    {
        var self = this;
        $.confirm
        ({
            text: "Are you sure you want to clear the order book?",
            title: "Confirmation required",
            confirm: function(button) { self.props.clearOrderBook(); },
            cancel: function(button) {},
            confirmButton: "Yes",
            cancelButton: "No",
            post: true,
            confirmButtonClass: "btn-danger",
            cancelButtonClass: "btn-default",
            dialogClass: "modal-dialog modal-sm"
        });
    },
    
    convertToReactCode: function(data)
    {
        var reactData = data.map(function(item, index)
        {
            return (
                <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">{item.instrument}</h4>
                    <p className="list-group-item-text">
                        Price: ${item.price} each, Size: {item.size}, {item.side}
                    </p>
                    <p className="list-group-item-text">
                        Date: {item.date.toUTCString()}
                    </p>
                </a>
            );
        });
        
        return reactData;
    },
    
    render: function()
    {
        
        var orders = this.convertToReactCode(this.props.orders);
        
        if (this.props.orders.length == 0)
        {
            orders = (
                <div className="text-muted">
                    There are no orders.
                </div>
            );
        }
        
        return (
            <div className="list-group">
                <div className="pull-right">
                    <button title="Load Test Data" className="btn btn-sm btn-success" onClick={this.loadTestData}>
                        <span className="glyphicon glyphicon-upload"></span>
                    </button>
                    <button title="Clear Order Book" className="btn btn-sm btn-danger" onClick={this.clearOrderBook}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </div>
                <h3>Order Book</h3>
                {orders}
            </div>
        );
    }
});

module.exports = OrderBook;
//window.OrderBook = OrderBook;