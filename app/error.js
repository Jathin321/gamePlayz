'use client';

import { useEffect } from 'react';
import { RefreshCw, AlertCircle, Home } from 'lucide-react'; 
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-700">
        <div className="bg-gradient-to-r from-purple-900/70 to-indigo-900/70 p-5 flex items-center justify-center">
          <div className="bg-purple-500/20 p-3 rounded-full">
            <AlertCircle className="w-10 h-10 text-purple-400" />
          </div>
        </div>
        
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Check your internet connection
          </h2>
          
          <p className="text-gray-300 mb-6">
            We couldn't load this page. Please check your connection or try again.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg font-medium flex items-center justify-center transition-all"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>
            
            <Link href="/" className="px-5 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium flex items-center justify-center transition-all">
              <Home className="w-4 h-4 mr-2" />
              Go to Home
            </Link>
          </div>
        </div>
        
        <div className="px-6 py-4 bg-gray-900/50 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-400">
            If this problem persists, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
}