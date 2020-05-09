import React from "react";
import propTypes from "prop-types";

import Map from "./Map";
import Logs from "./Logs";
import CardEvent from "../../components/CardEvent";

import { ptUser } from "../../modules/auth";

import s from "./styles.module.scss";

export default class RouteConsole extends React.Component {
  static propTypes = {
    tokenAccess: propTypes.string.isRequired,
    history: propTypes.object.isRequired,
    logoutSubmit: propTypes.func.isRequired,
    isLoggedIn: propTypes.bool.isRequired,
    user: ptUser.isRequired,

    eventsList: propTypes.object.isRequired,
    logs: propTypes.object.isRequired,
    eventsLoading: propTypes.bool.isRequired,
    eventsError: propTypes.string.isRequired,
    fetchEvents: propTypes.func.isRequired,

    center: propTypes.object,
    zoom: propTypes.number
  };

  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };

  state = {
    msoc: 450
  };

  componentDidMount() {
    setTimeout(() => {
      this.props.fetchEvents({ msoc: this.state.msoc });
    }, 700);

    const { history, isLoggedIn } = this.props;
    if (!isLoggedIn) {
      history.replace("/login");
    }
  }

  handlePressLogout = () => {
    this.props.logoutSubmit({ history: this.props.history, gapi: window.gapi });
  };

  renderEventsList = () => {
    const { eventsList, eventsError, eventsLoading } = this.props;

    if (eventsLoading) {
      return <p>loading</p>;
    }

    if (eventsError.length) {
      return <p>Error occurred during events loading. ({eventsError})</p>;
    }

    if (!Object.keys(eventsList).length) {
      return <p>No events at this moment</p>;
    }

    return Object.keys(eventsList).map(this.renderEventItem);
  };

  renderEventItem = eventId => {
    const { eventsList } = this.props;
    return <CardEvent key={eventId} {...eventsList[eventId]} />;
  };

  handleLoadEventsPress = () =>
    this.props.fetchEvents({ msoc: this.state.msoc });

  handleMsocChange = e => {
    const { value } = e.target;

    this.setState({ msoc: Number(value) });
  };

  render() {
    const { tokenAccess, user, logs } = this.props;
    const lastLog = logs[logs.length - 1];
    return (
      <div className={s.container}>
        <div className={s.columnLeft}>
          <h1 className={s.text}>Hello, {user.name}</h1>
          <p className={s.text}>
            <b>Email </b>
            {user.email}
          </p>
          <b>Token access</b>
          <p className={`${s.text} ${s.textToken}`}>{tokenAccess}</p>
          <b>Events list</b>
          <div>
            <button onClick={this.handleLoadEventsPress}>Refresh</button>
            <input
              type="number"
              onChange={this.handleMsocChange}
              value={this.state.msoc}
              min={60}
            />
          </div>
          <div className={s.containerEvents}>{this.renderEventsList()}</div>
          <a className={s.button} onClick={this.handlePressLogout}>
            Logout
          </a>
        </div>
        <div className={s.columnRight}>
          <div className={s.containerMap}>
            <Map data={lastLog} />
          </div>
          <Logs data={logs} />
        </div>
      </div>
    );
  }
}
