const Docs = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-4 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
        Documentation
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Welcome to the ServiceHub technical documentation.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b pb-2">🚀 Getting Started</h2>
        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm">
          <p>git clone https://github.com/Shahriyar-Rahim/Syntecxhub_User_Management_System</p>
          <p>npm install</p>
          <p>npm run dev</p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-3 border-b pb-2">🛠 Tech Stack</h2>
        <ul className="list-disc ml-6 space-y-2">
          <li><strong>Frontend:</strong> React.js, Redux Toolkit, Tailwind CSS</li>
          <li><strong>Backend:</strong> Node.js, Express, MongoDB (Mongoose)</li>
          <li><strong>Auth:</strong> JSON Web Tokens (JWT) & Bcrypt</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 border-b pb-2">📡 API Endpoints</h2>
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 border">Method</th>
              <th className="px-4 py-2 border">Endpoint</th>
              <th className="px-4 py-2 border">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border text-green-600 font-bold">POST</td>
              <td className="px-4 py-2 border">/api/users/login</td>
              <td className="px-4 py-2 border">Authenticate user & get token</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border text-blue-600 font-bold">GET</td>
              <td className="px-4 py-2 border">/api/users</td>
              <td className="px-4 py-2 border">Fetch all users (Admin only)</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border text-green-600 font-bold">POST</td>
              <td className="px-4 py-2 border">/api/users</td>
              <td className="px-4 py-2 border">Create a new user (Admin only)</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border text-red-600 font-bold">DELETE</td>
              <td className="px-4 py-2 border">/api/users/:userId</td>
              <td className="px-4 py-2 border">Delete a user (Admin only)</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border text-green-600 font-bold">PUT</td>
              <td className="px-4 py-2 border">/api/users/:userId</td>
              <td className="px-4 py-2 border">Update a user (Admin only)</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border text-red-600 font-bold">DELETE</td>
              <td className="px-4 py-2 border">/api/users/logout</td>
              <td className="px-4 py-2 border">Logout user</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default Docs;