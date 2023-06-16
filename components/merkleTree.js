import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

// Address: 0x67711047df98Df68e0dbCc2e72e41Bd3e80990E1
// Leaf: 0xb1b608c97f1f246d84035e295d31e0fbd7270897ae867693c88f840df7c95175
// Root: 0xb30417ce7c8c8e5cb8edd5a0ce5cc193ab223585acad41dc61efee3905fe5e48
// Proof: [
//   '0x3f95ac4330da95c1fa6e4738abf9e1dd382f1d5cad0e1f3cff2945eb15cc4c50',
//   '0x5931b4ed56ace4c46b68524cb5bcbf4195f1bbaacbe5228fbd090546c88dd229'
// ]
// Verify Result: true

const Tree = () => {
  const values = [
    "0xB66c2eF27457e5bd3C50A14ab99b8414a8b6dCa2",
    "0x67711047df98Df68e0dbCc2e72e41Bd3e80990E1",
    "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
  ];

  const leaves = values.map((x) => keccak256(x));
  const tree = new MerkleTree(leaves, keccak256);
  const root = tree.getRoot().toString("hex");
  const leaf = keccak256("0x67711047df98Df68e0dbCc2e72e41Bd3e80990E1");
  const proof = tree.getProof(leaf);

  console.log("Address:", values[1]);
  console.log("Leaf:", `0x${leaf.toString("hex")}`);
  console.log("Root:", `0x${root}`);
  console.log(
    "Proof:",
    proof.map((x) => `0x${x.data.toString("hex")}`)
  );
  console.log("Verify Result:", tree.verify(proof, leaf, root)); // true
};

export default Tree;
