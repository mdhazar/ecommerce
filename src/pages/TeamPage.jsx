import React from "react";

import NavBar from "../layouts/navbar";
import Footer from "../layouts/footer";
import TeamSection1 from "../components/ui/TeamPage/TeamSection1";
import TeamSection2 from "../components/ui/TeamPage/TeamSection2";
import TeamSection3 from "../components/ui/TeamPage/TeamSection3";
import TeamSection4 from "../components/ui/TeamPage/TeamSection4";

function TeamPage() {
  return (
    <div>
      <NavBar />
      <TeamSection1 />
      <TeamSection2 />
      <TeamSection3 />
      <TeamSection4 />
      <Footer />
    </div>
  );
}

export default TeamPage;
