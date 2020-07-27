import React, { Suspense, lazy } from "react";
import "./App.scss";
import './styles/index.scss'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// common components
import ErrorBoundry from "./components/shared/error-boundry";

// pages
import Calendar from "./components/pages/calendar/calendar";
const Authorization = lazy(() => import('./components/pages/auth'));
const Registration = lazy(() => import('./components/pages/registration'));
const RecoveryPassword = lazy(() => import('./components/pages/recovery-password'));
const Notification = lazy(() => import('./components/pages/notifications'));
const TodayTimetable = React.lazy(() => import('./components/pages/today-timetable'));
const EventInfo = React.lazy(() => import('./components/pages/single-event-info/single-event-info'));
const ChangePassword = React.lazy(() => import('./components/pages/change-password'));

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
              <Route exact path="/today/:id" component={EventInfo} />
              <Route exact path="/change_password" component={ChangePassword} />

              {/* <Route path="*" component={NotFound} /> */}
            </Switch>
          </div>
        </Suspense>
      </Router>
    </ErrorBoundry>
  );
};

export default App;
