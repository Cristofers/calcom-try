export function getApiKey() {
  const apiKey = process.env.CAL_API_KEY;
  if (!apiKey) {
    throw new Error("CAL_API_KEY environment variable is not set");
  }
  return apiKey;
}
