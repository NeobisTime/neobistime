import React, { Suspense, lazy } from "react";
import "./App.scss";
import './styles/index.scss'
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";

// common components
import ErrorBoundry from "./components/shared/error-boundry";

// pages
import Calendar from "./components/pages/calendar/calendar";
const Authorization = React.lazy(() => import('./components/pages/auth'));
const Registration = React.lazy(() => import('./components/pages/registration'));
const RecoveryPassword = React.lazy(() => import('./components/pages/recovery-password'));
const Notification = React.lazy(() => import('./components/pages/notifications'));
const TodayTimetable = React.lazy(() => import('./components/pages/today-timetable'));

const App: React.FC = () => {
  return (
    <ErrorBoundry>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <div className="main__wrapper">
            <Switch>
              <Route exact path="/" component={Calendar} />
              <Route exact path="/auth" component={Authorization} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/recovery_password" component={RecoveryPassword} />
              <Route exact path="/notifications" component={Notification} />
              <Route exact path="/today" component={TodayTimetable} />

              {/* <Route path="*" component={NotFound} /> */}
            </Switch>
          </div>
        </Suspense>
      </Router>
    </ErrorBoundry>
  );
};

export default App;
