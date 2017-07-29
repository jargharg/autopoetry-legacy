// import $ from "jquery"

import TopNav from "./modules/TopNav"
import ShareLinks from "./modules/ShareLinks"
import PoemControls from "./modules/PoemControls"
import Poem from "./modules/Poem"
import PoemInput from "./modules/PoemInput"

const topNav = new TopNav()
const poem = new Poem()
const poemInput = new PoemInput(poem)
