// const { MerkleTree } = require('merkletreejs');
// const keccak256 = require('keccak256');

// const { allowList } = require('../contracts/address');


// const leaves = allowList.map(x => keccak256(x));
// const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });


export const addressProof = async (address) => {
  // const leaf = keccak256(address);
  // const proof = tree.getProof(leaf).map(x => MerkleTree.bufferToHex(x.data));

  // return proof;

  console.log('running verify')

  let proof = await fetch(`http://localhost:8000/${address}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(value => value.data)
    .catch(err => console.log(err));

  console.log(proof);
  return proof;
}