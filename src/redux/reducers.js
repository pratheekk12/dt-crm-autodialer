import { SET_USER_DATA } from 'src/modules/dashboard-360/redux/constants';
import {
  SET_LOGGED_IN,
  SET_ACCOUNT_TYPE,
  SET_ACTIVATED_ROUTE,
  SET_NEW_CRUMB,
  SET_URL_MATCH_FOUND,
  SET_AGENT_CURRENT_STATUS,
  SET_SEARCH_DISTRIBUTOR,
  SET_ACCESS_FOR_ROLE
} from './constants';

const logInInitialState = false;
const accountTypeInitialState = '';
const agentInitialState = {
  AgentType: '',
  role: '',
  callUniqueId: '',
  distributer_id: '',
  callStatusId: '',
  callDispositionStatus: '',
  callType: '',
  callEvent: '',
  callerNumber: '',
  callStatus: '',
  AgentSIPID: ''
};

export const logInState = (state = logInInitialState, action) => {
  switch (action.type) {
    case SET_LOGGED_IN: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const userData = (state = null, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const agentCurrentStatus = (state = agentInitialState, action) => {
  switch (action.type) {
    case SET_AGENT_CURRENT_STATUS: {
      return action.payload;
    }
    default:
      return state;
  }
};

export const accountType = (state = accountTypeInitialState, action) => {
  switch (action.type) {
    case SET_ACCOUNT_TYPE: {
      return action.payload;
    }
    default:
      return state;
  }
};
export const activatedRoute = (state = '', action) => {
  switch (action.type) {
    case SET_ACTIVATED_ROUTE: {
      return action.payload;
    }
    default:
      return state;
  }
};
export const crumbs = (state = new Map(), action) => {
  switch (action.type) {
    case SET_NEW_CRUMB: {
      // Not changing reference to prevent rerendering purposefully
      state.set(action.key, action.value);
      return state;
    }
    default:
      return state;
  }
};
export const urlMatchFound = (state = false, action) => {
  switch (action.type) {
    case SET_URL_MATCH_FOUND: {
      return action.payload;
    }
    default:
      return state;
  }
};
export const searchDistributor = (state = '', action) => {
  switch (action.type) {
    case SET_SEARCH_DISTRIBUTOR: {
      return action.payload;
    }
    default:
      return state;
  }
};
const permissions = {
  resources: 'CRU',
  telephony: ['callReceiving', 'callPlacing'],
  dashboard: ['admin'],
  telephonyDashboard: ['inboundDashboard', 'outboundDashboard'],
  ticketing: ['user', 'team', 'all'],
  ticketingDashboard: ['user', 'team', 'all'],
  survey: ['dashboard', 'admin'],
  campaign: ['dashboard', 'admin'],
  admin: ['all']
};
export const accessAccToRole = (state = getAccessObj(permissions), action) => {
  switch (action.type) {
    case SET_ACCESS_FOR_ROLE: {
      return getAccessObj(action.payload);
    }
    default:
      return state;
  }
};

function getAccessObj(permissions) {
  // Read permissions from the api response and create a permissions obj for ui
  // Multi Level (Modularized)
  const obj = {
    telephony: {},
    telephonyDashboard: {},
    dashboard: {},
    ticketing: {},
    ticketingDashboard: {},
    survey: {},
    campaign: {},
    admin: {},
    resources: {}
  };
  if (permissions) {
    obj.telephony.canReceiveCall = permissions.telephony?.includes(
      'callReceiving'
    );
    obj.telephony.canPlaceCall = permissions.telephony?.includes('callPlacing');
    obj.dashboard.canViewAgentDashboard = permissions.dashboard?.includes(
      'agent'
    );
    obj.dashboard.canViewManagerDashboard = permissions.dashboard?.includes(
      'manager'
    );
    obj.dashboard.canViewAdminDashboard = permissions.dashboard?.includes(
      'admin'
    );
    obj.dashboard.canAccessDisposition = permissions.dashboard?.includes(
      'disposition'
    );
    obj.telephonyDashboard.canAccessTelephonyInboundDashboard = permissions.telephonyDashboard?.includes(
      'inboundDashboard'
    );
    obj.telephonyDashboard.canAccessTelephonyOutboundDashboard = permissions.telephonyDashboard?.includes(
      'outboundDashboard'
    );
    obj.ticketing.canAccessUserTicketsGeneral = permissions.ticketing?.includes(
      'user'
    );
    obj.ticketing.canAccessTeamTicketsGeneral = permissions.ticketing?.includes(
      'team'
    );
    obj.ticketing.canAccessAllTicketsGeneral = permissions.ticketing?.includes(
      'all'
    );
    obj.ticketingDashboard.canAccessAllTicketsDashboard = permissions.ticketingDashboard?.includes(
      'user'
    );
    obj.ticketingDashboard.canAccessAllTicketsDashboard = permissions.ticketingDashboard?.includes(
      'team'
    );
    obj.ticketingDashboard.canAccessAllTicketsDashboard = permissions.ticketingDashboard?.includes(
      'all'
    );
    obj.survey.canAccessSurveyDashboard = permissions.survey?.includes(
      'dashboard'
    );
    obj.survey.canAccessSurveyAdminPrivileges = permissions.survey?.includes(
      'admin'
    );
    obj.campaign.canAccessCampaignDashboard = permissions.campaign?.includes(
      'dashboard'
    );
    obj.campaign.canAccessCampaignAdminPrivileges = permissions.campaign?.includes(
      'admin'
    );
    obj.admin.canAccessAdminPrivileges = permissions.admin?.includes('all');
    obj.resources.canAccessResourceType = permissions.resources;
  }
  return obj;
}
