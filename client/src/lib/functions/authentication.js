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
  // Check if number's length is 10 digits + the 4 extra characters '() -'
  // e.g. (123) 456-7890 is 14 chars long
  if (!number || number.length !== 10 + 4) {
    return false;
  }
  // Remove the extra characters and test to see if the digits are numbers
  number = number.slice(1,3) + number.slice(6,8) + number.slice(10,13);
  for (let i = 0; i < number.length; i++) {
    let digit = number.toString()[i];
    let diff = digit - '0';
    if (isNaN(diff) || diff > 9 || diff < 0) {
      return false;
    }
  }
  return true;
}