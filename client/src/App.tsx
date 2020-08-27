import React, { Suspense, lazy } from "react";
import "./App.scss";
import './styles/index.scss'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// common components
import ErrorBoundry from "./components/shared/error-boundry";

// pages
import Calendar from "./components/pages/calendar/calendar";
import Spinner from "./components/shared/spinner/spinner";
const Authorization = lazy(() => import('./components/pages/auth'));
const Registration = lazy(() => import('./components/pages/registration'));
const RecoveryPassword = lazy(() => import('./components/pages/recovery-password'));
const ChangePassword = lazy(() => import('./components/pages/recovery-password/change-password'));
const Notification = lazy(() => import('./components/pages/notifications'));
const TodayTimetable = React.lazy(() => import('./components/pages/today-timetable'));
const EventInfo = React.lazy(() => import('./components/pages/single-event-info/single-event-info'));
const ChangePersonalData = React.lazy(() => import('./components/pages/change-personal-data'));
const AdminStat = React.lazy(() => import('./components/pages/admin/admin-statistics'));
const PersonalOffice = React.lazy(() => import('./components/pages/person-cabinet/person-cabinet'));
const EndEvents = React.lazy(() => import('./components/pages/admin/admin-end-events/admin-end-events'));
const EndEventInfo = React.lazy(() => import('./components/pages/admin/admin-end-events/table/end-event-info'));
const CreateEventPage = React.lazy(() => import('./components/pages/admin/admin-create-event'));
const EditEventsPage = React.lazy(() => import('./components/pages/admin/admin-edit-events'));
const RoomsList = React.lazy(() => import('./components/pages/rooms/rooms-list'));
const RoomsEvent = React.lazy(() => import('./components/pages/rooms/rooms-event'));

const App: React.FC = () => {
  return (
    <ErrorBoundry>
      <Router>
        <Suspense fallback={<Spinner />} >
          <div className="main__wrapper">
            <Switch>
              <Route exact path="/" component={Calendar} />
              <Route exact path="/auth" component={Authorization} />
              <Route exact path="/registration" component={Registration} />
              <Route exact path="/recovery_password" component={RecoveryPassword} />
              <Route exact path="/change_password" component={ChangePassword} />
              <Route exact path="/notifications" component={Notification} />
              <Route exact path="/today" component={TodayTimetable} />
              <Route exact path="/today/:id" component={EventInfo} />
              <Route exact path="/change_personal_data" component={ChangePersonalData} />
              <Route exact path="/personal_office" component={PersonalOffice} />
              <Route exact path="/rooms" component={RoomsList} />
              <Route exact path="/rooms/:id" component={RoomsEvent} />
              <Route exact path="/lead_admin" component={AdminStat} />
              <Route exact path="/lead_admin/end_events" component={EndEvents} />
              <Route exact path="/lead_admin/end_event/:id" component={EndEventInfo} />
              <Route exact path="/lead_admin/create_event" component={CreateEventPage} />
              <Route exact path="/lead_admin/create_event/:id" component={CreateEventPage} />
              <Route exact path="/lead_admin/all_events" component={EditEventsPage} />

              {/* <Route path="*" component={NotFound} /> */}
            </Switch>
          </div>
        </Suspense>
      </Router>
    </ErrorBoundry>
  );
};

export default App;
