import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import classes from "./Checkout.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";

class Checkout extends Component {
  state = {
    ingredients: { meat: 0, cheese: 0, salad: 0, bacon: 0 },
    totalPrice: 0,
    loading: false
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    for (let param of query.entries()) {
      if (param[0] === "price") {
        this.setState({ totalPrice: +param[1] });
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients });
  }

  cancelOrderHandler = () => {
    this.props.history.goBack();
  };

  orderSubmitHandler = event => {
    event.preventDefault();
    console.log(this.state.ingredients);

    this.setState({ loading: true });

    const data = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: "Jan",
        surName: "Kowalski",
        email: "jan.kowalski@gmail.com",
        phone: "35782255",
        address: {
          city: "Warszawa",
          street: "Warszawska 35"
        },
        deliveryTime: "ASAP"
      }
    };

    axios
      .post("/orders.json", data)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/')
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  render() {
    let checkout = (
      <React.Fragment>
        <div className={classes.Burger}>
          <Burger
            ingredients={this.state.ingredients}
            price={this.state.totalPrice}
          />
        </div>
        <div className={classes.Burger}>
          <h1>Hello</h1>
          <label>Name: </label>
          <input />
          <label>Name: </label>
          <input />
          <label>Name: </label>
          <input />
          <hr />
          <button onClick={this.cancelOrderHandler}>Cancel</button>
          <button onClick={this.orderSubmitHandler}>Order</button>
        </div>
      </React.Fragment>
    );

    if (this.state.loading) {
      checkout = <Spinner />;
    }

    return <div className={classes.Checkout}>{checkout}</div>;
  }
}

export default Checkout;
