import EmptyRouteContainer from 'src/components/EmptyRouteContainer';
import adminRoutes from './adminRoutes';
import Dashboard from '../views/user/dashboard';
// import ManagerDashboard from '../views/manager/restuarant-manager-dashboard';

export default [
  {
    path: '/admin',
    routes: adminRoutes,
    // exact: true,
    key: 'admin',
    component: EmptyRouteContainer
  },
  {
    path: '/',
    exact: true,
    key: 'dashboard',
    component: Dashboard,
    selector: 'dashboard.canViewAgentDashboard'
  }
  // {
  //   path: '/manager/dashboard',
  //   exact: true,
  //   key: 'managerDashboard',
  //   component: ManagerDashboard,
  //   selector: 'dashboard.canViewManagerDashboard'
  // }
];
