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
      <main className="text-center">
        <h1 className="text-4xl font-bold text-orange-800 mb-4">🪔 Diwali Delight! 🪔</h1>
        <p className="text-2xl text-orange-700 mb-8">
          {name} just won a {prize} in our Diwali Giveaway!
        </p>
        <div className="bg-white bg-opacity-50 rounded-lg shadow-inner p-6 mb-8">
          <p className="text-xl text-orange-600 mb-4">
            Want to join the giveaway and win amazing prizes?
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition duration-300"
          >
            Play Now!
          </button>
        </div>
        <p className="text-orange-600">
          Redirecting to home page in {countdown} seconds...
        </p>
      </main>
    </div>
  );
}

export default function SharePage() {
  const searchParams = useSearchParams();
  const prize = searchParams.get('prize');
  const name = searchParams.get('name');

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShareContent prize={prize} name={name} />
    </Suspense>
  );
}
