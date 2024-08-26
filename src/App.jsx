
import  { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Item from './Components/Item';
import Navbar from './Components/Navbar';
import AddDocument from './Components/AddDocument';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
import Register from './Components/Register';

const App = () => {
  const [documents, setDocuments] = useState([]);

  const addDocument = (title, time) => {
    setDocuments([...documents, { title, time }]);
    toast.success('Document added successfully');
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Item addDocument={addDocument} />} />
        <Route path="/add-document" element={<AddDocument />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default App;
