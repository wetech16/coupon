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

export const validateUserDetails = (data) => {
  let errors = {};

  if (!validator.isEmpty(data.bio.trim())) {
    if (!validator.isLength(data.bio.trim(), { min: 10, max: 80 }))
      errors.bio = "Bio must be at least 10 characters long";
  }

  if (!validator.isEmpty(data.website.trim())) {
    if (
      !validator.isURL(data.website.trim(), {
        protocols: ["http", "https"],
      })
    )
      errors.website = "Invalid URL";

    // if (data.website.trim().substring(0, 4) !== 'http') {
    // 	userDetails.website = `http://${data.website.trim()}`;
    // } else userDetails.website = data.website;
  } else data.website = data.website;

  // if (!validator.isEmpty(data.location.trim())) userDetails.location = data.location;

  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};

export const validateScreamData = (data) => {
  let errors = {};
  // scream
  if (validator.isEmpty(data)) errors.scream = "Must not be empty";
  return {
    errors,
    valid: Object.keys(errors).length === 0 ? true : false,
  };
};
