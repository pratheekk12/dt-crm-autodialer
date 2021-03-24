export default (permissions, userRole) => [
  {
    isVisible: true,
    link: '/dash360',
    title: 'Dashboard'
  },
  {
    isVisible: true, // to be updated by person working on telephony
    link: '/upload/home',
    title: 'Upload'
  },
  // {
  //   isVisible: true, // to be updated by person working on telephony
  //   link: '/telephony/dashboard',
  //   title: 'Telephony'
  // },
  // {
  //   isVisible: true, // to be updated by person working on ticketing
  //   link: '/ticketing/ticket-dashboard',
  //   title: 'Ticketing'
  // },
  // {
  //   isVisible: permissions.survey.canAccessSurveyDashboard,
  //   link: '/surveys/home',
  //   title: 'Surveys'
  // },
  // {
  //   isVisible: permissions.campaign.canAccessCampaignDashboard,
  //   link: '/campaign/dashboard',
  //   title: 'Campaign'
  // },
  // {
  //   isVisible: true, // To be updated
  //   link: '/ticketing/setup',
  //   title: 'Tkt-Setup'
  // },
  // {
  //   isVisible: true, // To be updated
  //   link: '/ticketing/ticket-report',
  //   title: 'Tkt-Dashboard'
  // },
  {
    isVisible:
      userRole === 'admin' || permissions.admin.canAccessAdminPrivileges,
    link: '/admin',
    title: ' Admin'
  }
];
