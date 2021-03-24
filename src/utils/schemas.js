import * as yup from 'yup';
const errorStrings = {
  ERR_REQ: 'This Field is Required'
};
export const RegistrationSchema = admin =>
  yup.object({
    username: yup
      .string()
      .required(errorStrings.ERR_REQ)
      .min(6),
    phone: yup
      .string()
      .required(errorStrings.ERR_REQ)
      .min(10)
      .matches(
        /^((\+){0,1}91(\s){0,1})?([6-9]\d{9})$/,
        'Enter valid Phone Number'
      ),
    email: yup
      .string()
      .required(errorStrings.ERR_REQ)
      .email(),
    role: admin ? yup.string().required(errorStrings.ERR_REQ) : yup.string()
  });

export const PasswordSchema = yup.object({
  password: yup
    .string()
    .required(errorStrings.ERR_REQ)
    .min(8)
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain At least 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: yup
    .string()
    .required(errorStrings.ERR_REQ)
    .min(8)
    .test('passwords-match', 'Passwords must match', function(value) {
      return this.parent.password === value;
    })
});
