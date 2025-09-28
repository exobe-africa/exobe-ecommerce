import { Suspense } from 'react';
import DashboardClient from './DashboardClient';

export default function CustomerDashboard() {
  return (
    <Suspense fallback={null}>
      <DashboardClient />
    </Suspense>
  );
}
