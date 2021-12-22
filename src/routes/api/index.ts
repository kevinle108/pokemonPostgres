import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const get = async (request) => {
  console.log('server GET')
  const response = await prisma.pokemon.findMany()
  // console.log(response);
  return {
    body: response
  }
}

export const del = async (request) => {
  console.log('server DELETE')
  const dbRes = await prisma.pokemon.delete({
    where: {
      id: parseInt(request.body)
    }
  })
  return {
    status: 200,
    body: dbRes
  }
}

export const patch =async (request) => {
  console.log(JSON.parse(request.body))
  let json = JSON.parse(request.body)
  const dbRes = await prisma.pokemon.update({
    where: {
      id: parseInt(json.id)
    },
    data: {
      name: json.name,
      imageUrl: json.url
    }
  })
  return {
    body: dbRes
  }
}

export const post =async (request) => {
  console.log('server POST')
  const requestBody = JSON.parse(request.body);
  let responseBody = [];
  const pokeId = request.body;
  const randId = Math.floor(Math.random() * 898) + 1;

  console.log('server got request:', requestBody);

  if (requestBody.action === 'generate-random-team') {
    console.log('server will generate random')
    let team = [];
    let all = Promise.all(Array.from(Array(6)).map(async (promise) => {
      const pokeApiRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898) + 1}`)
      const pokeApiData = await pokeApiRes.json();
        const name = pokeApiData.name[0].toUpperCase() + pokeApiData.name.substring(1);
        const id = pokeApiData.id;
        const imageUrl = pokeApiData.sprites.front_default;
        // console.log(name, id, imageUrl)
        team.push({
          name: name,
          pokedexNum: id,
          imageUrl: imageUrl
        });
    }))
    all.then(async (done) => {
      console.log('server POST promises done')
      const body = await prisma.pokemon.createMany({
        data: team
      })
      return {
        status: 200,
        body: body
      }
    });    
  } else {
    const pokeApiRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${requestBody.pokeNum}`)
    const pokeApiData = await pokeApiRes.json();
    const dbResCreateOne = await prisma.pokemon.create({
      data: {
        name: pokeApiData.name[0].toUpperCase() + pokeApiData.name.substring(1),
        pokedexNum: pokeApiData.id,
        imageUrl: pokeApiData.sprites.front_default
      }
    });
    return {
      status: 200,
      body: dbResCreateOne
  }
  }

  



  
  
  // let team = [];
  // for (let x = 0; x++; x > 6) {
  //   team[x] = await fetch(`https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 898) + 1}`)
    
  // }

  // generateTeam().then((teami) => {
  //   console.log('team: ', teami);
  //   team = teami;
  // }) 

  // const dbRes = await prisma.pokemon.createMany({
  //   data: team
  // });
  // console.log('dbRes', dbRes);
}