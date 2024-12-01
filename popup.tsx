import { useState } from "react";
import { useFirebase } from "~firebase/hook"
import "./style.css"
function IndexPopup() {
  const { user, isLoading, onLogin, onLogout } = useFirebase()
  let handleLogIn = () => {
    chrome.tabs.create({url: "tabs/index.html"});
  }
  return (
    <div className="container">
      {!user && <button className="btn btn-login" onClick={handleLogIn}>login?</button>}
      {user && <button className="btn btn-logout" onClick={() => onLogout()}>LogOut?</button>}
    </div>
  );
}

export default IndexPopup;