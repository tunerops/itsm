import React from 'react';

export default function Index({ tickets }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">Tickets</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left border-b border-gray-200">
              <th className="py-2 px-4 font-semibold text-black">Title</th>
              <th className="py-2 px-4 font-semibold text-black">Status</th>
              <th className="py-2 px-4 font-semibold text-black">Priority</th>
              <th className="py-2 px-4 font-semibold text-black">Author</th>
            </tr>
          </thead>
          <tbody>
            {tickets && tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="py-2 px-4 text-black">{ticket.title}</td>
                  <td className="py-2 px-4 text-black">{ticket.status}</td>
                  <td className="py-2 px-4 text-black">{ticket.priority}</td>
                  <td className="py-2 px-4 text-black">{ticket.author?.name || 'Unknown'}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-center text-gray-500">
                  No tickets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
