"use client";
import { AvailableSlot, Booking } from "@/lib/types";
import Link from "next/link";
import { CalCalendar } from "@/app/component/cal-calendar";

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
  eventSlug: string;
  eventUserName: string;
  bookings: Booking[];
}

export const EventTypeView = ({
  eventType,
  eventTypeLink,
  eventSlug,
  eventUserName,
  bookings,
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

        <CalCalendar calendarSlug={eventSlug} userName={eventUserName} />

        {/* Bookings render */}
        <div className="bg-white rounded-lg shadow-md p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Bookings</h2>

          {bookings.length === 0 && (
            <p className="text-gray-500">No bookings found.</p>
          )}

          {bookings.length > 0 && (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {booking.title}
                      </h3>
                      <div className="space-y-1 text-sm text-gray-600">
                        <p>
                          <span className="font-medium">Date:</span>{" "}
                          {new Date(booking.startTime).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </p>
                        <p>
                          <span className="font-medium">Time:</span>{" "}
                          {new Date(booking.startTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}{" "}
                          -{" "}
                          {new Date(booking.endTime).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            },
                          )}
                        </p>
                        {booking.attendees && booking.attendees.length > 0 && (
                          <p>
                            <span className="font-medium">Attendees:</span>{" "}
                            {booking.attendees
                              .map((a) => `${a.name} (${a.email})`)
                              .join(", ")}
                          </p>
                        )}
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        booking.status === "accepted"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking.status}
                    </span>
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
