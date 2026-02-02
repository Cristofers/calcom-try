"use client";
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

interface CalCalendarProps {
  userName: string;
  calendarSlug: string;
}

export const CalCalendar = ({ calendarSlug, userName }: CalCalendarProps) => {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: calendarSlug });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, [calendarSlug]);
  return (
    <Cal
      namespace={calendarSlug}
      calLink={`${userName}/${calendarSlug}`}
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view", useSlotsViewOnSmallScreen: "true" }}
    />
  );
};
