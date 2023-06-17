import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { whiteList } from "../data/whiteList.js";

const Tree = () => {
  const leaves = whiteList.map((x) => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  const root = tree.getRoot().toString("hex");
  const leaf = keccak256(whiteList[3]);
  const proof = tree.getProof(leaf);

  console.log("Address:", whiteList[3]);
  console.log("Leaf:", `0x${leaf.toString("hex")}`);
  console.log("Root:", `0x${root}`);
  console.log(
    "Proof:",
    proof.map((x) => `0x${x.data.toString("hex")}`)
  );
  console.log("Verify Result:", tree.verify(proof, leaf, root)); // true
};

export default Tree;
