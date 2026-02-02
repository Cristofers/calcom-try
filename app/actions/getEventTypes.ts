import { getApiKey } from "@/lib/server/getApiKey";
import { EventType } from "@/lib/types";

export async function getEventTypes(): Promise<EventType[]> {
  const apiKey = await getApiKey();

  const response = await fetch(`${process.env.CALCOM_URL!}/event-types`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": "2024-06-14",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch event types: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data || [];
}
