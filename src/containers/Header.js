import { connect } from 'react-redux';
import component from '../components/Header';

const mapStateToProps = ({ auth: { isLoggedIn } }) => ({
  isLoggedIn,
});

export default connect(
  mapStateToProps,
  null,
)(component);
