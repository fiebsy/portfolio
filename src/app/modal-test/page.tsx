'use client';

import { Sheet } from "@silk-hq/components";

export default function ModalTest() {
  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6">Silk Modal Components Test</h1>
      
      <div className="space-y-8">
        <div className="p-6 border rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Bottom Sheet</h2>
          
          <Sheet.Root license="commercial">
            <Sheet.Trigger>
              <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Open Bottom Sheet
              </button>
            </Sheet.Trigger>
            
            <Sheet.Portal>
              <Sheet.View nativeEdgeSwipePrevention={true}>
                <Sheet.Backdrop themeColorDimming="auto" />
                <Sheet.Content>
                  <Sheet.BleedingBackground className="bg-white border-t border-gray-200 rounded-t-[24px] shadow-sm p-6" />
                  
                  <div className="relative z-10 p-6">
                    <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />
                    
                    <h3 className="text-xl font-bold mb-4">Bottom Sheet Content</h3>
                    <p className="text-gray-700 mb-4">
                      This is a basic example of a Silk bottom sheet component with light mode styling.
                    </p>
                  </div>
                </Sheet.Content>
              </Sheet.View>
            </Sheet.Portal>
          </Sheet.Root>
        </div>
      </div>
    </main>
  );
}
