import React, { Component } from "react";
import Aux from "../Auxy/Aux";
import Modal from "../../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponet, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({ error: error });
      });
    }

    componentWillUnmount(){
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHanlder = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <Aux>
          <Modal show={this.state.error} ordercancel={this.errorConfirmedHanlder}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponet {...this.props} />
        </Aux>
      );
    }
  };
};

export default withErrorHandler;
