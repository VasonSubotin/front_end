import { connect } from 'react-redux';
import component from '../routes/Login';

import { loginSubmit } from '../modules/auth';

const mapStateToProps = ({ auth }) => ({
  ...auth,
});

export default connect(
  mapStateToProps,
  {
    loginSubmit,
  },
)(component);
