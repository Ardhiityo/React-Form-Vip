import { useState } from "react";
import Product from "./components/ui/Product";
import Navbar from "./components/ui/Navbar";
import Login from "./components/ui/Login";

function App() {
  const [session, setSession] = useState<string | null>(null);
  return (
    <>
      <Navbar setSession={setSession} />
      {session ? <Product /> : <Login setSession={setSession} />}
    </>
  );
}

export default App;
