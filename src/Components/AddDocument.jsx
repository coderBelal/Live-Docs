 
 
import   { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase'; // Adjust the import based on your file structure
import { getAuth } from 'firebase/auth';

const AddDocument = () => {
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert('You must be logged in to add a document.');
      return;
    }

    setLoading(true);

    try {
      await addDoc(collection(db, 'documents'), {
        title,
        time: new Date().toISOString(),
        userId: user.uid,
      });
      console.log('Document added!');
      navigate('/');
    } catch (error) {
      console.error('Error adding document:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-lg pt-6">
      <h1 className="text-2xl font-bold   text-white mb-4">Add New Document</h1>
      <form onSubmit={handleSubmit} className="bg-gray-800 p-4 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="title" className="block text-white mb-2">Document Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-600 bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-700 p-2 rounded-lg text-white"
        >
          {loading ? 'Saving...' : 'Save Document'}
        </button>
      </form>
    </div>
  );
};

export default AddDocument;
