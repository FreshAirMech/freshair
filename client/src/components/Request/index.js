import { connect } from 'react-redux';
import component from './component';
import { requestSendEmail } from 'actions/user';

const mapStateToProps = (state) => {
  return {
  	email: state.user.profile.email,
  	firstName: state.user.profile.firstName,
  	lastName: state.user.profile.lastName,
  	phone: state.user.profile.phone,
  	isFetching: state.user.profile.isFetchingMessage,
		error: state.user.profile.errorMessage
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    requestSendEmail: formInfo => dispatch(requestSendEmail(formInfo))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(component);