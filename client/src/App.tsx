import React, {Suspense, lazy} from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ErrorBoundry from "./components/shared/error-boundry";

import Authorization from "./components/pages/auth/auth";

const App: React.FC = () => {
  return (
    <ErrorBoundry>
      <Authorization />
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="main__wrapper">
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}

              {/* <Route path="*" component={NotFound} /> */}
            </Switch>
          </div>
        </Suspense>
      </Router>
    </ErrorBoundry>
  );
};

export default App;
