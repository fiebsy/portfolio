import { Works } from '@/components/works';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-3">
      {/* Hero section can be added here */}

      {/* Works section */}
      <section className="w-full py-16">
        <Works />
      </section>

      {/* Additional sections can be added here */}
    </main>
  );
}
