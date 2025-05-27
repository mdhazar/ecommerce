import React from "react";
import Footer from "../layouts/Footer";
import Header from "../layouts/Header";
import LoginPageContent from "../layouts/LoginPageContent";

const Login: React.FC = () => {
  return (
    <div>
      <Header />
      <LoginPageContent />
      <Footer />
    </div>
  );
};

export default Login;
