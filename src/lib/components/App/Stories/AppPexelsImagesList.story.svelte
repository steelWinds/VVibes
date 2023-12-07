<!-- Meow.story.svelte -->
<script lang="ts">
	import AppPexelsImagesList from '../AppUnsplashImagesList.svelte'

  export let Hst: Hst
</script>

<Hst.Story>
	<AppPexelsImagesList query="nature" />
</Hst.Story>
