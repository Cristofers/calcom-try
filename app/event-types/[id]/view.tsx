"use client";
import { AvailableSlot } from "@/lib/types";
import Link from "next/link";

interface EventTypeViewProps {
  eventType: {
    id: number;
    title: string;
    slug: string;
    description: string;
    length: number;
  };
  availableSlots: AvailableSlot[];
  eventTypeID: string;
  eventTypeLink: string;
}

export const EventTypeView = ({
  eventType,
  availableSlots,
  eventTypeLink,
}: EventTypeViewProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/event-types"
            className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
          >
            ← Back to Event Types
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {eventType.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">
                Duration
              </h3>
              <p className="text-lg text-gray-900">
                {eventType.length} minutes
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-1">Slug</h3>
              <p className="text-lg text-gray-900 font-mono">
                {eventType.slug}
              </p>
            </div>

            <div>
              <Link href={eventTypeLink} className="text-blue-500">
                {eventTypeLink}
              </Link>
            </div>
          </div>

          {eventType.description && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Description
              </h3>
              <p className="text-gray-700 whitespace-pre-wrap">
                {eventType.description}
              </p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Available Slots
          </h2>

          {!availableSlots && (
            <p className="text-gray-500">Loading available slots...</p>
          )}

          {availableSlots && availableSlots.length === 0 && (
            <p className="text-gray-500">
              No available slots found for the next 7 days.
            </p>
          )}

          {availableSlots && availableSlots.length > 0 && (
            <div className="space-y-6">
              {availableSlots.map((daySlots) => (
                <div
                  key={daySlots.date}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    {new Date(daySlots.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {daySlots.slots.map((slot, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 border border-blue-300 rounded-md text-blue-600 hover:bg-blue-50 hover:border-blue-400 transition-colors text-sm font-medium"
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
