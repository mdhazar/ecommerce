import "./App.css";


import Header from "./layouts/header";
import NavBar from "./layouts/navbar";
import Footer from "./layouts/footer";
import NewCollection from "./components/ui/newCollection";
import ShopCardSection from "./components/ui/shopCardSection";
import ShopSection from "./components/ui/shopSection";
 
function App() {
  return (
    <div>
      <Header></Header>
      <NavBar></NavBar>
      <NewCollection></NewCollection>
      <ShopCardSection></ShopCardSection>
      <ShopSection></ShopSection>
      <Footer></Footer>
      
    </div>
  );
}

export default App;
