"use server";

import type { CreateEventTypeInput } from "@/lib/types";

export async function createEventType(input: CreateEventTypeInput) {
  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) {
    return {
      success: false,
      error: "CAL_API_KEY environment variable is not set",
    };
  }

  const { lengthInMinutes, slug, title } = input;
  if (!title || !lengthInMinutes || !slug) {
    return {
      success: false,
      error: "All fields are required",
    };
  }
  if (lengthInMinutes <= 0) {
    return {
      success: false,
      error: "Duration must be a positive number",
    };
  }

  const eventTypeData: CreateEventTypeInput = {
    title,
    lengthInMinutes,
    slug,
  };

  try {
    await fetch(`${CALCOM_URL}/event-types`, {
      method: "POST",
      headers: {
        "cal-api-version": "2024-06-14",
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventTypeData),
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
