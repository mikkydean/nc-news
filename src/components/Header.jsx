import { Link } from "react-router-dom";
import { UserContext } from "../contexts/User";
import NavBar from "./NavBar";
import { useContext } from "react";

function Header() {
  const { isLoggedIn, currentUser, setCurrentUser, userAvatar, setUserAvatar } = useContext(UserContext) 


  const handleLogin = () => {
    setCurrentUser('tickle122')
    setUserAvatar('https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953')
  }

  const handleLogout = () => {
    setCurrentUser('')
    setUserAvatar('')
  }

  return (
    <header>
    <div className="right-align-header"> 
    {isLoggedIn ? <button className="login" onClick={handleLogout}>Log out</button> : <button className="login" onClick={handleLogin}>Log in</button>}
      <Link to={`/users/${currentUser}`}>
    {isLoggedIn && <div><img className="avatar inline" src={userAvatar}/> <p className="inline">{currentUser}</p></div>}
    </Link>
    </div>
      <h1>NC News</h1>
      <NavBar />
      </header>
  );
}

export default Header;
