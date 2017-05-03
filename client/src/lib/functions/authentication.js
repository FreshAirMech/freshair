module.exports = {
	isPasswordValid: function(pass) {
    if (pass.length < 7 || pass.length > 14) return false;
    let capitalLetterExists = false, numberExists = false;
    for (let i = 0; i < pass.length; i++) {
    	if (pass[i] === pass[i].toUpperCase() && pass[i] !== pass[i].toLowerCase()) 
    		capitalLetterExists = true;
    	if (parseInt(pass[i], 10) > 0) numberExists = true;
    }
    if (!capitalLetterExists || !numberExists) return false;
    return true;
  }
}