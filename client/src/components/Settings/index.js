import { connect } from 'react-redux';
import component from './component';
import { requestChangeInfo } from 'actions/user';
import './index.css';

const mapStateToProps = (state) => {
  return {
    username: state.user.profile.username,
    email: state.user.profile.email,
    phone: state.user.profile.phone,
    isFetchingEmail: state.user.profile.isFetchingEmail,
    errorEmail: state.user.profile.errorEmail,
    isFetchingPhone: state.user.profile.isFetchingPhone,
    errorPhone: state.user.profile.errorPhone,
    isFetchingPassword: state.user.profile.isFetchingPassword,
    errorPassword: state.user.profile.errorPassword
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  	requestChangeInfo: userInfo => dispatch(requestChangeInfo(userInfo))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(component);