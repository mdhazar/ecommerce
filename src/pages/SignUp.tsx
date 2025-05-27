import React from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import SignUpContent from "../layouts/SignUpContent";

const SignUp: React.FC = () => {
  return (
    <div>
      <Header />
      <SignUpContent />
      <Footer />
    </div>
  );
};

export default SignUp;
