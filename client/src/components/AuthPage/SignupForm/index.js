import { connect } from 'react-redux';
import component from './component';
import { requestSignUp } from 'actions/auth';

function mapStateToProps(state) {
  return {
    isFetching: state.auth.signUp.isFetching,
    error: state.auth.signUp.error
  }
}

function mapDispatchToProps(dispatch) {
  return {
    requestSignUp: signUpInfo => dispatch(requestSignUp(signUpInfo))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(component);