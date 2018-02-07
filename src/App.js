import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

import Loadable from "react-loadable";

const LoadablePerson = Loadable({
  loader: () => import("./Person" /* webpackChunkName: "person" */),
  loading: () => "Loading"
});

class App extends Component {
  state = {
    person: null
  };

  handleClick = async () => {
    const person = await import("./johndoe" /* webpackChunkName: "person" */);
    this.setState({ person });
  };

  render() {
    const { person } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button type="button" onClick={this.handleClick}>
            Cliquer
          </button>
          {person ? <LoadablePerson {...person} /> : null}
        </p>
        <ErrorBoundary>
          <BrokenComponent />
        </ErrorBoundary>
      </div>
    );
  }
}

class ErrorBoundary extends Component {
  state = { error: null };

  componentDidCatch(error) {
    this.setState({ error });
  }

  render() {
    if (this.state.error) {
      return <h1>Something went wrong : {this.state.error}</h1>;
    }

    return this.props.children;
  }
}

class BrokenComponent extends Component {
  state = { broken: false };

  componentDidMount() {
    setTimeout(() => {
      this.setState({ broken: true });
    }, 2000);
  }

  render() {
    if (this.state.broken) {
      throw "Ohoh I am broken";
    }

    return <p>Everything is fine</p>;
  }
}

export default App;
