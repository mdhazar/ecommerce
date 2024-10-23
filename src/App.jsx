import "./App.css";

import Header from "./layouts/header";
import NavBar from "./layouts/navbar";
import Footer from "./layouts/footer";
import NewCollection from "./components/ui/NewCollection";
import ShopCardSection from "./components/ui/shopCardSection";
import ShopSection from "./components/ui/shopSection";
import BuySection from "./components/ui/buySection";
import FeaturedProducts from "./components/ui/featuredProducts";

function App() {
  return (
    <div>
      <Header></Header>
      <NavBar></NavBar>
      <NewCollection></NewCollection>
      <ShopCardSection></ShopCardSection>
      <ShopSection></ShopSection>
      <BuySection></BuySection>
      <FeaturedProducts></FeaturedProducts>
      <Footer></Footer>
    </div>
  );
}

export default App;
