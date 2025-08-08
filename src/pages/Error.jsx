import React from 'react'

const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-richblack-900 px-4">
      <h1 className="text-9xl font-extrabold text-red-600 mb-6">404</h1>
      <p className="text-2xl md:text-4xl font-semibold text-gray-700 mb-4">
        Oops! Page Not Found
      </p>
      <p className="text-gray-500 mb-8">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <a
        href="/"
        className="px-6 py-3 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
      >
        Go Home
      </a>
    </div>
  )
}

export default Error
