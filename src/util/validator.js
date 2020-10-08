import validator from "validator";

const isEmail = (email) => {
  const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regEx.test(email)) return true;
  else return false;
};

const isEmpty = (string) => {
  if (string.trim() === "") return true;
  else return false;
};

export default function validateSignupData(data) {
  let errors = {};
  //Email
  if (isEmpty(data.email)) {
    errors.email = "Must not be empty";
  } else if (!isEmail(data.email)) {
    errors.email = "Must be a valid email address";
  }
  //Password
  if (isEmpty(data.password)) errors.password = "Must not be empty";
  if (isEmpty(data.handle)) errors.handle = "Must not be empty";
  //Handle
  // handle
  if (validator.isEmpty(data.handle))
    errors.handle = "Must not be empty.";
  else if (!validator.isAlpha(data.handle, "en-US"))
    errors.handle = "handle should contains only letters (a-zA-Z).";

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
}
