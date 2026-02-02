import Link from "next/link";
import { getEventTypes } from "../actions/getEventTypes";

export default async function EventTypesPage() {
  let eventTypes;
  let error = null;

  try {
    eventTypes = await getEventTypes();
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to fetch event types";
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Event Types</h1>
            <p className="text-gray-600 mt-2">
              View and manage your Cal.com event types
            </p>
          </div>
          <Link
            href="/event-types/create"
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            Create New Event Type
          </Link>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800 font-semibold">Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {eventTypes && eventTypes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">
              No event types found. Create your first event type to get started.
            </p>
            <Link
              href="/event-types/create"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
            >
              Create Event Type
            </Link>
          </div>
        )}

        {eventTypes && eventTypes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventTypes.map((eventType) => (
              <Link
                key={eventType.id}
                href={`/event-types/${eventType.id}`}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-200"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {eventType.title}
                </h2>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  {eventType.lengthInMinutes} minutes
                </div>
                {eventType.description && (
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {eventType.description.length > 120
                      ? `${eventType.description.substring(0, 120)}...`
                      : eventType.description}
                  </p>
                )}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-blue-600 text-sm font-medium hover:text-blue-700">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
