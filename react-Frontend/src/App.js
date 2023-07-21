
import './App.css';
import DoctorList from './Components/DoctorList';
import Footer from './Components/Footer';
import Index from './Components/Index';
import Navbar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Registration from './Components/Registration';
import Login from './Components/Login';
import Appointments from './Components/Appointments';
function App() {
  return (
    <div className="App">

      <Navbar />

      <Routes>
        <Route path='' element={<Index />}></Route>
        <Route exact path='/doctorlist' element={<DoctorList />} />
        <Route exact path='/signup' element={<Registration/>}/>
        <Route exact path='/SignIn' element={<Login />}/>
        <Route exact path='/appointments' element={<Appointments/>}/>
      </Routes>
      <Footer />

    </div>
  );
}

export default App;
