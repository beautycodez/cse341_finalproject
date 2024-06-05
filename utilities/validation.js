const { body, validationResult } = require("express-validator");
const validate = {};

/*  **********************************
 *  Registration Data Validation Rules
 * ********************************* */
validate.registationRules = () => {
  return [
    // firstname is required and must be string
    body("email")
      .trim()
      .escape()
      .notEmpty()
      .isLength({ min: 2 })
      .isEmail()
      .withMessage("Please provide a valid email address."),
    body("date_birth")
      .notEmpty()
      .isNumeric()
      .withMessage("Please enter a number")
  ];
};

/* ******************************
 * Check data and return errors or continue to registration
 * ***************************** */
validate.checkRegData = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = validate;
