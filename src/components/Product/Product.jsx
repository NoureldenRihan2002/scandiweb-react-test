import React, { Component } from "react";
import style from "./Product.module.css";
import { connect } from "react-redux";
import AddToCart from "../AddToCart/AddToCart";
import Heart from "../Heart/Heart";
import { checkAttributes } from "../queries/queries";

class Product extends Component {
  state = {
    data: [],
  };

  setCurrency = (currency) => {
    let chosenCurrency = "";
    switch (currency) {
      default:
        chosenCurrency = this.props.data.prices.filter(
          (item) => item.currency.label === this.props.currency
        );
        return `${this.props.currencySymbol}${chosenCurrency[0].amount}`;
    }
  };

  getData = async () => {
    let temp = await checkAttributes(this.props.data.id);
    this.setState({
      data: temp,
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <div className={style.product}>
        <div className={style.imgHolder}>
          <img
            className={style.productImg}
            src={this.props.data.gallery[0]}
            alt={this.props.data.name}
          />
          {this.props.data.inStock ? (
            <React.Fragment>
              <AddToCart
                productData={this.props.data}
                data={this.state.data}
                id={this.props.data.id}
              />
              <Heart />
            </React.Fragment>
          ) : (
            ""
          )}
        </div>
        <h3 className={style.productName}>{this.props.data.name}</h3>
        <h4 className={style.productPrice}>
          {this.setCurrency(this.props.currency)}
        </h4>
        {!this.props.data.inStock ? (
          <div className={style.disabled}>
            <h2 className={style.disabledTitle}>Out Of Stock</h2>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const data = {
    ...state.centralState,
  };

  const currencySymbol = data.currencySymbol;
  const currency = data.currencyLabel;

  return { currency, currencySymbol };
};

export default connect(mapStateToProps)(Product);
