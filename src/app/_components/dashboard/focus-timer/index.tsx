"use client";
import { useTimer } from "react-timer-hook";
import { Button } from "../../ui/button";
import { ProgressCircle } from "@tremor/react";
import { Pause, Play, RotateCcw } from "lucide-react";
import { SelectInterval } from "./select-interval";
import { useState, useEffect } from "react";
import { intervals } from "./intervals";

function FocusTimer() {
  const [interval, setInterval] = useState<string>("30 minutes");

  const selectedDuration: number =
    intervals.filter((i) => i.value === interval)[0]?.seconds ?? 0;

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + selectedDuration);

  const {
    totalSeconds: secondsLeft,
    seconds,
    minutes,
    hours,
    isRunning,
    start,
    pause,
    restart,
  } = useTimer({ expiryTimestamp });

  const progress = 1 - secondsLeft / selectedDuration;

  useEffect(() => {
    restart(expiryTimestamp, false);
  }, [interval]);

  return (
    <div className="w-full">
      <div className="mx-auto flex w-fit justify-start gap-3">
        <SelectInterval value={interval} setValue={setInterval} />
        <Button variant="outline" onClick={start} disabled={secondsLeft === 0}>
          <Play />
        </Button>
        <Button variant="outline" onClick={pause} disabled={secondsLeft === 0}>
          <Pause />
        </Button>
        <Button
          variant="outline"
          onClick={() => restart(expiryTimestamp, false)}
        >
          <RotateCcw />
        </Button>
      </div>

      <div className="mt-5">
        <ProgressCircle
          value={progress * 100}
          radius={120}
          strokeWidth={6}
          tooltip={`${Math.round(progress ? progress * 100 : 0)}%`}
        >
          <div className="text-4xl">
            <span>{hours >= 10 ? hours : `0${hours}`}</span>:
            <span>{minutes >= 10 ? minutes : `0${minutes}`}</span>:
            <span>{seconds >= 10 ? seconds : `0${seconds}`}</span>
          </div>
        </ProgressCircle>
      </div>
    </div>
  );
}

export default FocusTimer;
