"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "cal_api_key";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days in seconds

export async function setApiKey(apiKey: string): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, apiKey, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function getApiKey(): Promise<string> {
  const cookieStore = await cookies();
  const apiKey = cookieStore.get(COOKIE_NAME)?.value;

  if (!apiKey) {
    throw new Error("API key not found. Please set up your Cal.com API key.");
  }

  console.log("apiKey", apiKey);
  return apiKey;
}

export async function hasApiKey(): Promise<boolean> {
  const cookieStore = await cookies();
  return !!cookieStore.get(COOKIE_NAME)?.value;
}

export async function clearApiKey(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
