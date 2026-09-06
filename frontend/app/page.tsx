'use client';

import React, { useState, useEffect } from 'react';

// Import clock-related components
import WorldClock from '@/components/WorldClock';
import Stopwatch from '@/components/Stopwatch';
import Timer from '@/components/Timer';
import Alarms from '@/components/Alarms';

// Define the available navigation tabs
type TabType = 'clock' | 'stopwatch' | 'timer' | 'alarms';

export default function Home() {
  // Track which tab is currently active
  const [activeTab, setActiveTab] = useState<TabType>('clock');

  // Track whether dark mode is enabled
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check the user's system color-scheme preference when the component loads
  useEffect(() => {
    // Enable dark mode if the user's system prefers dark mode
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
    }
  }, []);

  return (
    // Main application container
    // Background and text colors change depending on dark mode
    <main
      className={`min-h-screen ${
        isDarkMode
          ? 'bg-gray-900 text-white'
          : 'bg-white text-gray-900'
      }`}
    >
      {/* Header section */}
      <header
        className={`border-b ${
          isDarkMode
            ? 'border-gray-800 bg-gray-800'
            : 'border-gray-200 bg-gray-50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">

            {/* Application title */}
            <h1 className="text-3xl font-bold">
              ⏰ Chrono Master Pro
            </h1>

            {/* Dark mode toggle button */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isDarkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {/* Show moon icon in dark mode and sun icon in light mode */}
              {isDarkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </header>

      {/* Navigation tabs */}
      <nav
        className={`border-b ${
          isDarkMode
            ? 'border-gray-800 bg-gray-800'
            : 'border-gray-200 bg-gray-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-0">

            {/* Create a navigation button for each available tab */}
            {(['clock', 'stopwatch', 'timer', 'alarms'] as const).map(
              (tab) => (
                <button
                  key={tab}
                  // Set the clicked tab as the active tab
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-4 font-medium border-b-2 transition-colors ${
                    activeTab === tab
                      // Highlight the currently active tab
                      ? 'border-blue-500 text-blue-500'
                      // Style inactive tabs differently based on the theme
                      : `border-transparent ${
                          isDarkMode
                            ? 'text-gray-400 hover:text-gray-200'
                            : 'text-gray-600 hover:text-gray-900'
                        }`
                  }`}
                >
                  {/* Capitalize the first letter of the tab name */}
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* Display the world clock when the Clock tab is selected */}
        {activeTab === 'clock' && (
          <WorldClock isDarkMode={isDarkMode} />
        )}

        {/* Display the stopwatch when the Stopwatch tab is selected */}
        {activeTab === 'stopwatch' && (
          <Stopwatch isDarkMode={isDarkMode} />
        )}

        {/* Display the timer when the Timer tab is selected */}
        {activeTab === 'timer' && (
          <Timer isDarkMode={isDarkMode} />
        )}

        {/* Display the alarms when the Alarms tab is selected */}
        {activeTab === 'alarms' && (
          <Alarms isDarkMode={isDarkMode} />
        )}
      </div>
    </main>
  );
}
