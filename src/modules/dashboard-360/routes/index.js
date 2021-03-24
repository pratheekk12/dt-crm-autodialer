import EmptyRouteContainer from 'src/components/EmptyRouteContainer';
import adminRoutes from './adminRoutes';

export default [
  {
    path: '/admin',
    routes: adminRoutes,
    key: 'admin',
    component: EmptyRouteContainer
  }
];
