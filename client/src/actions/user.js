import * as Consts from 'constants/user';

export const requestChangeInfo = userInfo => ({type: Consts.CHANGEINFO_REQUEST, userInfo});
export const changeInfoSuccess = result => ({type: Consts.CHANGEINFO_SUCCESS, result});
export const changeInfoFailed = error => ({type: Consts.CHANGEINFO_FAILED, error});

export const requestSendEmail = formInfo => ({type: Consts.SENDEMAIL_REQUEST, formInfo});
export const sendEmailSuccess = result => ({type: Consts.SENDEMAIL_SUCCESS, result});
export const sendEmailFailed = error => ({type: Consts.SENDEMAIL_FAILED, error});