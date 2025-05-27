import React from "react";
import hooli from "../../../assets/Hooli.png";
import lyft from "../../../assets/Lyft.png";
import robinHood from "../../../assets/RobinHood.png";
import stripe from "../../../assets/Stripe.png";
import aws from "../../../assets/Aws.png";
import reddit from "../../../assets/Reddit.png";

const ShopPageBrandIcons: React.FC = () => {
  return (
    <div className="container flex flex-col md:flex-row items-center justify-between space-y-6 space-x-6">
      <img src={hooli} alt="Hooli" className="h-20" />
      <img src={lyft} alt="Lyft" className="h-20" />
      <img src={robinHood} alt="robinHood" className="h-20" />
      <img src={stripe} alt="Stripe" className="h-20" />
      <img src={aws} alt="AWS" className="h-20" />
      <img src={reddit} alt="Reddit" className="h-20" />
    </div>
  );
};

export default ShopPageBrandIcons;
