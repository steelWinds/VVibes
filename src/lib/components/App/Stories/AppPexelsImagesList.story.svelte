<!-- Meow.story.svelte -->
<script lang="ts">
	import AppPexelsImagesList from '../AppPexelsImagesList.svelte'

  export let Hst: Hst
</script>

<Hst.Story>
	<AppPexelsImagesList query="nature" />
</Hst.Story>
