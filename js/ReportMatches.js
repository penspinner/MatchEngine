var React = require('react');

var ReportMatches = React.createClass
({
    clearMatchedOrders: function()
    {
        var self = this;
        $.confirm
        ({
            text: "Are you sure you want to clear the report matches?",
            title: "Confirmation required",
            confirm: function(button) { self.props.clearMatchedOrders(); },
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
                        Price: ${item.price} each, Size: {item.size}
                    </p>
                    <p className="list-group-item-text">
                        Date {item.side == "BUY" ? "BOUGHT" : "SOLD"}: {item.date.toString()}
                    </p>
                </a>
            );
        });
        
        return reactData;
    },
    
    render: function()
    {
        var matchedOrders = this.convertToReactCode(this.props.matchedOrders);
        
        if (this.props.matchedOrders.length == 0)
        {
            matchedOrders = (
                <div className="text-muted">
                    There are no matched reports.
                </div>
            );
        }
        
        return (
            <div className="list-group">
                <div className="pull-right">
                    <button title="Clear Report Matches" className="btn btn-sm btn-danger" onClick={this.clearMatchedOrders}>
                        <span className="glyphicon glyphicon-remove"></span>
                    </button>
                </div>
                <h3>Report Matches</h3>
                {matchedOrders}
            </div>
        );
    }
});

module.exports = ReportMatches;
// window.ReportMatches = ReportMatches;