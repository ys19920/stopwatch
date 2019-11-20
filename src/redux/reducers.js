import { combineReducers } from 'redux';
import recordReducer from './records/reducer';

export default combineReducers({
  records: recordReducer
});
