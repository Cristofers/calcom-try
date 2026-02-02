"use server";

import { getApiKey } from "@/lib/server/getApiKey";
import type { Booking } from "@/lib/types";

interface GetAllBookingsProps {
  eventTypeID?: string;
}

export async function getAllBookings({
  eventTypeID,
}: GetAllBookingsProps): Promise<Booking[]> {
  const apiKey = getApiKey();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": "2024-08-13",
    },
  };

  let url = `${process.env.CALCOM_URL}/bookings`;
  if (eventTypeID) {
    url += `?eventTypeId=${eventTypeID}`;
  }
  console.log("url:", url);
  url = "https://api.cal.com/v2/bookings?eventTypeId=4604493";

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data || [];
}
