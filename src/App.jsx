import "./App.css";
import { Button } from "@/components/ui/button"

import Header from "./layouts/header";
import NavBar from "./layouts/navbar";
function App() {
  return <div>
    <Header></Header>
    <NavBar></NavBar>
    <Button>Click me</Button>
  </div>;
}

export default App;
