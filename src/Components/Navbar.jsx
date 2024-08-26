 
 
import   { useState, useEffect } from 'react';
 
import { IoNotifications } from 'react-icons/io5';
import file from '../assets/file.png';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const notifications = [
  {
    title: "New Friend Request",
    message: "You have a new friend request from John Doe.",
    timestamp: "2 minutes ago",
  },
  {
    title: "Message Received",
    message: "You received a new message from Jane Smith.",
    timestamp: "10 minutes ago",
  },
  {
    title: "Event Reminder",
    message: "Don't forget about the meeting tomorrow!",
    timestamp: "1 hour ago",
  },
  {
    title: "New Friend Request",
    message: "You have a new friend request from John Doe.",
    timestamp: "2 minutes ago",
  },
  {
    title: "Message Received",
    message: "You received a new message from Jane Smith.",
    timestamp: "10 minutes ago",
  },
];

function Navbar() {
  const [noti, setNoti] = useState(false);
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log(user); // Check user object
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleNotification = () => {
    setNoti(!noti);
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="p-4 flex flex-col sm:flex-row items-center justify-between  ">
      <div className='flex justify-between items-center w-full sm:w-auto'>
        <div className='flex items-center'>
          <img src={file} alt="file" className='w-8' />
          <h1 className='text-white ml-2 text-xl font-bold hidden sm:block'>LiveDocs</h1>
        </div>
        <button
          className='text-white bg-blue-700  font-serif p-2    rounded-md sm:hidden '
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          Menu
        </button>
      </div>

      <div className={`flex-col sm:flex-row flex items-center justify-between w-full sm:w-auto ${isMenuOpen ? 'flex' : 'hidden'} sm:flex`}>
        <div className='flex gap- items-center'>
          <Link to={"/"}>
            <div className="text-white font-serif p-2  rounded-lg">Home</div>
          </Link>
 
        </div>
        
        <div className='relative'>
          <IoNotifications className='text-xl text-white cursor-pointer' onClick={handleNotification} />
          {noti && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 text-white shadow-lg rounded-lg overflow-hidden z-50 bg-blue-950">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold">Notifications</h3>
              </div>
              <div className="max-h-60 overflow-auto scrollbar-hidden">
                {notifications.map((notification, index) => (
                  <div key={index} className="p-4 border-b border-gray-200">
                    <h4 className="text-sm font-semibold">{notification.title}</h4>
                    <p className="text-gray-300">{notification.message}</p>
                    <span className="text-gray-400 text-xs">{notification.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className='flex items-center gap-3'>
          {user ? (
            <>
              <img src={user.photoURL || 'default-avatar.png'} alt="user" className='w-[40px] ml-2 pb-5 rounded-full' />
              <span className='text-white bg-blue-700 p-2 rounded-lg'>{user.displayName || "Unknown User"}</span>
              <button onClick={handleLogout} className="text-white font-serif bg-red-600 p-2 rounded-lg">Logout</button>
            </>
          ) : (
            <Link to={"/register"}>
              <button className="text-white font-serif bg-blue-700 p-2 rounded-lg">Create an Account</button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
