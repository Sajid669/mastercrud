import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserList from './components/UserList';
import ViewUserDetails from './components/ViewUserDetails';
import UserEnteryForm from './components/UserEnteryForm';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/userlist" element={<UserList />} />
          <Route path="/viewuser/:id" element={<ViewUserDetails />} />
          <Route path="/userEntryForm/:formType/:id" element={<UserEnteryForm />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

