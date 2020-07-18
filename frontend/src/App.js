import React from "react";
import "./App.css";
import Header from "./components/HOC/Header";
import ProductComponent from "./components/Routes/ProductComponent";
import CartComponent from "./components/Routes/CartComponent";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Route path={["*"]} render={renderProps => <Header></Header>} />

      <div className="App-body">
        <Switch>
          <Route
            exact
            path={["/"]}
            render={renderProps => <ProductComponent />}
          />
          <Route
            exact
            path={["/cart"]}
            render={renderProps => <CartComponent />}
          />
        </Switch>
      </div>
    </div>
  );
}

export default App;
