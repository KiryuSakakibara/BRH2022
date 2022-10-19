import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Items from './pages/items';
import Recipes from './pages/recipes';

function App() {
  let Component
  switch (window.location.pathname){
    case "/":
      Component = <Home /> 
      break
    case "/items":
      Component = <Items />
      break
    case "/recipes":
      Component = <Recipes />
      break
  }
  return (
    <div className="App">
    <>
    < NavBar />
    {Component}
    </>
    {/* <div className="App">
      <header className="App-header">
      <p> Hello, Bob! </p>
      </header>
    </div> */}
    </div>
  );
}

export default App;
