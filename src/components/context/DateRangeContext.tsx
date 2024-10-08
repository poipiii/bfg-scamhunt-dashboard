"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

interface DateRangeContextType {
  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined
);

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(addDays(new Date(), -7).setHours(0, 0, 0, 0)),
    to: new Date(new Date().setHours(0, 0, 0, 0)),
  });

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  );
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error("useDateRange must be used within a DateRangeProvider");
  }
  return context;
}
