import Dashboard from '../views/DashboardView/index';
import agentDispostionList from '../views/admin/agentlastfive';
import distribuerCallDisposedList from '../views/admin/distributerlastfive';
import AdminDashboard from '../views/admin/admin-dashboard';
import Manager from '../views/admin/restuarant-manager-dashboard';
import Report from '../views/admin/report';

export default [
  {
    path: '/dashboard',
    exact: false,
    // crumb: 'Dashboard 360',
    key: 'dashboard',
    component: AdminDashboard,
    selector: 'dashboard.canViewAdminDashboard'
  },
  // {
  //   path: '/admin-dashboard',
  //   exact: true,
  //   // crumb: 'Admin Dashboard',
  //   key: 'adminDashboard',
  //   component: AdminDashboard,
  //   selector: 'dashboard.canViewAdminDashboard'
  // },
  {
    path: '/report',
    exact: true,
    crumb: 'Report',
    key: 'report',
    component: Report,
    selector: 'dashboard.canViewAdminDashboard'
  },
  {
    path: '/manager-dashboard',
    crumb: 'Manager Dashboard',
    exact: true,
    key: 'managerDashboard',
    component: Manager,
    selector: 'dashboard.canViewManagerDashboard'
  },
  {
    path: '/agentlastfive',
    exact: true,
    key: 'agentlastfive',
    component: agentDispostionList,
    crumb: 'Agent Dispositon List'
  },
  {
    path: '/agentlastfive/:uniqueId',
    exact: true,
    key: 'uniqueId',
    component: agentDispostionList
  },
  {
    path: '/distributerDisposedCallList',
    exact: true,
    key: 'distributerDisposedCallList',
    component: distribuerCallDisposedList,
    crumb: 'Distributer Call Dispositon List'
  },
  {
    path: '/distributercall/:uniqueId',
    exact: true,
    key: 'distributerCallById',
    component: distribuerCallDisposedList
  }
];
