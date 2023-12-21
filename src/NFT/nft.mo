import Debug "mo:base/Debug";
import Nat8 "mo:base/Nat8";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

// we will use actor classes here instead of just using actor since we will need to create multiple canisters for multiple nfts and we can't make them one by one.

// when we create actor we dont necessarily need to give arguements, but when we are making actor class then we need to specify arguements too, else it gives errors.

actor class NFT (name: Text, owner: Principal, content: [Nat8]) = this {
  
  let itemName = name;
  let nftOwner = owner;
  let imageBytes = content; 
  // every new canister is assigned a new principal id, which will uniquely identify that perticular image or resource.

  public query func getName() : async Text {
    // a public query function that returns text as output asynchronously from the canister
    return itemName;
  };

  public query func getOwner(): async Principal {
    return nftOwner;
  };

  public query func getAsset() : async [Nat8] {
    return imageBytes;
  };

// then we create an nft using the command in the readme.md file, by using your own principal of the canister (by: dfx identity get-principal) then run the command 

// get queries of the canister by: 
// dfx canister call nft getName
// dfx canister call nft getOwner
// dfx canister call nft getAsset 

  public query func getCanisterId() : async Principal {
    return Principal.fromActor(this);
  }

};