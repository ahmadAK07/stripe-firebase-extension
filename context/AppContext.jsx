
import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState
  } from "react"
  
  import { useFirebase } from "~firebase/hook"
  

  export const API_URL = "https://stripe-backend-pi-wheat.vercel.app"
  export const AppContext = createContext()
  

  export const AppProvider = ({ children }) => {
    const [subscriptionData, setSubscriptionData] = useState(null)
    const [loading, setLoading] = useState(false)
    const { user } = useFirebase()
  
    useEffect(() => {
      fetch(`${API_URL}/get-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: user?.email
        })
      })
        .then((response) => response.json())
        .then((data) => {
          console.log( "AppContext response to API_URL for customer: " , data)
          setSubscriptionData(data)
        })
    }, [user?.email])
  
    const value = {
      subscriptionData
    }
  
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
  }
  

  export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
      throw new Error("useAppContext must be used within an AppProvider")
    }
    return context
  }