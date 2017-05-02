import { connect } from 'react-redux';
import component from './component';
import { requestCheckInfo } from 'actions/user';
import './index.css';

const mapStateToProps = (state) => {
  return {
    username: state.user.profile.username,
    email: state.user.profile.email,
    phone: state.user.profile.phone,
    isFetching: state.user.profile.isFetching,
    error: state.user.profile.error
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  	requestCheckInfo: userInfo => dispatch(requestCheckInfo(userInfo))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(component);