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
    role: admin ? yup.string().required(errorStrings.ERR_REQ) : yup.string(),
    restaurants: admin
      ? yup.array().when('role', (data, schema) => {
          return data === 'DTAM'
            ? schema
                .min(1, 'Minimum Length Required is 1')
                .max(100, 'Max Length allowed is 100')
            : data !== 'DTL1'
            ? schema.min(1, 'Minimum Length Required is 1').max(1, 'Maximum Length Allowed is 1')
            : schema.min(0, 'No Restaurants can be assigned').max(0, 'No Restaurants can be assigned');
          // return data.Dropdown1 === 'First'
          //   ? schema2.required('this is a required field')
          //   : schema2;
        })
      : // .min(8)
        // .test('passwords-match', 'Passwords must match', function(value) {
        //   return this.parent.password === value;
        // })
        null
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
