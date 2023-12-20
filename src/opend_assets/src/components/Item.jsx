import React from "react";
import logo from "../../assets/logo.png";

function Item(props) {

  const id = props.id; 
  // this will give us access to the canister holding that nft with that id
  
  return (
    <div className="disGrid-item">
      <div className="disPaper-root disCard-root makeStyles-root-17 disPaper-elevation1 disPaper-rounded">
      {/* its gonna return three things in a card like structure: 
      1. image */}
        <img
          className="disCardMedia-root makeStyles-image-19 disCardMedia-media disCardMedia-img"
          src={logo}
        />
        {/* name of the NFT  */}
        <div className="disCardContent-root">
          <h2 className="disTypography-root makeStyles-bodyText-24 disTypography-h5 disTypography-gutterBottom">
            CryptoDunks #312<span className="purple-text"></span>
          </h2>
          {/* Owner of the NFT */}
          <p className="disTypography-root makeStyles-bodyText-24 disTypography-body2 disTypography-colorTextSecondary">
            Owner: sdfsdf-erwerv-sdf
          </p>
        </div>
      </div>
    </div>
  );
}

export default Item;
