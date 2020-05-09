import { connect } from "react-redux";
import component from "../routes/Console";

import { logoutSubmit } from "../modules/auth";
import { eventsRequest } from "../modules/console";

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  tokenAccess: state.auth.tokenAccess,
  user: state.auth.user,
  eventsList: state.console.events.byId,
  eventsLoading: state.console.events.loading,
  eventsError: state.console.events.error,
  logs: state.console.logs
});

export default connect(
  mapStateToProps,
  {
    logoutSubmit,
    fetchEvents: eventsRequest
  }
)(component);
