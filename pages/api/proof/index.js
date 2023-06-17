import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";
import { whiteList } from "../../../data/whiteList.js";

function getTree(values) {
  const leaves = values.map((x) => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
  return tree;
}

export default function handler(req, res) {
  if (req.method !== "GET") {
    res.status(400).json({ message: "Only GET requests allowed" });
    return;
  }

  const tree = getTree(whiteList);
  const address = req.query.address;
  console.log("address:", address);
  console.log("root:", tree.getRoot().toString("hex"));
  const leaf = keccak256(address);
  const proof = tree.getProof(leaf).map((x) => `0x${x.data.toString("hex")}`);
  console.log("proof:", proof);
  res.status(200).json(proof);
}
