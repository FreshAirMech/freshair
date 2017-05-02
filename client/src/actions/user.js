import * as Consts from 'constants/user';

export const requestCheckInfo = userInfo => ({type: Consts.CHECKINFO_REQUEST, userInfo});
export const checkInfoSuccess = result => ({type: Consts.CHECKINFO_SUCCESS, result});
export const checkInfoFailed = error => ({type: Consts.CHECKINFO_FAILED, error});