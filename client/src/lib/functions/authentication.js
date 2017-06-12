export const isPasswordValid = pass => {
  if (pass.length < 7 || pass.length > 14) {
    return false;
  }
  
  let capitalLetterExists = false;
  let numberExists = false;

  for (let i = 0; i < pass.length; i++) {
  	if (pass[i] === pass[i].toUpperCase() && pass[i] !== pass[i].toLowerCase()) { 
      capitalLetterExists = true;
    }
  	if (parseInt(pass[i], 10) > 0) {
      numberExists = true;
    }
  }
  if (!capitalLetterExists || !numberExists) {
    return false;
  }
  return true;
}

export const isPhoneNumber = number => {
  if (!number || number.length !== 10) {
    return false;
  }
  for (let i = 0; i < number.length; i++) {
    let digit = number.toString()[i];
    let diff = digit - '0';
    if (isNaN(diff) || diff > 9 || diff < 0) {
      return false;
    }
  }
  return true;
}