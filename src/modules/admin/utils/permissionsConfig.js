export const PERMISSIONS_CONFIG = [
  {
    value: 'telephony',
    label: 'Telephony',
    permissions: [
      {
        label: 'Call Placing',
        value: 'callPlacing'
      },
      {
        label: 'Call Receiving',
        value: 'callReceiving'
      }
    ]
  },
  {
    value: 'dashboard',
    label: 'Dashboard',
    permissions: [
      // {
      //   label: 'Admin',
      //   value: 'admin'
      // },
      {
        label: 'Agent',
        value: 'agent'
      },
      {
        label: 'Manager',
        value: 'manager'
      },
      {
        label: 'Area Manager',
        value: 'areaManager'
      },
      {
        label: 'L2',
        value: 'L2'
      }
    ]
  },
  {
    value: 'telephonyDashboard',
    label: 'Telephony Dashboard',
    permissions: [
      {
        label: 'Inbound Dashboard',
        value: 'inboundDashboard'
      },
      {
        label: 'Outbound Dashboard',
        value: 'outboundDashboard'
      }
    ]
  },
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
