"use client";

import { useState, useTransition } from "react";
import { createEventType } from "@/app/actions/createEventType";
import type { CreateEventTypeInput } from "@/lib/types";

export default function CreateEventTypePage() {
  const [data, setData] = useState<CreateEventTypeInput>({
    lengthInMinutes: 0,
    slug: "",
    title: "",
  });
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(async () => {
      await createEventType(data);
    });
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create Event Type
          </h1>
          <p className="text-gray-600 mb-8">
            Create a new event type for your Cal.com scheduling
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Event Name
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                disabled={isPending}
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="e.g., 30 Minute Coaching Session"
                value={data.title}
                onChange={(e) =>
                  setData({
                    ...data,
                    title: e.target.value,
                    slug: e.target.value
                      .toLowerCase()
                      .replace(/\s+/g, "-")
                      .replace(/[^a-z0-9\-]/g, ""),
                  })
                }
              />
            </div>

            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Duration (minutes)
              </label>
              <input
                value={data.lengthInMinutes}
                onChange={(e) =>
                  setData({
                    ...data,
                    lengthInMinutes: parseInt(e.target.value, 10),
                  })
                }
                type="number"
                id="duration"
                name="duration"
                required
                min="1"
                disabled={isPending}
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="e.g., 30"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isPending ? "Creating..." : "Create Event Type"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
