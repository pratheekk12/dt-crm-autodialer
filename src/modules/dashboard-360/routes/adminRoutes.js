import invoices from '../views/admin/invoices';
import Orders from '../views/admin/orders';
import Dashboard from '../views/DashboardView/index';
import agentDispostionList from '../views/admin/agentlastfive';
import distribuerCallDisposedList from '../views/admin/distributerlastfive';
import AdminDashboard from '../views/admin/admin-dashboard';
import Manager from '../views/admin/restuarant-manager-dashboard';

export default [
  {
    path: '/dashboard',
    exact: false,
    // crumb: 'Dashboard 360',
    key: 'dashboard',
    component: Dashboard,
    selector: 'dashboard.canViewAgentDashboard'
  },
  {
    path: '/admin-dashboard',
    exact: true,
    crumb: 'Admin Dashboard',
    key: 'adminDashboard',
    component: AdminDashboard,
    crumb: 'Admin Dashboard',
    selector: 'dashboard.canViewAdminDashboard'
  },
  {
    path: '/manager-dashboard',
    crumb: 'Manager Dashboard',
    exact: true,
    key: 'managerDashboard',
    component: Manager,
    crumb: 'Manager Dashboard',
    selector: 'dashboard.canViewManagerDashboard'
  },
  {
    path: '/orders',
    exact: true,
    key: 'order',
    component: Orders,
    crumb: 'Orders'
  },
  {
    path: '/orders/:orderId',
    exact: true,
    key: 'orderWithId',
    component: Orders
  },
  {
    path: '/invoices',
    exact: true,
    key: 'invoices',
    component: invoices,
    crumb: 'Invoices'
  },
  {
    path: '/invoices/:orderId',
    exact: true,
    key: 'invoicesWithId',
    component: invoices
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
