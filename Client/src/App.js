import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Homepage from "./Components/login-system/login";
import Home from "./Components/Home/Home";
import Register from "./Components/login-system/register";
import Notifications  from "./Components/Notifications/Notifications";
import Messenger from "./Components/messenger/Messenger";
import SearchBar from "./Components/Search/SearchBar";
import PeopleSearch from "./Components/peopleSearch/PeopleSearch";
import CountrySearch from "./Components/CountrySearch/CountrySearch";
import PostSearch from "./Components/PostSearch/PostSearch";
import PersonalProfile from './Components/PersonalProfile/PersonalProfile';
import OtherProfile from './Components/OtherProfile/OtherProfile';
import PostCountry from './Components/Post-Country/Post-Country';
import Uploader from "./Components/Uploader/Uploader";
import EditProfile from "./Components/EditProfile/EditProfile";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Homepage />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/Notifications" element={<Notifications />}></Route>
          <Route path="/messenger" element={<Messenger />}></Route>
          <Route path="/Search" element={<SearchBar />}></Route>
          <Route path="/CountrySearch" element={<CountrySearch />}></Route>
          <Route path="/PostSearch" element={<PostSearch />}></Route>
          <Route path="/peopleSearch" element={<PeopleSearch />}></Route>
          <Route path="/profile" element={<PersonalProfile />}></Route>
          <Route path="/profile/edit" element={<EditProfile />}></Route>
          <Route path="/profile/:userId" element={<OtherProfile />}></Route>
          <Route path="/profile/:userId/country/:countryId" element={<PostCountry />}></Route>
          <Route path="/add/country" element={<Uploader />}></Route>
          <Route path="/edit/country/:countryId" element={<Uploader />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
