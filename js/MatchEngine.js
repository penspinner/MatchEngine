
var OrderForm = React.createClass
({
    placeOrder: function()
    {
        
    },
    
    render: function()
    {
        return (
            <div className="orderForm">
                <h3>Order Form</h3>
                <div className="form-group">
                    <label for="instrument">Instrument</label>
                    <input id="instrument" type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="price">Price</label>
                    <input id="price" type="number" className="form-control"/>
                </div>
                <div className="form-group">
                    <label for="size">Size</label>
                    <input id="size" type="number" className="form-control"/>
                </div>
                <div className="form-group">
                    <button id="placeOrder" onClick={} type="submit" className="btn btn-default">Submit</button>
                </div>
            </div>
        );
    }
});

var MatchEngine = React.createClass
({
    getInitialState: function()
    {
        var orders = [];
        if (localStorage && localStorage.orders)
        {
            orders = JSON.parse(localStorage.orders);
        }
        
        return {orders: orders};
    },
    
    saveOrdersLocally: function()
    {
        
    },
    
    render: function()
    {
        return (
            <div className="container">
                <div className="col-xs-4 column">
                    <OrderForm/>
                </div>
                <div className="col-xs-4 column">
                    Everyone
                </div>
                <div className="col-xs-4 column">
                    Another one.
                </div>
            </div>
        );
    }
    
});

React.render(<MatchEngine/>, document.getElementById("reactContainer"));