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
      "cal-api-version": "2024-06-14",
    },
  };

  const url = new URL("/v2/bookings", "https://api.cal.com");
  url.searchParams.append("take", "100");
  if (eventTypeID) {
    url.searchParams.append("eventTypeId", eventTypeID);
  }

  const response = await fetch(url.toString(), options);
  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data.bookings || [];
}
