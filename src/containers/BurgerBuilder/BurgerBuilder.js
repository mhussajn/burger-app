import React, { Component } from "react";
import axios from "../../axios-orders";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";

const PRICES = { meat: 1, cheese: 0.5, salad: 0.3, bacon: 0.7 };

class burgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 1.5,
    ingredientsSum: 0,
    purchasing: false,
    loading: false
  };

  componentDidMount() {
    axios.get("https://burger-app-db66f.firebaseio.com/ingredients.json").then(response => {
      console.log(response);
      this.setState({ ingredients: response.data });
    });
  }

  addIngredientHandler = ingredientType => {
    const ingredients = { ...this.state.ingredients };
    ingredients[ingredientType] += 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + PRICES[ingredientType];
    const sum = this.state.ingredientsSum + 1;
    this.setState({
      ingredients: ingredients,
      totalPrice: newPrice,
      ingredientsSum: sum
    });
  };

  removeIngredientHandler = ingredientType => {
    const ingredients = { ...this.state.ingredients };
    ingredients[ingredientType] -= 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - PRICES[ingredientType];
    const sum = this.state.ingredientsSum - 1;
    this.setState({
      ingredients: ingredients,
      totalPrice: newPrice,
      ingredientsSum: sum
    });
  };

  orderClickedHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };

  orderConfirmedHandler = () => {
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
        this.setState({ loading: false, purchasing: false });
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  render() {
    let orderSummary = null;

    let burger = <Spinner />;

    if (this.state.ingredients) {
      burger = (
        <React.Fragment>
          <Burger
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
          />
          <BuildControls
            orderClicked={this.orderClickedHandler}
            ingredients={this.state.ingredients}
            addIngredient={ingredientType =>
              this.addIngredientHandler(ingredientType)
            }
            removeIngredient={ingredientType =>
              this.removeIngredientHandler(ingredientType)
            }
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          cancel={this.orderClickedHandler}
          confirm={this.orderConfirmedHandler}
          ingredients={this.state.ingredients}
        />
      );
    }

    if (this.state.loading) {
      console.log("loading");
      orderSummary = <Spinner />;
    }

    return (
      <React.Fragment>
        <Backdrop
          click={this.orderClickedHandler}
          show={this.state.purchasing}
        />
        <Modal show={this.state.purchasing}>{orderSummary}</Modal>
        {burger}
      </React.Fragment>
    );
  }
}

export default burgerBuilder;
