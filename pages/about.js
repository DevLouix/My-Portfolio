import React from "react";
import AboutMe from '../components/_LayoutComponents/AboutMe'
import { AboutMeToggler } from "../components/_LayoutComponents/AboutMe/AboutMeToggler";

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
