import React from 'react'

const openPanel = (url) => {
  window.open(url, '_blank');
};

const services = [
  { name: 'Food Admin', url: 'http://localhost:5001/admin' },
  { name: 'E-Commerce Admin', url: 'http://localhost:5002/admin' },
  { name: 'Streaming Admin', url: 'http://localhost:5003/admin' },
  { name: 'Event Admin', url: 'http://localhost:5004/admin' },
];

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Admin Launcher</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl">
        {services.map((service, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition cursor-pointer text-center"
            onClick={() => openPanel(service.url)}
          >
            <h2 className="text-2xl font-semibold mb-2 text-blue-600">{service.name}</h2>
            <p className="text-gray-500">Open {service.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
