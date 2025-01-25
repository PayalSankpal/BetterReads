import { BrowserRouter, Routes, Route } from "react-router-dom";

import Books from "./pages/Books";
import Update from "./pages/Update";
import Add from "./pages/Add";
import SignUp from "./pages/UserSignUp";
import SignIn from "./pages/UserSignIn";
import ToBeRead from "./pages/ToBeRead";
import Reading from "./pages/Reading";
import Read from "./pages/Read";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import Book from "./pages/Book"
import AddReview from "./pages/AddReview";
import FollowUsersPage from "./pages/FolloUsers";
import UpdateStatus from "./pages/UpdateStatus";
import AddToShelf from "./pages/AddToShelf"
import AuthorsPage from "./pages/Authors";
import UpdateAuthor from "./pages/UpdateAuthor";
import AddAuthor from "./pages/AddAuthor";
import AuthorPage from "./pages/Author";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./styles.css"



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Books/>}/>
          <Route path="/add" element={<Add/>}/>
          <Route path="/update/:id" element={<Update/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/to-be-read" element={<ToBeRead/>}/>
          <Route path="/read" element={<Read/>}/>
          <Route path="/reading" element={<Reading/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/update_profile/:id" element={<UpdateProfile/>}/>
          <Route path="/book/:book_id" element={<Book/>}/>
          <Route path="/review/:book_id" element={<AddReview/>}/>
          <Route path="/follow-users" element={<FollowUsersPage/>}/>
          <Route path="/update-status/:id" element={<UpdateStatus/>}/>
          <Route path="/add-to-shelf/:id" element={<AddToShelf/>}/>
          <Route path="/authors" element={<AuthorsPage/>}/>
          <Route path="/update-author/:id" element={<UpdateAuthor/>}/>
          <Route path="/add-author" element={<AddAuthor/>}/>
          <Route path="/author/:id" element={<AuthorPage/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
