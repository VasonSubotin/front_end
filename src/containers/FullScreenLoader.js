import { connect } from 'react-redux';
import component from '../components/FullScreenLoader';

const mapStateToProps = ({ app: { loading } }) => ({
  loading,
});

export default connect(
  mapStateToProps,
  null,
)(component);
