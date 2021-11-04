const Schemes = require("./scheme-model");

/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/

// NEEDS TO BE COMPLETED AFTER SCHEMA FIELDS HAVE BEEN CREATED => DATA MODEL
const checkSchemeId = async (req, res, next) => {
  try {
    const { scheme_id } = req.params;
    const scheme = await Schemes.findById(scheme_id);
    if (scheme.scheme_name) {
      req.scheme = scheme;
      next();
    } else {
      next({
        success: false,
        status: 404,
        message: `scheme with scheme_id ${scheme_id} not found`,
      });
      console.log(scheme);
    }
  } catch (error) {
    next(error);
  }
};

/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = (req, res, next) => {
  const { scheme_name } = req.body;
  if (
    scheme_name === undefined ||
    scheme_name === "" ||
    typeof scheme_name !== "string"
  ) {
    res.status(400).json({
      success: false,
      message: "invalid scheme_name",
    });
  } else {
    next();
  }
};

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = (req, res, next) => {};

module.exports = {
  checkSchemeId,
  validateScheme,
  validateStep,
};
