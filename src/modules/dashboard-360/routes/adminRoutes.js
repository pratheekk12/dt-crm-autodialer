import AdminDashboard from '../views/admin/admin-dashboard';
import Report from '../views/admin/report';

export default [
  {
    path: '/report',
    exact: false,
    crumb: 'Report',
    key: 'report',
    component: Report,
    selector: 'dashboard.canViewAdminDashboard'
  }
];
