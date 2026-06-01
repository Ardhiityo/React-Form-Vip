import { useState } from "react";
import Product from "./components/ui/Product";
import Navbar from "./components/ui/Navbar";

function App() {
  const [session, setSession] = useState<string | null>("logged");
  return (
    <>
      <Navbar setSession={setSession} />
      {session && <Product />}
    </>
  );
}

export default App;
