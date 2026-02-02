"use server";

import type { CreateEventTypeInput } from "@/lib/types";
import { getApiKey } from "@/lib/auth";

export async function createEventType(input: CreateEventTypeInput) {
  try {
    const apiKey = await await getApiKey();

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

    // Note: API expects "length" not "lengthInMinutes" due to a typo in Cal.com's code
    const eventTypeData = {
      title,
      lengthInMinutes,
      slug,
    };

    const response = await fetch(`${process.env.CALCOM_URL}/event-types`, {
      method: "POST",
      headers: {
        "cal-api-version": "2024-06-14",
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventTypeData),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Cal.com API error:", error);
      return {
        success: false,
        error: error.message || "Failed to create event type",
      };
    }

    const data = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
