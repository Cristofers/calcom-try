"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { setApiKey } from "@/lib/auth";

export default function SetupPage() {
  const [apiKey, setApiKeyValue] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!apiKey.trim()) {
      setError("Please enter your Cal.com API key");
      return;
    }

    startTransition(async () => {
      try {
        await setApiKey(apiKey.trim());
        router.push("/event-types");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to save API key");
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome to Cal.com Manager
            </h1>
            <p className="text-gray-600">
              Enter your Cal.com API key to get started
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="apiKey"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Cal.com API Key
              </label>
              <input
                type="password"
                id="apiKey"
                value={apiKey}
                onChange={(e) => setApiKeyValue(e.target.value)}
                disabled={isPending}
                className="text-black w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="cal_live_..."
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Get your API key from{" "}
                <a
                  href="https://app.cal.com/settings/developer/api-keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Cal.com Settings
                </a>
              </p>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? "Saving..." : "Continue"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">How to get your API key:</p>
              <ol className="list-decimal list-inside space-y-1 text-gray-500">
                <li>Log in to your Cal.com account</li>
                <li>Go to Settings → Developer → API Keys</li>
                <li>Create a new API key or copy an existing one</li>
                <li>Paste it above and click Continue</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
