import { createBrowserRouter } from 'react-router';
import { Layout, FocusedLayout } from './components/Layout';
import { Home } from './pages/Home';
import { Memberships } from './pages/Memberships';
import { Services } from './pages/Services';
import { Contact } from './pages/Contact';
import { GetStarted } from './pages/GetStarted';
import { Dashboard } from './pages/Dashboard';
import { LinkedInLanding } from './pages/LinkedInLanding';
import { NotFound } from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Home },
      { path: 'memberships', Component: Memberships },
      { path: 'services', Component: Services },
      { path: 'contact', Component: Contact },
      { path: 'get-started', Component: GetStarted },
      { path: 'dashboard', Component: Dashboard },
      { path: '*', Component: NotFound },
    ],
  },
  // Ad-traffic landing page: stripped navigation, single conversion goal.
  { path: '/linkedin', Component: FocusedLayout, children: [{ index: true, Component: LinkedInLanding }] },
]);
