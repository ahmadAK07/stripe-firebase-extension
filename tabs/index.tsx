// src/tab/index.tsx
import React from "react"
import { AppProvider } from "~context/AppContext";
 import "../style.css"
 import Final from "~Components/Final"
import Loader from "~Components/Loader"
import Pricing from "~Components/pricing"
import { useFirebase } from "~firebase/hook"
import Login from "~Components/Login";
function Index() {
  
    const { user, isLoading, onLogin, onLogout } = useFirebase()
  const [testLoading, setTestLoading] = React.useState(true)
  const [isTutorialPage, setIsTutorialPage] = React.useState(true)
  const [isPricingPage, setIsPricingPage] = React.useState(true)

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setTestLoading(false)
    }, 700)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AppProvider>

      <div className="font-poppins">
        {user ? (<button onClick={()=>onLogout()}>Logout</button>) : (<></>)}
        {isLoading ? (
          <Loader />
        ) : !user ? (
          testLoading ? (
            <Loader />
          ) : (
            <Login onLogin={onLogin} />
          )
        ) : testLoading ? (
          <Loader />
        ) : (
          <>
            { isPricingPage ? (
              <Pricing setIsPricingPage={setIsPricingPage} />
              // <>price will be here {user.displayName}</>
            ) : (
              <Final user={user} />
              // <>final screen will be here {user.displayName}</>
            )}
          </>
        )}
      </div>
    </AppProvider>
  )
}

export default Index