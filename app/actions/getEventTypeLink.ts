import { CALCOM_URL } from "@/lib/const";
import { getApiKey } from "@/lib/server/getApiKey";

export async function getEventTypeLink(id: string): Promise<{
  username: string;
  slug: string;
  link: string;
}> {
  const apiKey = getApiKey();

  //   Coach User
  const userResponse = await fetch(`${CALCOM_URL}/me`, {
    headers: {
      "cal-api-version": "2024-08-13",
      Authorization: `Bearer ${apiKey}`,
    },
  });
  if (!userResponse.ok) {
    throw new Error(`Failed to fetch user info: ${userResponse.statusText}`);
  }
  const userData = await userResponse.json();
  console.log("userData->", userData);

  //   Event Type
  const eventTypeResponse = await fetch(`${CALCOM_URL}/event-types/${id}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
    },
    next: { revalidate: 60 },
  });
  if (!eventTypeResponse.ok) {
    throw new Error(
      `Failed to fetch event type: ${eventTypeResponse.statusText}`,
    );
  }
  const eventTypeData = await eventTypeResponse.json();
  console.log("eventTypeData->", eventTypeData);

  return {
    username: userData.data.username as string,
    slug: eventTypeData.data.eventType.slug as string,
    link: `https://cal.com/${userData.data.username}/${eventTypeData.data.eventType.slug}`,
  };
}
