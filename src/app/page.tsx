import { FeebsModal } from '@/components/landing-page/feebs-modal';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gray-3">
      <div className="w-full max-w-md">
        <FeebsModal />
      </div>
    </main>
  );
}
