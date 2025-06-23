import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import OrderPizza from './screens/OrderPizza'
import Success from './screens/Success' 

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={OrderPizza} />
        <Route path="/success" component={Success} />
        {/* İstersen 404 için bir <Route> daha ekleyebilirsin */}
      </Switch>
    </Router>
  );
};

export default App;
