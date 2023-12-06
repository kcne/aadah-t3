import React from "react";

function Features() {
  return (
    <div className="bg-white">
      <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Features
          </h2>
          <p className="mt-4 text-gray-500">
            Inspired by James Clear&apos;s Atomic Habits, Aadah is designed to
            revolutionize your daily routine. Discover our key features for a
            seamless life management experience:
          </p>

          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Habit Tracker</dt>
              <dd className="mt-2 text-sm text-gray-500">
                Easily track and build habits with visual progress charts.
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-4">
              <dt className="font-medium text-gray-900">Routine Scheduler</dt>
              <dd className="mt-2 text-sm text-gray-500">
                Plan and organize your daily routines for maximum efficiency.
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <dt className="font-medium text-gray-900">Goal Setting Module</dt>
              <dd className="mt-2 text-sm text-gray-500">
                Set clear, achievable goals with step-by-step milestones.
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <dt className="font-medium text-gray-900">Focus Timer</dt>
              <dd className="mt-2 text-sm text-gray-500">
                Enhance productivity using customizable focus sessions.
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <dt className="font-medium text-gray-900">Reflection Journal</dt>
              <dd className="mt-2 text-sm text-gray-500">
                Capture insights and reflections to foster personal growth.
              </dd>
            </div>
            <div className="border-t border-gray-200 pt-2">
              <dt className="font-medium text-gray-900">Data Insights</dt>
              <dd className="mt-2 text-sm text-gray-500">
                Receive personalized reports to understand and improve your
                habits.
              </dd>
            </div>
          </dl>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-x-8">
          <div className="relative h-[280px] w-[280px] rounded-xl bg-slate-100 backdrop-blur-sm"></div>
          <div className="h-[280px] w-[280px] rounded-xl bg-slate-100 backdrop-blur-sm"></div>
          <div className="h-[280px] w-[280px] rounded-xl bg-slate-100 backdrop-blur-sm"></div>
          <div className="h-[280px] w-[280px] rounded-xl bg-slate-100 backdrop-blur-sm"></div>
        </div>
      </div>
    </div>
  );
}

export default Features;
