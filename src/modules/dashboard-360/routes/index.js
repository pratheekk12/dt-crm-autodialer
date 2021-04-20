import EmptyRouteContainer from 'src/components/EmptyRouteContainer';
import adminRoutes from './adminRoutes';
import agentDashboard from '../views/user/dashboard';
import managerDashboard from '../views/manager/dashboard';
import areaManagerDashboard from '../views/area-manager/dashboard';
import teamLeadsDashboard from '../views/team-leads/dashboard';

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
    path: '/team-leads-dashboard',
    exact: true,
    key: 'teamLeadsDashboard',
    component: teamLeadsDashboard,
    selector: 'dashboard.canViewTeamLeadsDashboard'
  },
  {
    path: '/admin',
    routes: adminRoutes,
    // exact: true,
    key: 'admin',
    component: EmptyRouteContainer
  }
];
