export default (permissions, userRole) => [
  {
    isVisible: permissions.dashboard.canViewAgentDashboard,
    link: '/dash360/admin/dashboard',
    title: 'Dashboard'
  },
  {
    isVisible: permissions.dashboard.canViewAdminDashboard,
    link: '/dash360/admin/admin-dashboard',
    title: 'Dashboard'
  },
  {
    isVisible: permissions.dashboard.canViewManagerDashboard,
    link: '/dash360/admin/manager-dashboard',
    title: 'Dashboard'
  },
  {
    isVisible: permissions.dashboard.canViewAdminDashboard, // to be updated by person working on telephony
    link: '/upload/home',
    title: 'Upload'
  },
  // {
  //   isVisible:
  //     permissions.telephonyDashboard.canAccessTelephonyOutboundDashboard, // to be updated by person workin on telephony
  //   link: '/telephony/dashboard',
  //   title: 'Telephony'
  // },
  {
    isVisible:
      userRole === 'admin' || permissions.admin.canAccessAdminPrivileges,
    link: '/admin',
    title: ' Admin'
  }
];
