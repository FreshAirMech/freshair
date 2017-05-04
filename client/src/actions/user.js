import * as Consts from 'constants/user';

export const requestChangeInfo = userInfo => ({type: Consts.CHANGEINFO_REQUEST, userInfo});
export const changeInfoSuccess = result => ({type: Consts.CHANGEINFO_SUCCESS, result});
export const changeInfoFailed = error => ({type: Consts.CHANGEINFO_FAILED, error});