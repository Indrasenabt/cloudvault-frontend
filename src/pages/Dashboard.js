import React, { useEffect, useState } from 'react';
import { getMyFiles, deleteFile } from '../services/fileService';

function Dashboard() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const res = await getMyFiles();
      console.log('Files API Response:', res.data); // Debug log
      if (res.data.length > 0) {
        setFiles(res.data);
      } else {
        setFiles([]);
        alert(res.data?.msg || 'Unexpected response from server.');
      }
    } catch (err) {
      console.error('Fetch files failed:', err);
      alert('Failed to load files');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this file?')) return;
    try {
      await deleteFile(id);
      setFiles(files.filter(f => f._id !== id));
    } catch (err) {
      alert('Delete failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://maverickphilosopher.typepad.com/.a/6a010535ce1cf6970c0240a519f857200b-pi')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-700">📊 Your Uploaded Files</h2>
          <button 
            onClick={handleLogout} 
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            🚪 Logout
          </button>
        </div>

        {files.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">No files uploaded yet.</p>
            <button
              onClick={() => window.location.href = '/upload'}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              📤 Upload Your First File
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {files.map(file => (
              <div
                key={file._id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-sm hover:bg-gray-200 transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-blue-600 mr-3 text-lg">📄</span>
                  <span className="text-gray-800 font-medium">{file.originalName}</span>
                </div>
                <button
                  onClick={() => handleDelete(file._id)}
                  className="bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 transition-colors"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => window.location.href = '/upload'}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            ➕ Upload New File
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
