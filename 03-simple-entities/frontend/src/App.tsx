import Keycloak from 'keycloak-js';
import { useEffect, useRef, useState } from 'react';
import './App.css';



export const Protected = () => {
  const handleGetTags = async () => {
    await fetch("http://localhost:3000/tags/", {

    }).then(data => {
      console.log("🚀 ~ handleGetTags ~ data:", data)
      return
    })
  }
  return (
    <div>Protected
      <button onClick={handleGetTags}>Get tags</button>
    </div>
  )
}


export const NotProtected = () => {
  return (
    <div>NotProtected</div>
  )
}
const keycloak = new Keycloak({
  url: 'http://localhost:9090/',
  realm: 'test-realm',
  clientId: 'nest-app'
});


function App() {
  const keycloakRef = useRef(false)
  const [isLogin, setLogin] = useState<boolean>(false)
  console.log("🚀 ~ App ~ isLogin:", isLogin)


  useEffect(() => {
    if (keycloakRef.current) {
      return
    }
    keycloakRef.current = true
    keycloak.init({ onLoad: "login-required" }).then(res => {
      console.log("🚀 ~ useEffect ~ res:", res)
      return setLogin(res)
    })
  }, [])

  return (
    <>
      {isLogin ? <Protected /> : <NotProtected />}
    </>
  )
}

export default App
