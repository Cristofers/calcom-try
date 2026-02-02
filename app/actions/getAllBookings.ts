"use server";

import { getApiKey } from "@/lib/server/getApiKey";
import type { Booking } from "@/lib/types";

export async function getAllBookings(): Promise<Booking[]> {
  const apiKey = getApiKey();
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "cal-api-version": "2024-06-14",
    },
  };

  const response = await fetch(
    "https://api.cal.com/v2/bookings?take=100",
    options,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch bookings: ${response.statusText}`);
  }

  const result = await response.json();
  return result.data.bookings || [];
}
