import "./App.css";


import Header from "./layouts/header";
import NavBar from "./layouts/navbar";
import Footer from "./layouts/footer";
import NewCollection from "./components/ui/NewCollection";
import ShopCardSection from "./components/ui/shopCardSection";
 
function App() {
  return (
    <div>
      <Header></Header>
      <NavBar></NavBar>
      <NewCollection></NewCollection>
      <ShopCardSection></ShopCardSection>
      <Footer></Footer>
      
    </div>
  );
}

export default App;
