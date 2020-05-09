import { connect } from 'react-redux';
import component from '../routes/Home';

const mapStateToProps = state => ({
  isLoggedIn: state.auth.isLoggedIn,
  user: state.auth.user,
});

export default connect(
  mapStateToProps,
  {},
)(component);
