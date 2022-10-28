import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import WeatherInfo from './components/WeatherInfo'
import SignIn from './components/SignIn'
import Banner from './components/Banner'

function App() {
  

  return (
  
     
    <Routes>
      <Route exact path='/' element={< SignIn />}/>
      <Route exact path='/WeatherInfo' element={< WeatherInfo />} />
      <Route exact path='/Banner' element={< Banner />} />
    </Routes>
     
    
  );
}

export default App;
