"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import { Button } from "~/app/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/app/_components/ui/command";
import { cn } from "~/utils/utils";
import { intervals } from "../intervals";

interface Props {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}
export function SelectInterval({ value, setValue }: Props) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? intervals.find((interval) => interval.value === value)?.label
            : "Select duration..."}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Select Duration..." className="h-9" />
          <CommandEmpty>No Duration Found.</CommandEmpty>
          <CommandGroup>
            {intervals.map((interval) => (
              <CommandItem
                key={interval.value}
                value={interval.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                {interval.label}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    value === interval.value ? "opacity-100" : "opacity-0",
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
