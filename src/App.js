import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Explore from "./pages/Explore";
import Offers from './pages/Offers';
import Category from "./pages/Category";
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword'
import Navbar from "./component/Navbar";
import PrivateRoute from "./component/PrivateRoute";
import CreateListing from "./pages/CreateListing";
import Listing from "./pages/Listing";
import Contact from "./pages/Contact";
import EditListing from "./pages/EditListing";
import {FaDev} from 'react-icons/fa'
import Devloper from "./component/Devloper";

function App() {
  const [showDevoloper, setShowDevoloper] = useState(false)

  const openDevComponent = () => setShowDevoloper(true)

  return (
    <>
      <Router>
      <button type='button'
       className='devBtnDiv'
       title="Contact Developer"
       onClick={openDevComponent}>
           <FaDev />
          </button>
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route path="/profile/edit-listing/:listingId" element={<EditListing />} />
          <Route path="/category/:ctegoryName/:listingId" element={<Listing />} />
          <Route path="/contact/:ownerId" element={<Contact />} />
        </Routes>
        <Navbar />
      </Router>
      {showDevoloper && <Devloper close={setShowDevoloper} />}
      <ToastContainer />
    </>
  );
}

export default App;
