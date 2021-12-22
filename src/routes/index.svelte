<script context="module">
  export const load = async ({fetch}) => {
    const response = await fetch('./api')
    const data = await response.json()
    const pokelist = data

    return {
      props: {
        pokelist
      }
    }
  }

</script>

<script>
  export let pokelist = []
  let pokeToAdd = ''
  let idInput;

  let idUpdate;
  let nameUpdate;
  let urlUpdate
  
  const addPoke = async () => {
    const res = await fetch('./api', {
      method: 'POST',
      body: JSON.stringify({
        action: 'add-single',
        pokeNum: pokeToAdd
      })
    });
    const data = await res.json()
    pokelist = await getAll();
  }

  const generateTeam = async () => {
    const res = await fetch('./api', {
      method: 'POST',
      body: JSON.stringify({
        action: 'generate-random-team'
      })
    });
    const data = await res.json()
    setTimeout(async () => {
      console.log('timeout done');
      pokelist = await getAll();
    }, 4000);
  }

  const updatePoke = async () => {
    let updateData = {
      id: idUpdate,
      name: nameUpdate,
      url: urlUpdate
    }

    const res = await fetch('./api', {
      method: 'PATCH',
      body: JSON.stringify(updateData)
    })
    const data = await res.json()
    pokelist = await getAll();
  }

  const deletePoke = async () => {
    const res = await fetch('./api', {
      method: 'DELETE',
      body: idInput
    })
    const data = await res.json();
    pokelist = await getAll();
  }

  async function getAll() {
    const response = await fetch('./api')
    const data = await response.json()
    return data;
  }
</script>
<label>Pokemon Number:
  <input type="text" bind:value={pokeToAdd}>
</label>
<button on:click={addPoke}>Add to Database</button>
<br>
<button on:click={generateTeam}>Generate Random Team</button>
<br>
<label>Pokemon ID:
  <input type="text" bind:value={idInput}>
</label>
<button on:click={deletePoke}>Delete from Database</button>
<br>
<label>Pokemon ID:
  <input type="text" bind:value={idUpdate}>
</label>
<label>New Name:
  <input type="text" bind:value={nameUpdate}>
</label>
<label>New Image:
  <input type="text" bind:value={urlUpdate}>
</label>
<button on:click={updatePoke}>Update</button>
<br>
<div class="list">
  {#each pokelist as pokemon}
    <div class="pokemon">
      <img src="{pokemon.imageUrl}" alt="bug">
      <h3>{pokemon.id}</h3>
      <h1>{pokemon.name}</h1><br>
      
    </div>

  {/each}
</div>


<style>

.list {
  width: 100%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.pokemon {
  display: flex;
  flex-direction: column;
  height: 220px;
  align-items: center;
  box-sizing: border-box;
  flex: 0 0 16%;
}
</style>