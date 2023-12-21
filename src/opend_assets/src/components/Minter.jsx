import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { opend } from "../../../declarations/opend";
import { Principal } from "@dfinity/principal";
import Item from "./Item";

function Minter() {

  // to get the input data from the form (in the front-end) we are using a module called React Hook Form (kind of like how we use useState()), for that first we register the form:
  const {register, handleSubmit} = useForm();
    // register object, action
  const [nftPrincipal, setNFTPrincipal] = useState("");
  const [loaderHidden, setLoaderHidden] = useState(true);

  async function onSubmit(data) { 
    setLoaderHidden(false);
    // to set loader visible when newNFTID generating

    // console.log(data.name);
    // console.log(data.image);
    const name = data.name;
    const image = data.image[0];
    const imageArray = await image.arrayBuffer();
    const imageByteData = [...new Uint8Array(imageArray)];
    // converts the image into an 8bitArray

    // now passing the user input to the motoko backend and linking f and b end together
    const newNFTID = await opend.mint(imageByteData, name);
    console.log(newNFTID.toText());
    // after all the update made in the code we redeploy dfx deploy ~arguments-(from readme.md)
    setNFTPrincipal(newNFTID);
    // to set the new nftID we just created 
    setLoaderHidden(true);
   }
  
   if (nftPrincipal == "") {
    return (
    <div className="minter-container">
    {/* to identify that the minting process is taking place */}
      <div hidden={loaderHidden} className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3 className="makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
        Create NFT
      </h3>
      <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
        Upload Image
      </h6>
      <form className="makeStyles-form-109" noValidate="" autoComplete="off">
        <div className="upload-container">

        {/* input for the nft image */}
          <input 
            {...register("image", {required: true})}
            className="upload"
            type="file"
            accept="image/x-png,image/jpeg,image/gif,image/svg+xml,image/webp"
          />
        </div>
        <h6 className="form-Typography-root makeStyles-subhead-102 form-Typography-subtitle1 form-Typography-gutterBottom">
          Collection Name
        </h6>
        <div className="form-FormControl-root form-TextField-root form-FormControl-marginNormal form-FormControl-fullWidth">
          <div className="form-InputBase-root form-OutlinedInput-root form-InputBase-fullWidth form-InputBase-formControl">

          {/* input fot the name of the nft */}
            <input
            {...register("name", {required: true})}
            // what are we registering ? name.
              placeholder="e.g. CryptoDunks"
              type="text"
              className="form-InputBase-input form-OutlinedInput-input"
            />
            <fieldset className="PrivateNotchedOutline-root-60 form-OutlinedInput-notchedOutline"></fieldset>
          </div>
        </div>
        <div className="form-ButtonBase-root form-Chip-root makeStyles-chipBlue-108 form-Chip-clickable">
          <span onClick={handleSubmit(onSubmit)} className="form-Chip-label">Mint NFT</span>
        </div>
      </form>
    </div>
  ); 
} else {
    return (
    <div className="minter-container">
        <h3 className="Typography-root makeStyles-title-99 Typography-h3 form-Typography-gutterBottom">
          Minted!
        </h3>
        <div className="horizontal-center">
          <Item id={nftPrincipal.toText()}/>
        </div>
      </div>
    );
  }
}

export default Minter;
