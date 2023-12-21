import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/nft";
import { Principal } from "@dfinity/principal";
import App from "./App";

function Item(props) {
  
  const [name, setName] = useState();
  const [owner, setOwner] = useState();
  const [image, setImage] = useState();

  const id = Principal.fromText(props.id); 
  // to convert the string recieved from App.jsx into actual principal 

  // this will give us access to the canister holding that nft with that id
  // in order to access that canister we need a http command:

  const localHost = "http://localhost:8080/";
  const agent = new HttpAgent({host: localHost});

  // IDLFactory(Interface Description Language) it basically gives our frontend a translated version of our motoko backend, for js to know which method/function to be called in our canister. It's basically a translater.
  // idlFactory is present in declarations/nft/nft.did.js

  async function loadNFT() {
    const NFTActor = await Actor.createActor(idlFactory, {
      agent, 
      canisterId: id,
    });

    // to call the query functions:
    // this will give us the details of the nft and so we can update the front with backend directly.

    const name = await NFTActor.getName(); 
    setName(name);

    const owner = await NFTActor.getOwner();
    setOwner(owner.toText()); 
    // comes from Principal import to convert Principal to text

    const imageData = await NFTActor.getAsset();
    const imageContent = new Uint8Array(imageData);
    // since the data from backend is of Nat8 type, so Uint8Array.
    // to convert 8bitarray into an actual image url(like we use in img src): 
    const imageUrl = URL.createObjectURL(new Blob([imageContent.buffer], 
      {type: "image/png"}));
    setImage(imageUrl);

  };

  useEffect(() => {
    loadNFT();
  }, []);

  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
      {/* its gonna return three things in a card like structure: 
      1. image */}
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={image}
        />
        {/* 2. name of the NFT  */}
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            {name} 
            {/* react state variable */}
            <span className="purple-text"></span>
          </h2>
          {/* 3. Owner of the NFT */}
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: {owner}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
