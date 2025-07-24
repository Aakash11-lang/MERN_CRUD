import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastProvider";
import UserTable from "./components/users/UserTable";
import AddUser from "./components/users/AddUser";
import SingleUser from "./components/users/SingleUser";
import UpdateUser from "./components/users/UpdateUser";

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="App" style={{ padding: "20px" }}>
          <div className="App" style={{ padding: "20px" }}>
            <Routes>
              <Route path="/" element={<UserTable />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/single-user/:userId" element={<SingleUser />} />
              <Route path="/edit-user/:userId" element={<UpdateUser />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;