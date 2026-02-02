import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Cal.com Coaching System
          </h1>
          <p className="text-xl text-gray-600">
            Manage your coaching appointments and event types
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            href="/event-types"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-200 group"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-lg mb-6">
              <svg
                className="w-8 h-8 text-blue-600"
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
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
              Event Types
            </h2>
            <p className="text-gray-600">
              Create and manage your coaching session types, durations, and
              availability settings.
            </p>
          </Link>

          <Link
            href="/bookings"
            className="bg-white rounded-lg shadow-md p-8 hover:shadow-lg transition-shadow border border-gray-200 group"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-lg mb-6">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-3 group-hover:text-green-600 transition-colors">
              Bookings
            </h2>
            <p className="text-gray-600">
              View all your scheduled appointments, attendee information, and
              meeting details.
            </p>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/event-types/create"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-700 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Create New Event Type
          </Link>
        </div>
      </div>
    </div>
  );
}
