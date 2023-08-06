const { MerkleTree } = require('merkletreejs');
const keccak256 = require('keccak256');

const { allowList } = require('../contracts/address');


const leaves = allowList.map(x => keccak256(x));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });


export const addressProof = (address) => {
  const leaf = keccak256(address);
  const proof = tree.getProof(leaf).map(x => MerkleTree.bufferToHex(x.data));

  return proof;
}