export const PERMISSIONS_CONFIG = [
  // {
  //   value: 'telephony',
  //   label: 'Telephony',
  //   permissions: [
  //     {
  //       label: 'Call Placing',
  //       value: 'callPlacing'
  //     },
  //     {
  //       label: 'Call Receiving',
  //       value: 'callReceiving'
  //     }
  //   ]
  // },
  {
    value: 'dashboard',
    label: 'Dashboard',
    permissions: [
      // {
      //   label: 'Admin',
      //   value: 'admin'
      // },
      {
        label: 'DTL1',
        value: 'DTL1'
      },
      {
        label: 'DTL2',
        value: 'DTL2'
      },
      {
        label: 'DTL3',
        value: 'DTL3'
      },
      {
        label: 'DT Restaurant Manager',
        value: 'DTRestaurantManager'
      },
      {
        label: 'DT Area Manager',
        value: 'DTAreaManager'
      }
    ]
  },
  // {
  //   value: 'telephonyDashboard',
  //   label: 'Telephony Dashboard',
  //   permissions: [
  //     {
  //       label: 'Inbound Dashboard',
  //       value: 'inboundDashboard'
  //     },
  //     {
  //       label: 'Outbound Dashboard',
  //       value: 'outboundDashboard'
  //     }
  //   ]
  // },
  {
    value: 'admin',
    label: 'Admin',
    permissions: [
      {
        label: 'All',
        value: 'all'
      },
      {
        label: 'Reports',
        value: 'reports'
      },
      {
        label: 'Upload',
        value: 'uploads'
      }
    ]
  }
];
