import routes from 'src/modules/dashboard-360/routes';
import uploadRoutes from 'src/modules/upload/routes';
// import campaignRoutes from 'src/modules/campaign/routes';
import React from 'react';
import telephonyRoutes from '../modules/telephony/routes';
// import ticketingRoutes from '../modules/ticketing/routes';
import adminRoutes from '../modules/admin/routes';
import authRoutes from '../modules/auth/routes';
import userRoutes from '../modules/user/routes';
import CommonAlert from 'src/components/CommonAlert';

export const dash360 = React.lazy(() =>
  import('src/modules/dashboard-360/views')
);
export const upload = React.lazy(() => import('src/modules/upload'));
// export const surveys = React.lazy(() => import('src/modules/surveys'));
export const telephony = React.lazy(() =>
  import('src/modules/telephony/views/index')
);
// export const ticketing = React.lazy(() =>
//   import('src/modules/ticketing/views')
// );
// export const campaign = React.lazy(() => import('src/modules/campaign'));
export const admin = React.lazy(() => import('src/modules/admin'));
export const auth = React.lazy(() => import('src/modules/auth/views/index'));
export const user = React.lazy(() => import('src/modules/user/views/index'));

export default [
  {
    path: '/dash360',
    routes,
    key: 'dash360',
    component: dash360,
    crumb: 'Dashboard 360',
    requiresAuth: true
    /* selector: 'dashboard.canViewDashboard'*/
  },
  {
    path: '/upload',
    routes: uploadRoutes,
    key: 'upload',
    component: upload,
    crumb: 'Upload',
    requiresAuth: true
  },
  {
    path: '/telephony',
    routes: telephonyRoutes,
    key: 'telephony',
    component: telephony,
    crumb: 'Telephony',
    requiresAuth: true
  },
  {
    path: '/admin',
    routes: adminRoutes,
    key: 'admin',
    component: admin,
    crumb: 'Admin',
    requiresAuth: true
  },
  {
    path: '/auth',
    routes: authRoutes,
    key: 'auth',
    component: auth,
    requiresAuth: false
  },
  {
    path: '/user',
    routes: userRoutes,
    key: 'user',
    component: user,
    requiresAuth: true
  },
  {
    path: '/404',
    routes: [],
    key: '404',
    component: CommonAlert,
    requiresAuth: true
  }
];
