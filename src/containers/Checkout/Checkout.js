import React, { Component } from "react";
import Burger from "../../components/Burger/Burger";
import classes from "./Checkout.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import Input from "../../components/UI/Input/Input";

import {connect} from 'react-redux';

class Checkout extends Component {
  state = {
    orderForm: {
      name: {
        label: "Name",
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Name" },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      city: {
        label: "City",
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your City" },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        label: "Street",
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Street" },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipcode: {
        label: "Zip Code",
        elementType: "input",
        elementConfig: { type: "text", placeholder: "Your Zip Code" },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6
        },
        valid: false,
        touched: false
      },
      email: {
        label: "E-mail",
        elementType: "input",
        elementConfig: { type: "email", placeholder: "Your E-mail address" },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      phone: {
        label: "Phone",
        elementType: "input",
        elementConfig: { type: "tel", placeholder: "Your Phone number" },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      other: {
        label: "Other",
        elementType: "textarea",
        elementConfig: { type: "text", placeholder: "Anything else?" },
        value: "",
        validation: {
          required: false
        },
        valid: true,
        touched: false
      }
    },
    loading: false
  };
  
  checkValidity(value, validation) {
    let valid = true;
    if (validation.required) {
      valid = value.trim() !== "" && valid;
    }
    if (validation.minLength) {
      valid = value.length >= validation.minLength && valid;
    }
    if (validation.maxLength) {
      valid = value.length <= validation.maxLength && valid;
    }
    return valid;
  }

  cancelOrderHandler = () => {
    this.props.history.goBack();
  };

  orderSubmitHandler = event => {
    event.preventDefault();
    console.log(this.props.ingredients);

    this.setState({ loading: true });

    const data = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: this.state.orderForm.name.value,
        address: {
          city: this.state.orderForm.city.value,
          street: this.state.orderForm.street.value,
          zipcode: this.state.orderForm.zipcode.value
        },
        email: this.state.orderForm.email.value,
        phone: this.state.orderForm.phone.value,
        other: this.state.orderForm.other.value
      }
    };

    axios
      .post("/orders.json", data)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push("/");
        console.log(response);
      })
      .catch(error => console.log(error));
  };

  onChangeHandler = (event, inputElement) => {
    console.log(inputElement + ": " + event.target.value);
    const newOrderForm = { ...this.state.orderForm };
    const newOrderElement = { ...newOrderForm[inputElement] };
    newOrderElement.value = event.target.value;
    newOrderElement.valid = this.checkValidity(
      newOrderElement.value,
      newOrderElement.validation
    );
    newOrderElement.touched = true;
    newOrderForm[inputElement] = newOrderElement;
    this.setState({ orderForm: newOrderForm });
  };

  render() {
    let inputs = Object.keys(this.state.orderForm).map(element => {
      const inputElement = this.state.orderForm[element];
      return (
        <Input
          touched={inputElement.touched}
          valid={inputElement.valid}
          changed={event => this.onChangeHandler(event, element)}
          key={element}
          label={inputElement.label}
          elementType={inputElement.elementType}
          elementConfig={inputElement.elementConfig}
          value={inputElement.value}
        />
      );
    });

    let formValid = Object.keys(this.state.orderForm).every(
      element => this.state.orderForm[element].valid
    );

    let form = (
      <form onSubmit={this.orderSubmitHandler}>
        {inputs}
        <button onClick={this.cancelOrderHandler}>Cancel</button>
        <button disabled={!formValid}>Order</button>
      </form>
    );

    let checkout = (
      <React.Fragment>
        <div className={classes.Burger}>
          <Burger
            ingredients={this.props.ingredients}
            price={this.props.totalPrice}
          />
        </div>
        <div className={classes.Burger}>
          <h2>Fill out the form</h2>
          {form}
        </div>
      </React.Fragment>
    );

    if (this.state.loading) {
      checkout = <Spinner />;
    }

    return <div className={classes.Checkout}>{checkout}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  }
}

export default connect(mapStateToProps)(Checkout);




