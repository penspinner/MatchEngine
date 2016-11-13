var React = require('react');

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
            $.confirm
            ({
                text: "Instrument must have a name.\nPrice and size must be greater than 0.",
                title: "Warning",
                confirmButton: "Ok",
                confirmButtonClass: "btn-default",
                cancelButtonClass: "none",
                dialogClass: "modal-dialog modal-sm"
            });
        }
    },
    
    render: function()
    {
        return (
            <form id="orderForm" onSubmit={this.placeOrder}>
                <h3>Order Form</h3>
                <div className="form-group">
                    <label htmlFor="instrument">Instrument</label>
                    <input onChange={this.handleInstrumentChange} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input onChange={this.handlePriceChange} type="number" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="size">Size</label>
                    <input onChange={this.handleSizeChange} type="number" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="side">Side</label>
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

module.exports = OrderForm;
// window.OrderForm = OrderForm;