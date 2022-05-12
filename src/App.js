/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { getUser, logout } from './services/fetch-utils';
import { BrowserRouter as Router, Switch, NavLink, Route, Redirect } from 'react-router-dom';
import AuthPage from './AuthPage';
import UpdatePage from './UpdatePage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';
import './App.css';

export default function App() {
  // You'll need to track the user in state
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');

  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    const user = getUser();

    if (user) {
      setToken(user.access_token);
      setEmail(user.user.email);
    }
  }, []);

  async function handleLogout() {
    // call the logout function
    // clear the user in state
    await logout();
    setEmail('');
    setToken('');
  }

  return (
    <Router>
      <div className="App">
        <header className="">
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/create"
                  className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}
                >
                  Create
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/board-games"
                  className={(isActive) => 'nav-link' + (!isActive ? ' unselected' : '')}
                >
                  List{' '}
                </NavLink>
              </li>
              <li>
                <button onClick={handleLogout}>LogOut</button>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <Switch>
            <Route exact path="/">
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
              {token ? (
                <Redirect to="/board-games" />
              ) : (
                <AuthPage setEmail={setEmail} setToken={setToken} />
              )}
            </Route>
            <Route exact path="/board-games">
              Click a game to update your game inventory
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
              {token ? <ListPage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/board-games/:id">
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
              {token ? <UpdatePage /> : <Redirect to="/" />}
            </Route>
            <Route exact path="/create">
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
              {token ? <CreatePage /> : <Redirect to="/" />}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}
