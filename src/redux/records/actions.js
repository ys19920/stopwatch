import * as CONSTANTS from './constants';
export const recordRequest = data => ({
  type: CONSTANTS.Record_Request,
  data
});

export const clearRequest = data => ({
  type: CONSTANTS.Clear_Request,
  data
});
