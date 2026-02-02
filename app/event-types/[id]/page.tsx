import Link from "next/link";
import { notFound } from "next/navigation";
import { getEventType } from "@/app/actions/getEventType";
import { getAvailableSlots } from "@/app/actions/getAvailableSlots";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventTypeDetailPage({ params }: PageProps) {
  const { id } = await params;

  let eventType;
  let availableSlots;
  let error = null;

  try {
    eventType = await getEventType(id);
  } catch (err) {
    if (err instanceof Error && err.message.includes("404")) {
      notFound();
    }
    error = err instanceof Error ? err.message : "Failed to fetch event type";
  }

  if (eventType) {
    try {
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 7); // Next 7 days

      availableSlots = await getAvailableSlots(id, startDate, endDate);
    } catch (err) {
      // Don't fail the whole page if slots fail
      console.error("Failed to fetch slots:", err);
    }
  }

  if (error) {
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
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800 font-semibold">Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!eventType) {
    return null;
  }

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
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

          {/* {eventType.locations && eventType.locations.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">
                Location
              </h3>
              <div className="space-y-2">
                {eventType.locations.map((location, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <svg
                      className="w-5 h-5 mr-2 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="capitalize">{location.type}</span>
                    {location.link && (
                      <span className="ml-2 text-blue-600">
                        ({location.link})
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )} */}
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
}
