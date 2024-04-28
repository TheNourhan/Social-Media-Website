import "./App.css";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom"
import Homepage from "./Components/login-system/login";
import Home from "./Components/Home/Home";
import Register from "./Components/login-system/register";
import Notifications  from "./Components/Notifications/Notifications";
import Messenger from "./Components/messenger/Messenger";
import SearchBar from "./Components/Search/SearchBar";
import PersonalProfile from './Components/PersonalProfile/PersonalProfile';
import OtherProfile from './Components/OtherProfile/OtherProfile';
import PostCountry from './Components/Post-Country/Post-Country';
import Uploader from "./Components/Uploader/Uploader";
import EditProfile from "./Components/EditProfile/EditProfile";
import Validate from "./Components/login-system/Validate";
import ConnectionList from './Components/connection/ConnectionList';

function App() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/validate" element={<Validate />}></Route>
          {/* Routes requiring authentication */}
          <Route path="/home" element={currentUser ? <Home /> : <Navigate to="/" />} />
          <Route path="/Notifications" element={currentUser ? <Notifications /> : <Navigate to="/" />} />
          <Route path="/messenger" element={currentUser ? <Messenger /> : <Navigate to="/" />} />
          <Route path="/Search" element={currentUser ? <SearchBar /> : <Navigate to="/" />} />
          <Route path="/profile" element={currentUser ? <PersonalProfile /> : <Navigate to="/" />} />
          <Route path="/profile/edit" element={currentUser ? <EditProfile /> : <Navigate to="/" />} />
          <Route path="/profile/:userId" element={currentUser ? <OtherProfile /> : <Navigate to="/" />} />
          <Route path="/profile/:userId/country/:countryId" element={currentUser ? <PostCountry /> : <Navigate to="/" />} />
          <Route path="/add/country" element={currentUser ? <Uploader /> : <Navigate to="/" />} />
          <Route path="/edit/country/:countryId" element={currentUser ? <Uploader /> : <Navigate to="/" />} />
          <Route path="/profile/:userId/following" element={currentUser ? <ConnectionList /> : <Navigate to="/" />} />
          <Route path="/profile/:userId/followers" element={currentUser ? <ConnectionList /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
