import { Suspense } from 'react';
import FailedPageClient from './FailedPageClient';

export default function OrderFailedPage() {
  return (
    <Suspense fallback={null}>
      <FailedPageClient />
    </Suspense>
  );
}
