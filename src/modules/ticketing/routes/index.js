import ticketDashboard from '../views/ticket-dashboard';
import createTicket from '../views/create-ticket';
import ticketSetup from '../views/ticketsetup';
import ticketChart from '../views/Ticket-charts';
import ticketReport from '../views/ticket-report';

export default [
  {
    path: '/ticket-dashboard',
    key: 'ticketDashboard',
    component: ticketDashboard,
    crumb: 'My Bucket'
  },
  {
    path: '/create-ticket',
    key: 'createTicket',
    component: createTicket
  },
  {
    path: '/setup',
    key: 'ticketSetup',
    component: ticketSetup,
    crumb: 'Configuration'
  },
  {
    path: '/ticket-report',
    key: 'ticketReport',
    component: ticketReport,
    crumb: 'Ticket Report'
  }
];
