import { connect } from 'react-redux';
import component from './component';
import './index.css';

function mapStateToProps(state) {
  return {
  	email: state.user.profile.email,
  	firstName: state.user.profile.firstName,
  	lastName: state.user.profile.lastName,
  	phone: state.user.profile.phone,
  	isFetching: state.user.profile.isFetchingMessage,
		error: state.user.profile.errorMessage
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(component);