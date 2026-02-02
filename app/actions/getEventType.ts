import { getApiKey } from "@/lib/server/getApiKey";

export async function getEventType(id: string): Promise<{
  id: number;
  title: string;
  slug: string;
  description: string;
  length: number;
}> {
  const apiKey = getApiKey();

  const response = await fetch(`${process.env.CALCOM_URL!}/event-types/${id}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch event type: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.eventType;
}
