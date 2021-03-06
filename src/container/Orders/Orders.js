import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-order";
import errorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = this.props.loading ? (
      <Spinner />
    ) : (
      this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          totalPrice={+order.price}
        />
      ))
    );

    return <div> {orders} </div>;
  }
}

export const mapStateToProps = state => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

export const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(
  errorHandler(Orders, axios)
);
