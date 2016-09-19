
var OrderBook = React.createClass
({
    getTempData: function()
    {
        var data =  [
                        {
                            instrument: "Phone",
                            price: 600,
                            size: 1,
                            side: "BUY"
                        },
                        {
                            instrument: "Computer",
                            price: 700,
                            size: 1,
                            side: "BUY"
                        }
                    ];
        
        var reactData = data.map(function(item, index)
        {
            return (
                <a href="#" className="list-group-item">
                    <h4 className="list-group-item-heading">{item.instrument}</h4>
                    <p className="list-group-item-text">
                        {item.price}, {item.size}, {item.side}
                    </p>
                </a>
            );
        });
        
        return reactData;
    },
    
    render: function()
    {
        var tempData = this.getTempData();
        
        return (
            <div className="list-group">
                <h3>Order Book</h3>
                {tempData}
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
        if (this.state.instrument && this.state.price && this.state.size && this.state.side)
        {
            console.log(this.state.instrument);
            console.log(this.state.price);
            console.log(this.state.size);
            console.log(this.state.side);
            console.log("yes");
            
        } else
        {
            console.log("something wrong");
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
                <div className="form-group">
                    <button type="submit" className="btn btn-default pull-right">Place Order</button>
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
        if (localStorage && localStorage.getItem("orders"))
        {
            orders = JSON.parse(localStorage.getItem("orders"));
        }
        
        return {orders: orders};
    },
    
    saveOrdersLocally: function()
    {
        if (localStorage)
        {
            var orders = this.state.orders;
            console.log(orders);
            localStorage.setItem("orders", JSON.stringify(orders));
        }
    },
    
    render: function()
    {
        return (
            <div className="container">
                <div className="col-sm-4">
                    <OrderForm
                        
                    />
                </div>
                <div className="column col-sm-4">
                    <OrderBook/>
                </div>
                <div className="column col-sm-4">
                    <h3>Report Matches</h3>
                </div>
            </div>
        );
    }
    
});

React.render(<MatchEngine/>, document.getElementById("reactContainer"));