import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import homeImage from "../../assets/home-img.png";
import Item from "./Item";
import { nft } from "../../../declarations/nft/index";

function App() {

  const NFTID = "rrkah-fqaaa-aaaaa-aaaaq-cai";
  // to get the id we type dfx canister id nft(name of the canister)

  return (
    <div className="App">
      <Header />
      <Item id={NFTID}/> 
      {/* passing the prop, to get the id of the nft */}

      {/* <img className="bottom-space" src={homeImage} /> */}
      <Footer />
    </div>
  );
}

export default App;
