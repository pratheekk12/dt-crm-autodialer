import Login from '../views/Login';
import ForgetPassword from '../views/ForgetPassword';
import ResetPassword from '../views/ResetPassword';

export default [
  {
    path: '/login',
    component: Login,
    key: 'login'
  },
  {
    path: '/forget-password',
    component: ForgetPassword,
    key: 'forget-password'
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    key: 'reset-password'
  }
];
