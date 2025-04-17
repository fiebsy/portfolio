import { WorksList } from '@/components/works/works-list';

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 bg-gray-3">
      <div className="w-full max-w-[1200px]">
        <WorksList />
      </div>
    </main>
  );
}
