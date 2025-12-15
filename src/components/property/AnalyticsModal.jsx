import React from "react";
import { Line } from "react-chartjs-2";

export default function AnalyticsModal({ property, onClose }) {
  if (!property) return null;

  const analytics = property.analytics || {};

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-start py-10 z-[2000] overflow-y-auto">
      <div className="bg-white p-6 rounded-xl w-full max-w-3xl relative">

        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-xl text-gray-700"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">
          Analytics – {property.title}
        </h2>

        <div className="grid grid-cols-1 gap-6">

          {/* Views Chart */}
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Views (Last 30 Days)</h3>
            <Line
              data={{
                labels: analytics.views?.map(v => v.date) || [],
                datasets: [
                  {
                    label: "Views",
                    data: analytics.views?.map(v => v.count) || [],
                  },
                ],
              }}
            />
          </div>

          {/* Saves Chart */}
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Saves</h3>
            <Line
              data={{
                labels: analytics.saves?.map(v => v.date) || [],
                datasets: [
                  {
                    label: "Saves",
                    data: analytics.saves?.map(v => v.count) || [],
                  },
                ],
              }}
            />
          </div>

          {/* Inquiries */}
          <div className="p-4 rounded-lg border">
            <h3 className="font-semibold mb-2">Inquiries</h3>
            <p>Total: {analytics.inquiries?.length || 0}</p>

            <ul className="mt-2 text-sm">
              {(analytics.inquiries || []).map((inq, i) => (
                <li key={i}>
                  {inq.date} – {inq.type}
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>
    </div>
  );
}
