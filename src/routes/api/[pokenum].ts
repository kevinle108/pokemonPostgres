export const get =async (request) => {
  const pokeNum = request.params.pokenum
  console.log(pokeNum)
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`);
  const data = await res.json();
  console.log(data.forms[0].name);
  console.log('from server:', request)
  return {
    body: {
      name: data.name,
      url: data.sprites.front_default
    }
  }
}