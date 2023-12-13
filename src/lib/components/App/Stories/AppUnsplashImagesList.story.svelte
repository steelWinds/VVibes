<script lang="ts">
	import AppPexelsImagesList from '../AppUnsplashImagesList.svelte'

  export let Hst: Hst
</script>

<Hst.Story>
	<AppPexelsImagesList query="abc123" />
</Hst.Story>
