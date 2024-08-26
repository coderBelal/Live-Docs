import   { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { onSnapshot, query, where, collection, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './firebase'; // Adjust the import based on your file structure

const Item = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    if (!user) {
      setDocuments([]);
      setLoading(false);
      return;
    }

    const q = query(collection(db, 'documents'), where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ id: doc.id, ...doc.data() });
      });
      setDocuments(docs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'documents', id));
      console.log('Document deleted!');
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="mx-auto max-w-5xl pt-6">
      {user && (
        <div className="flex justify-between text-white">
          <h1 className="text-2xl font-bold">All Documents</h1>
          <div className="flex space-x-2">
            <button onClick={() => navigate('/add-document')} className="bg-blue-700 p-2 rounded-md">
              + Start a blank document
            </button>
          </div>
        </div>
      )}
      <div className="pt-7">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center mb-4 shadow-lg">
            <div className="flex items-center">
              <div className="bg-blue-700 p-4 rounded-lg mr-4">
                <img src="https://img.icons8.com/ios-filled/50/ffffff/google-docs.png" alt="Document Icon" className="h-6 w-6" />
              </div>
              <div>
                <div className="text-white text-lg font-semibold">{doc.title}</div>
                <div className="text-gray-400 text-sm">Created {new Date(doc.time).toLocaleDateString()}</div>
              </div>
            </div>
            <button className="text-red-500 hover:text-red-600" onClick={() => handleDelete(doc.id)}>
              <FaTrashAlt size={20} />
            </button>
          </div>
        ))}
      </div>
      <footer className="flex justify-between">
        <button 
          className="text-white font-serif bg-blue-700 p-2 rounded-lg"
          onClick={() => window.open('https://wa.me/+8801568885065', '_blank')}
        >
          Chat with Dev..
        </button>
      </footer>
    </div>
  );
};

export default Item;
