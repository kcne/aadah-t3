"use client";
import React from "react";
import FocusTimer from "~/app/_components/dashboard/focus-timer";

function FocusTimerPage({}) {
  return (
    <>
      <div className="h-full w-full p-10 pt-5">
        <div>
          <FocusTimer />
        </div>
      </div>
    </>
  );
}

export default FocusTimerPage;
