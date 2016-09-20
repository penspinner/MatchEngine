var ReportMatches = React.createClass
({
    clearMatchedOrders: function()
    {
        if (confirm("Are you sure you want to clear all the report matches?"))
            this.props.clearMatchedOrders();
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
                <button className="btn btn-danger pull-right" onClick={this.clearMatchedOrders}>Clear</button>
                <h3>Report Matches</h3>
                {matchedOrders}
            </div>
        );
    }
});

var OrderBook = React.createClass
({
    clearOrderBook: function()
    {
        if (confirm("Are you sure you want to clear the order book?"))
            this.props.clearOrderBook();
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
                <button className="btn btn-danger pull-right" onClick={this.clearOrderBook}>Clear</button>
                <h3>Order Book</h3>
                {orders}
            </div>
        );
    }
});

var OrderForm = React.createClass
({
    getInitialState: function()
    {
        return  {
                    instrument: "",
                    price: 0,
                    size: 0,
                    side: "BUY"
                };
    },
    
    handleInstrumentChange: function(e)
    {
        this.setState({instrument: e.target.value});
    },
    
    handlePriceChange: function(e)
    {
        this.setState({price: e.target.value});
    },
    
    handleSizeChange: function(e)
    {
        this.setState({size: e.target.value});
    },
    
    handleSideChange: function(e)
    {
        this.setState({side: e.target.value});
    },
    
    placeOrder: function(e)
    {
        e.preventDefault();
        console.log("Place Order");
        if (this.state.instrument && this.state.price > 0 && this.state.size > 0 && this.state.side)
        {
            var tempOrder = {
                                instrument: this.state.instrument,
                                price: this.state.price,
                                size: this.state.size,
                                side: this.state.side,
                                date: new Date()
                            };
            this.props.placeOrder(tempOrder);
        } else
        {
            alert("Instrument must have a name.\nPrice and size must be greater than 0.")
        }
    },
    
    render: function()
    {
        return (
            <form id="orderForm" onSubmit={this.placeOrder}>
                <h3>Order Form</h3>
                <div className="form-group">
                    <label for="instrument">Instrument</label>
                    <input onChange={this.handleInstrumentChange} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="price">Price</label>
                    <input onChange={this.handlePriceChange} type="number" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="size">Size</label>
                    <input onChange={this.handleSizeChange} type="number" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="side">Side</label>
                    <select onChange={this.handleSideChange} className="form-control">
                        <option>BUY</option>
                        <option>SELL</option>
                    </select>
                </div>
                <div className="form-group text-right">
                    <button type="submit" className="btn btn-default">Place Order</button>
                </div>
            </form>
        );
    }
});

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
        
        if (orders.length == 0)
        {
            orders.unshift({instrument: "Computer", price: 400, size: 3, side: "SELL", date: new Date("08/20/2016")});
            orders.unshift({instrument: "Phone", price: 300, size: 5, side: "BUY", date: new Date("08/23/2016")});
            orders.unshift({instrument: "Phone", price: 500, size: 5, side: "BUY", date: new Date("08/24/2016")});
        }
        
        return {orders: orders, matchedOrders: matchedOrders};
    },
    
//    componentWillUnmount: function()
//    {
//        this.saveLocally();
//    },
    
    saveLocally: function()
    {
        if (localStorage)
        {
            console.log("save locally")
            var orders = this.state.orders;
            var matchedOrders = this.state.matchedOrders;
            console.log(orders, matchedOrders);
            localStorage.setItem("orders", JSON.stringify(orders));
            localStorage.setItem("matchedOrders", JSON.stringify(matchedOrders));
        }
    },
    
    clearOrderBook: function()
    {
        this.setState({orders: []});
        this.saveLocally();
    },
    
    clearMatchedOrders: function()
    {
        this.setState({matchedOrders: []});
        this.saveLocally();
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
        var matchingIndeces = [];
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
                alert("Report matched BUY");
                
                var sizeDif = tempOrder.size - newOrder.size;
                
                // This means someone bought all quantities of the order
//                if (sizeDif == 0)
//                {
//                    // Delete the order from the order book
//                    orders.splice(i, 1);
//                } else
//                {
//                    // Change the size of the order
//                    orders[i].size = sizeDif;
//                }
                orders.splice(i, 1);
                
                // Add the report match to matchedOrders list
                newOrder.price = tempOrder.price;
                matchedOrders.unshift(newOrder);
                
                this.setState({orders: orders, matchedOrders: matchedOrders});
                this.saveLocally();
                return;
            } 
            // SELL
            else if (newOrder.instrument == tempOrder.instrument &&
                     newOrder.price <= tempOrder.price &&
                     newOrder.size == tempOrder.size &&
                     newOrder.side == "SELL" && tempOrder.side == "BUY")
            {
                alert("Report matched SELL");
                
                var sizeDif = newOrder.size - tempOrder.size;
                
                orders.splice(i, 1);
                
                matchedOrders.unshift(newOrder);
                this.setState({orders: orders, matchedOrders: matchedOrders});
                this.saveLocally();
                return;
//                matchingIndeces.push(i);
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

React.render(<MatchEngine/>, document.getElementById("reactContainer"));