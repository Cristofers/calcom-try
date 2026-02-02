import { AvailableSlot } from "@/lib/types";
import { getApiKey } from "@/lib/server/getApiKey";
import { CALCOM_URL } from "@/lib/const";
import { TimeSlot } from "@/lib/types";

export async function getAvailableSlots(
  eventTypeId: string,
  startDate: Date,
  endDate: Date,
): Promise<AvailableSlot[]> {
  const apiKey = getApiKey();

  const startStr = startDate.toISOString().split("T")[0];
  const endStr = endDate.toISOString().split("T")[0];

  const options = {
    method: "GET",
    headers: {
      "cal-api-version": "2024-09-04",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  const response = await fetch(
    `${CALCOM_URL}/slots?start=${startStr}&end=${endStr}&eventTypeId=${eventTypeId}`,
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch available slots: ${response.statusText}`);
  }

  const result = await response.json();

  // Transform the response: data is an object with date keys
  // e.g., { "2026-02-03": [{ "start": "2026-02-03T09:00:00.000Z" }] }
  const availableSlots: AvailableSlot[] = [];
  if (result.data) {
    Object.entries(result.data).forEach(([date, slots]) => {
      const timeSlots: TimeSlot[] = (slots as Array<{ start: string }>).map(
        (slot) => {
          const dateTime = new Date(slot.start);
          const time = dateTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          return { time };
        },
      );

      availableSlots.push({
        date,
        slots: timeSlots,
      });
    });
  }

  return availableSlots;
}
