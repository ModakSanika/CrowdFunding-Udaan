'use client';

import React from 'react';
import Link from 'next/link';
import Layout from './components/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-purple-600 to-purple-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                <span className="block">
                  <span className="text-5xl sm:text-6xl md:text-7xl">✨</span> Fund Your Dreams{' '}
                  <span className="text-5xl sm:text-6xl md:text-7xl">✨</span>
                </span>
                <span className="block text-purple-200">with Blockchain</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-purple-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                Create and fund innovative projects using the power of blockchain technology.{' '}
                <span className="text-2xl">🚀</span>
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <Link
                    href="/projects/create"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-purple-700 bg-white hover:bg-purple-50 md:py-4 md:text-lg md:px-10"
                  >
                    Create Project <span className="text-2xl ml-2">🎯</span>
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    href="/projects"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 md:py-4 md:text-lg md:px-10"
                  >
                    Explore Projects <span className="text-2xl ml-2">🔍</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-purple-600 font-semibold tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                A better way to crowdfund <span className="text-4xl">💫</span>
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Built on blockchain technology for transparency and security.{' '}
                <span className="text-2xl">🔒</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-purple-800 text-white py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-lg">
                Made with{' '}
                <span 
                  className="text-3xl inline-block animate-pulse" 
                  style={{ 
                    animationDuration: '1s', 
                    animationIterationCount: 'infinite',
                    background: 'linear-gradient(45deg, #ff6b6b, #ff8e8e)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  ❤️
                </span>{' '}
                by <span className="font-bold text-2xl text-yellow-400">Sanika Modak</span>
              </p>
              <div className="mt-4 space-x-6">
                <span className="text-3xl">🚀</span>
                <span className="text-3xl">💫</span>
                <span className="text-3xl">✨</span>
                <span className="text-3xl">🌟</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Layout>
  );
} 