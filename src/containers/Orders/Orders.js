import React, { Component } from "react";
import classes from "./Orders.css";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
class Orders extends Component {
  state = { orders: null };

  componentDidMount() {
    axios.get("/orders.json").then(response => {
      console.log(response.data);
      let orders = [];
      for (let order in response.data) {
        orders.push({ ...response.data[order], id: order });
      }
      console.log(orders);
      this.setState({ orders: orders });
    });
  }

  render() {
    let orders = null;

    if (this.state.orders) {
      orders = this.state.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
          customer={order.customer}
        />
      ));
    }

    return <div className={classes.Orders}>{orders}</div>;
  }
}

export default Orders;
