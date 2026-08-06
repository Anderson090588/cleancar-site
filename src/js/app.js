import { Navbar } from "../components/navbar.js";
import { Hero } from "../components/hero.js";

document.getElementById("app").innerHTML = `
    ${Navbar()}
    ${Hero()}
`;