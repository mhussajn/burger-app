import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";

class burgerBuilder extends Component {
  state = { ingredients: { meat: 0, cheese: 0, salad: 0, bacon: 0 }, ingredientsSum: 0 };
  render() {
    return (
      <React.Fragment>
        <Burger ingredients={this.state.ingredients} />
        <div>Controls</div>
      </React.Fragment>
    );
  }
}

export default burgerBuilder;
