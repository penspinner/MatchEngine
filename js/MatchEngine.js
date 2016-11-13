var React = require('react');
var ReactDOM = require('react-dom');
var OrderBook = require('./OrderBook');
var OrderForm = require('./OrderForm');
var ReportMatches = require('./ReportMatches');

var MatchEngine = React.createClass
({
    getInitialState: function()
    {
        var orders = [];
        var matchedOrders = [];
        if (localStorage && localStorage.getItem("orders") && localStorage.getItem("matchedOrders"))
        {
            orders = JSON.parse(localStorage.getItem("orders"));
            matchedOrders = JSON.parse(localStorage.getItem("matchedOrders"));
            orders.forEach(function(item)
            {
                item.date = new Date(item.date);
            });
            matchedOrders.forEach(function(item)
            {
                item.date = new Date(item.date);
            });
        }
        
        return {orders: orders, matchedOrders: matchedOrders};
    },
    
    saveLocally: function()
    {
        if (localStorage)
        {
            console.log("save locally");
            var orders = this.state.orders;
            var matchedOrders = this.state.matchedOrders;
            localStorage.setItem("orders", JSON.stringify(orders));
            localStorage.setItem("matchedOrders", JSON.stringify(matchedOrders));
        }
    },
    
    loadTestData: function()
    {
        var orders = this.state.orders;
        if (orders && orders.length == 0)
        {
            orders.unshift({instrument: "TV", price: 600, size: 1, side: "SELL", date: new Date("08/09/2016")});
            orders.unshift({instrument: "Computer", price: 400, size: 3, side: "SELL", date: new Date("08/20/2016")});
            orders.unshift({instrument: "Phone", price: 300, size: 5, side: "BUY", date: new Date("08/23/2016")});
            orders.unshift({instrument: "Phone", price: 500, size: 5, side: "BUY", date: new Date("08/24/2016")});
        }
        this.setState({orders: orders}, this.saveLocally);
    },
    
    clearOrderBook: function()
    {
        this.setState({orders: []}, this.saveLocally);
    },
    
    clearMatchedOrders: function()
    {
        this.setState({matchedOrders: []}, this.saveLocally);
    },
    
    addOrder: function(newOrder)
    {
        var orders = this.state.orders;
        orders.unshift(newOrder);
        this.setState({orders: orders});
    },
    
    placeOrder: function(newOrder)
    {
        var orders = this.state.orders;
        var matchedOrders = this.state.matchedOrders;
        var self = this;
        var tempOrder;
        
        // Find matching reports
        for (var i = orders.length - 1; i >= 0; i--)
        {
            tempOrder = orders[i];
            
            // BUY - New order price must be higher
            if (newOrder.instrument == tempOrder.instrument &&
                newOrder.price >= tempOrder.price &&
                newOrder.size == tempOrder.size &&
                newOrder.side == "BUY" && tempOrder.side == "SELL")
            {
                $.confirm
                ({
                    text: "Your order matched with <h4>" + tempOrder.instrument + "</h4>" 
                            + "<p>Price: $" + tempOrder.price + ", Size: " + tempOrder.size + "<p>"
                            + "<p>Do you want to buy this order?</p>",
                    title: "Report Matched - BUY",
                    confirm: function(button) {
                        var sizeDif = tempOrder.size - newOrder.size;
                        orders.splice(i, 1);
                
                        // Add the report match to matchedOrders list
                        newOrder.price = tempOrder.price;
                        matchedOrders.unshift(newOrder);

                        self.setState({orders: orders, matchedOrders: matchedOrders}, self.saveLocally);
                    },
                    cancel: function(button) {},
                    confirmButton: "Yes",
                    cancelButton: "No",
                    post: true,
                    confirmButtonClass: "btn-success",
                    cancelButtonClass: "btn-default",
                    dialogClass: "modal-dialog modal-sm"
                });
                
                return;
            } 
            // SELL
            else if (newOrder.instrument == tempOrder.instrument &&
                     newOrder.price <= tempOrder.price &&
                     newOrder.size == tempOrder.size &&
                     newOrder.side == "SELL" && tempOrder.side == "BUY")
            {   
                $.confirm
                ({
                    text: "Your order matched with <h4>" + tempOrder.instrument + "</h4>" 
                            + "<p>Price: $" + tempOrder.price + ", Size: " + tempOrder.size + "<p>"
                            + "<p>Do you want to sell this order?</p>",
                    title: "Report Matched - SELL",
                    confirm: function(button) {
                        var sizeDif = tempOrder.size - newOrder.size;
                        orders.splice(i, 1);
                
                        // Add the report match to matchedOrders list
                        matchedOrders.unshift(newOrder);

                        self.setState({orders: orders, matchedOrders: matchedOrders}, self.saveLocally);
                    },
                    cancel: function(button) {},
                    confirmButton: "Yes",
                    cancelButton: "No",
                    post: true,
                    confirmButtonClass: "btn-success",
                    cancelButtonClass: "btn-default",
                    dialogClass: "modal-dialog modal-sm"
                });
                
                return;
            }
        }
        
        // No report match, so add to order book
        this.addOrder(newOrder);
        
        // Save to localStorage
        this.saveLocally();
    },
    
    render: function()
    {
        return (
            <div className="container">
                <div className="col-sm-4">
                    <OrderForm
                        placeOrder={this.placeOrder}
                    />
                    <ul className="text-info">
                        <li>Report matches only when the sizes are the same.</li>
                        <li>The order book and report matches is displayed in most recent order.</li>
                    </ul>
                </div>
                <div className="list-book col-sm-4">
                    <OrderBook
                        orders={this.state.orders}
                        loadTestData={this.loadTestData}
                        clearOrderBook={this.clearOrderBook}
                    />
                </div>
                <div className="list-book col-sm-4">
                    <ReportMatches
                        matchedOrders={this.state.matchedOrders}
                        clearMatchedOrders={this.clearMatchedOrders}
                    />
                </div>
            </div>
        );
    }
    
});

ReactDOM.render(<MatchEngine/>, document.getElementById("reactContainer"));

//window.MatchEngine = MatchEngine;