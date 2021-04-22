import EmptyRouteContainer from 'src/components/EmptyRouteContainer';
import adminRoutes from './adminRoutes';
import agentDashboard from '../views/user/dashboard';
import managerDashboard from '../views/manager/dashboard';
import areaManagerDashboard from '../views/area-manager/dashboard';
import L2Dashboard from '../views/L2/dashboard';

export default [
  {
    path: '/agent',
    exact: true,
    key: 'agentDashboard',
    component: agentDashboard,
    selector: 'dashboard.canViewAgentDashboard'
  },
  {
    path: '/restaurant-manager-dashboard',
    exact: true,
    key: 'managerDashboard',
    component: managerDashboard,
    selector: 'dashboard.canViewManagerDashboard'
  },
  {
    path: '/area-manager-dashboard',
    exact: true,
    key: 'areaManagerDashboard',
    component: areaManagerDashboard,
    selector: 'dashboard.canViewAreaManagerDashboard'
  },
  {
    path: '/L2-dashboard',
    exact: true,
    key: 'L2Dashboard',
    component: L2Dashboard,
    selector: 'dashboard.canViewL2Dashboard'
  },
  {
    path: '/admin',
    routes: adminRoutes,
    // exact: true,
    key: 'admin',
    component: EmptyRouteContainer
  }
];
