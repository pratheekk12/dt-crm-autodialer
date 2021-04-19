export default (permissions, userRole) => [
  // {
  //   isVisible: permissions.dashboard.canViewAdminDashboard,
  //   link: '/dash360/admin/dashboard',
  //   title: 'Dashboard'
  // },
  // {
  //   isVisible: permissions.dashboard.canViewAdminDashboard,
  //   link: '/dash360/admin/admin-dashboard',
  //   title: 'Dashboard'
  // },
  {
    isVisible: permissions.dashboard.canViewAgentDashboard,
    link: '/dash360/agent',
    title: 'Dashboard'
  },
  {
    isVisible: permissions.dashboard.canViewManagerDashboard,
    link: '/dash360/restaurant-manager-dashboard',
    title: 'Manager Dashboard'
  },
  {
    isVisible: permissions.dashboard.canViewAreaManagerDashboard,
    link: '/dash360/area-manager-dashboard',
    title: 'Area-Manager Dashboard'
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
]