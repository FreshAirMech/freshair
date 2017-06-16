import { connect } from 'react-redux';
import component from './component';
import { requestLogout, requestSession } from 'actions/auth';

const mapStateToProps = (state) => {
  return {
  	firstName: state.user.profile.firstName,
    username: state.user.profile.username,
    photoURL: state.user.profile.photoURL
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestLogout: () => (dispatch(requestLogout())),
    requestSession: () => (dispatch(requestSession()))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(component);