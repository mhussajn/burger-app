import React, { Component } from "react";
import { connect } from "react-redux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/OrderSummary/OrderSummary";
import Backdrop from "../../components/UI/Backdrop/Backdrop";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actionCreators from "../../store/actions/index";

class burgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  orderClickedHandler = () => {
    this.setState({ purchasing: !this.state.purchasing });
  };

  orderConfirmedHandler = () => {
    this.props.history.push("/checkout");
  };

  render() {
    let orderSummary = null;

    let burger = <Spinner />;

    if (this.props.ingredients) {
      burger = (
        <React.Fragment>
          <div style={{ width: "500px", height: "500px", margin: "10px auto" }}>
            <Burger
              price={this.props.totalPrice}
              ingredients={this.props.ingredients}
            />
          </div>
          <BuildControls
            orderClicked={this.orderClickedHandler}
            ingredients={this.props.ingredients}
            addIngredient={ingredientType =>
              this.props.onAddIngredient(ingredientType)
            }
            removeIngredient={ingredientType =>
              this.props.onRemoveIngredient(ingredientType)
            }
          />
        </React.Fragment>
      );
      orderSummary = (
        <OrderSummary
          cancel={this.orderClickedHandler}
          confirm={this.orderConfirmedHandler}
          ingredients={this.props.ingredients}
        />
      );
    }

    // if (this.state.loading) {
    //   console.log("loading");
    //   orderSummary = <Spinner />;
    // }

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

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingredientType =>
      dispatch(actionCreators.addIngredient(ingredientType)),
    onRemoveIngredient: ingredientType =>
      dispatch(actionCreators.removeIngredient(ingredientType)),
    onInitIngredients: () => dispatch(actionCreators.setIngredientsAsync())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(burgerBuilder);
