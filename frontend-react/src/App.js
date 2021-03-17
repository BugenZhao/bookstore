import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  )
}

function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to="/login" className="App-link" rel="noopener noreferrer">
          React {(() => "is good enough")()}
        </Link>
      </header>
    </div>
  );
}

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/">Back</Link>
    </div>
  )
}

export default App;
