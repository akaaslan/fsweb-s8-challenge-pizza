import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import OrderPizza from './screens/OrderPizza';
import Success from './screens/Success';
import Home from './screens/Home';
import LoadingOverlay from './screens/LoadingOverlay';

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const delay = Math.random() * 500 + 100;
    const timeout = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return (
    <>
      {loading && <LoadingOverlay />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/order" component={OrderPizza} />
        <Route path="/success" component={Success} />
      </Switch>
    </>
  );
}

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;