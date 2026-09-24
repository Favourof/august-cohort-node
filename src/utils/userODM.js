export const userODM = (userObj) => {
  const user = {
    firstName: userObj.firstName,
    lastName: userObj.lastName,
    email: userObj.email,
    phoneNumber: userObj.phoneNumber,
    address: userObj.address,
  };
  return user;
};
