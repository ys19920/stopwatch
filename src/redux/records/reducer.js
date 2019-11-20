import * as CONSTANTS from './constants';
import produce from 'immer';

const initialState = {
  records: []
};

const recordReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case CONSTANTS.Record_Request:
        draft.records = draft.records.concat([action.data]);
        break;
      case CONSTANTS.Clear_Request:
        draft.records = [];
        break;
      default:
        break;
    }
  });

export default recordReducer;
