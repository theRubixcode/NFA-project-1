export const addressProof = async (address) => {
  let proof = await fetch(`http://localhost:8000/${address}`, {
    method: 'GET'
  })
    .then(res => res.json())
    .then(value => value.data)
    .catch(err => console.log(err));
  return proof;
}