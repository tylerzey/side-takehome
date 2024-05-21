export const AuthRoutes = { login: '/', resetPassword: '/' };
export const Routes = {
  bucketGame: '/buckets/game',
  buckets: '/buckets',
  contactById: '/contacts/:id',
  contacts: '/contacts',
  dashboard: '/',
  emails: {
    byId: '/emails/:id',
    create: '/emails/create',
    emails: '/emails',
  },
  integrations: {
    google: '/integrations/google',
  },
  programs: '/programs',
  settings: {
    connectedServices: '/settings/connections',
    settings: '/settings',
  },
  team: '/team',
} as const;
