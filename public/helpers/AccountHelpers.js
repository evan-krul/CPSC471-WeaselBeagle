module.exports = {

  accountInputHandler: function (input) {
    return {
      account: {
        fname: input.fname,
        lname: input.lname,
        address: input.address,
        email: input.email,
        password: input.password,
        accountType: input.accountType
      }
    }
  },

  phoneNumbersInputHandler: function (input) {
    return {
      userAccountPhoneNumbers: {
        email: input.email,
        phoneNumber: input.phoneNumber
      }
    }
  },

}; // end of module
