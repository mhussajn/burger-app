import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';

const PRICES = { meat: 1, cheese: 0.5, salad: 0.3, bacon: 0.7 };

class burgerBuilder extends Component {
  state = {
    ingredients: { meat: 0, cheese: 0, salad: 0, bacon: 0 },
    totalPrice: 1.5,
    ingredientsSum: 0,
    purchasing: false
  };

  addIngredientHandler = ingredientType => {
    const ingredients = { ...this.state.ingredients };
    ingredients[ingredientType] += 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + PRICES[ingredientType];
    const sum = this.state.ingredientsSum + 1;
    this.setState({ ingredients: ingredients, totalPrice: newPrice, ingredientsSum: sum });
  };

  removeIngredientHandler = ingredientType => {
    const ingredients = { ...this.state.ingredients };
    ingredients[ingredientType] -= 1;
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - PRICES[ingredientType];
    const sum = this.state.ingredientsSum - 1;
    this.setState({ ingredients: ingredients, totalPrice: newPrice, ingredientsSum: sum });
  };

  orderClickedHandler = () => {
    this.setState({purchasing: !this.state.purchasing})
  }

  render() {
    return (
      <React.Fragment>
        <Backdrop click={this.orderClickedHandler} show={this.state.purchasing}/>
        <Modal show={this.state.purchasing}><OrderSummary click={this.orderClickedHandler} ingredients={this.state.ingredients}/></Modal>
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
  }
}

export default burgerBuilder;
