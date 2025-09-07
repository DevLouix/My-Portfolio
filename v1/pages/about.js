import React from "react";
import AboutMe from '../components/views/AboutMe'
import { AboutMeToggler } from "../components/views/AboutMe/components/AboutMeToggler";

function about() {
  return (
    <>
      <AboutMeToggler>
        <AboutMe/>
      </AboutMeToggler>
    </>
  );
}

export default about;
