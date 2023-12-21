import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import NFTActorClass  "../NFT/nft";

actor OpenD {
//  this is the main backend part where all the created nfts and their details will be stored.

public shared(msg) func mint(imgData: [Nat8], name: Text) : async Principal {
  let owner : Principal = msg.caller;

  Debug.print(debug_show(Cycles.balance())); // to check num of cycles before
  // for the program to run on the online IC, we create cycles
  Cycles.add(100_500_000_000);


  // this class will be used to create new NFTs
  let newNFT = await NFTActorClass.NFT(name, owner, imgData);
  // the actor class needs the information (arguements as specified.)
  
  Debug.print(debug_show(Cycles.balance())); // to check num of cycles after

  let newNFTPrincipal = await newNFT.getCanisterId();
  // this will fetch the principal of this (that) nft being entered

  return newNFTPrincipal
  }
};
