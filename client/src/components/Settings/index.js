import { connect } from 'react-redux';
import component from './component';
import './index.css';

const mapStateToProps = (state) => {
  return {
    username: state.user.profile.username
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(component);