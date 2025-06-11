import React, { useState } from 'react';
import { uploadFile } from '../services/fileService';

function Upload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      alert('Please select a file');
      return;
    }

    console.log('=== UPLOAD DEBUG INFO ===');
    console.log('Selected file:', file);
    console.log('File name:', file.name);
    console.log('File size:', file.size);
    console.log('File type:', file.type);

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      // Debug FormData
      console.log('FormData created');
      for (let [key, value] of formData.entries()) {
        console.log(`FormData key: ${key}, value:`, value);
      }
      
      console.log('Calling uploadFile...');
      const response = await uploadFile(formData);
      console.log('Upload successful, response:', response);
      
      alert('File uploaded successfully!');
      setFile(null);
      e.target.reset();
    } catch (err) {
      console.error('=== UPLOAD ERROR ===');
      console.error('Full error object:', err);
      console.error('Error message:', err.message);
      console.error('Error response:', err.response);
      console.error('Error response data:', err.response?.data);
      console.error('Error response status:', err.response?.status);
      console.error('Error response headers:', err.response?.headers);
      
      const errorMessage = err?.response?.data?.message || 
                          err?.response?.data?.msg || 
                          err?.response?.data?.error ||
                          err?.message || 
                          'Upload failed - unknown error';
      
      alert(`Upload failed: ${errorMessage}`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8d3JpdGluZ3xlbnwwfHwwfHx8MA%3D%3D')",
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white bg-opacity-90 p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-700 text-center">📤 Upload File</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Choose File
          </label>
          <input
            type="file"
            onChange={handleFileChange}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            accept=".pdf,.doc,.docx,.txt"
          />
        </div>

        {file && (
          <div className="mb-4 p-3 bg-gray-100 rounded">
            <p className="text-sm text-gray-600">Selected: {file.name}</p>
            <p className="text-xs text-gray-500">Size: {(file.size / 1024).toFixed(2)} KB</p>
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default Upload;