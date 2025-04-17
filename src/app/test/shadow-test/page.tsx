'use client';

export default function ShadowTestPage() {
  return (
    <div className="min-h-screen bg-gray-2 p-8">
      <h1 className="text-2xl font-display mb-8">Shadow Variants</h1>

      <div className="grid grid-cols-2 gap-8">
        {/* Custom Shadows */}
        <div className="space-y-8">
          <h2 className="text-xl font-display mb-4">Custom Shadows</h2>

          <div className="bg-white rounded-xl p-6 shadow-subtle-17 hover:scale-[1.02] transition-all duration-300">
            <h3 className="font-display mb-2">shadow-subtle-17</h3>
            <p className="text-sm text-gray-11">0 4px 250px 0 black/17%</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-ambient-15 hover:scale-[1.02] transition-all duration-300">
            <h3 className="font-display mb-2">shadow-ambient-15</h3>
            <p className="text-sm text-gray-11">0 8px 160px -4px black/15%</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-glow-10 hover:scale-[1.02] transition-all duration-300">
            <h3 className="font-display mb-2">shadow-glow-10</h3>
            <p className="text-sm text-gray-11">0 0px 120px 20px black/10%</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-float-12 hover:scale-[1.02] transition-all duration-300">
            <h3 className="font-display mb-2">shadow-float-12</h3>
            <p className="text-sm text-gray-11">0 20px 100px -12px black/12%</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-depth-20 hover:scale-[1.02] transition-all duration-300">
            <h3 className="font-display mb-2">shadow-depth-20</h3>
            <p className="text-sm text-gray-11">0 35px 60px -15px black/20%</p>
          </div>
        </div>

        {/* Default Tailwind Shadows */}
        <div className="space-y-8">
          <h2 className="text-xl font-display mb-4">Default Tailwind Shadows</h2>

          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow transition-all duration-300">
            <h3 className="font-display mb-2">shadow-sm</h3>
            <p className="text-sm text-gray-11">0 1px 2px 0 rgb(0 0 0 / 0.05)</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow hover:shadow-md transition-all duration-300">
            <h3 className="font-display mb-2">shadow</h3>
            <p className="text-sm text-gray-11">
              0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
            <h3 className="font-display mb-2">shadow-md</h3>
            <p className="text-sm text-gray-11">
              0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="font-display mb-2">shadow-lg</h3>
            <p className="text-sm text-gray-11">
              0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <h3 className="font-display mb-2">shadow-xl</h3>
            <p className="text-sm text-gray-11">
              0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
