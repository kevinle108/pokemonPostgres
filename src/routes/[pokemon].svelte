<script context="module">
  export const load = async ({fetch, page}) => {
    console.log('from module:', page.params);
    const res = await fetch(`/api/${page.params.pokemon}`);
    const data = await res.json();
    console.log(data); 
    return {
      props: {
        name: data.name,
        url: data.url
      }
    }
  }
</script>

<script>
  export let name;
  export let url;

</script>

<h1>{name.toUpperCase()}</h1>
<img src="{url}" alt="">

<style>

</style>