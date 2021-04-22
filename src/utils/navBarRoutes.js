export default (permissions, userRole) => [
  {
    isVisible: permissions.dashboard.canViewAgentDashboard,
    link: '/dash360/agent',
    title: 'Dashboard'
  },
  {
    isVisible: permissions.dashboard.canViewManagerDashboard,
    link: '/dash360/restaurant-manager-dashboard',
    title: 'Dashboard'
  },
  {
    isVisible: permissions.dashboard.canViewAreaManagerDashboard,
    link: '/dash360/area-manager-dashboard',
    title: 'Dashboard'
  },
  {
    isVisible: permissions.dashboard.canViewL2Dashboard,
    link: '/dash360/L2-dashboard',
    title: 'Dashboard'
  },
  {
    isVisible: permissions.admin.canAccessAdminUploadPanel,
    link: '/upload/home',
    title: 'Upload'
  },
  {
    isVisible: permissions.admin.canAccessAdminReports, // to be updated by person working on telephony
    link: '/dash360/admin/report',
    title: 'Report'
  },
  {
    isVisible:
      userRole === 'admin' || permissions.admin.canAccessAdminPrivileges,
    link: '/admin',
    title: ' Admin'
  }
];
