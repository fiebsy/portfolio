'use client';

import React from 'react';
import { SimpleSquircle } from '@/components/SimpleSquircle';

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center p-8 gap-12">
      <h1 className="text-3xl font-semibold mb-4 text-gray-18">SimpleSquircle Showcase</h1>
      
      {/* Buttons Section */}
      <section className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-18">Buttons</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Primary Button */}
          <SimpleSquircle 
            width="200px"
            height="50px"
            borderRadius={12}
            color="#3b82f6"
            padding="0 1.5rem"
            style={{ 
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => alert('Primary button clicked!')}
          >
            <span style={{ color: 'white', fontWeight: 'bold' }}>Primary Button</span>
          </SimpleSquircle>

          {/* Secondary Button */}
          <SimpleSquircle 
            width="200px"
            height="50px"
            borderRadius={12}
            color="#f3f4f6"
            padding="0 1.5rem"
            style={{ 
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => alert('Secondary button clicked!')}
          >
            <span style={{ color: '#4b5563', fontWeight: 'bold' }}>Secondary Button</span>
          </SimpleSquircle>

          {/* Ghost Button */}
          <SimpleSquircle 
            width="200px"
            height="50px"
            borderRadius={12}
            color="transparent"
            padding="0 1.5rem"
            style={{ 
              cursor: 'pointer',
              boxShadow: '0 0 0 2px #3b82f6',
              backgroundColor: 'transparent',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => alert('Ghost button clicked!')}
          >
            <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>Ghost Button</span>
          </SimpleSquircle>

          {/* Danger Button */}
          <SimpleSquircle 
            width="full"
            height="50px"
            borderRadius={12}
            color="#ef4444"
            padding="0 1.5rem"
            style={{ 
              cursor: 'pointer',
              boxShadow: '0 0 0 2px #b91c1c',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
            onClick={() => alert('Danger button clicked!')}
          >
            <span style={{ color: 'white', fontWeight: 'bold' }}>Danger Button</span>
          </SimpleSquircle>
        </div>
      </section>

      {/* Cards Section */}
      <section className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-6 text-gray-18">Cards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Feature Card */}
          <SimpleSquircle 
            width="full"
            height="auto"
            borderRadius={26}
            color="#3b82f6"
            padding="2px"
            style={{ minHeight: '224px' }}
          >
            <SimpleSquircle 
              width="full"
              height="full"
              borderRadius={24}
              color="white"
              padding="1.5rem"
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                minHeight: '220px',
                boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ fontSize: '2rem' }}>✨</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Feature Card</h3>
              <p style={{ color: '#4b5563' }}>This card showcases a feature with iOS-style rounded corners.</p>
            </SimpleSquircle>
          </SimpleSquircle>

          {/* Info Card */}
          <SimpleSquircle 
            width="full"
            height="auto"
            borderRadius={26}
            padding="2px"
            style={{ 
              minHeight: '224px',
              background: 'linear-gradient(45deg, #3b82f6, #6366f1)'
            }}
          >
            <SimpleSquircle 
              width="full"
              height="full"
              borderRadius={24}
              color="#ebf5ff"
              padding="1.5rem"
              style={{ 
                display: 'flex',
                flexDirection: 'column',
                minHeight: '220px' 
              }}
            >
              <div style={{ fontSize: '2rem' }}>ℹ️</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Info Card</h3>
              <p style={{ color: '#4b5563' }}>Important information displayed with smooth iOS-style corners.</p>
            </SimpleSquircle>
          </SimpleSquircle>

          {/* Success Card */}
          <SimpleSquircle 
            width="full"
            height="auto"
            borderRadius={24}
            color="#ecfdf5"
            padding="1.5rem"
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              minHeight: '220px' 
            }}
          >
            <div style={{ fontSize: '2rem' }}>✅</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Success Card</h3>
            <p style={{ color: '#4b5563' }}>Operation completed successfully with beautiful corners.</p>
          </SimpleSquircle>

          {/* Warning Card */}
          <SimpleSquircle 
            width="full"
            height="auto"
            borderRadius={24}
            color="#fffbeb"
            padding="1.5rem"
            style={{ 
              display: 'flex',
              flexDirection: 'column',
              minHeight: '220px' 
            }}
          >
            <div style={{ fontSize: '2rem' }}>⚠️</div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Warning Card</h3>
            <p style={{ color: '#4b5563' }}>Please be cautious with this information or action.</p>
          </SimpleSquircle>
        </div>
      </section>

      <footer className="mt-12 text-center text-gray-12">
        <p>Showcasing the SimpleSquircle component with iOS-style corner smoothing</p>
      </footer>
    </main>
  );
}
