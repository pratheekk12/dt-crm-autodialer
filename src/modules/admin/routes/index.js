import EmptyRouteContainer from 'src/components/EmptyRouteContainer';
import CreateUser from '../views/create-user';
import AdminDashboard from '../views/dashboard';
import ManageRoles from '../views/manage-roles';
import manageUsers from '../views/manage-users';
import CreateDispositionForm from '../views/create-disposition-form';

export default [
  {
    path: '/dashboard',
    exact: true,
    key: 'adminDashboard',
    component: AdminDashboard,
    crumb: 'Dashboard'
  },
  {
    path: '/manage-roles',
    exact: true,
    key: 'manageRoles',
    component: ManageRoles,
    crumb: 'Roles'
  },
  {
    path: '/manage-users',
    exact: false,
    key: 'manageUsersContainer',
    component: EmptyRouteContainer,
    crumb: 'Manage Users',
    routes: [
      {
        path: '/view',
        exact: true,
        key: 'manageUsers',
        component: manageUsers,
        crumb: 'View All'
      },
      {
        path: '/create',
        exact: true,
        key: 'createUser',
        component: CreateUser,
        crumb: 'Create User'
      }
    ]
  },
  {
    path: '/manage-disposition-form',
    exact: false,
    key: 'manageDispositionContainer',
    component: EmptyRouteContainer,
    crumb: 'Manage Disposition Form',
    routes: [
      {
        path: '/create',
        exact: true,
        key: 'createForm',
        component: CreateDispositionForm,
        crumb: 'Create Form'
      }
    ]
  }
];
