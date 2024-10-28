'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ShareContent({ prize, name }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!prize || !name) {
      router.push('/');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [prize, name, router]);

  if (!prize || !name) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-100 flex flex-col items-center justify-center p-4">
      {/* Rest of the component */}
    </div>
  );
}

export default function SharePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShareContentWrapper />
    </Suspense>
  );
}

function ShareContentWrapper() {
  const searchParams = useSearchParams();
  const prize = searchParams.get('prize');
  const name = searchParams.get('name');

  return <ShareContent prize={prize} name={name} />;
}