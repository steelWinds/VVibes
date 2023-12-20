<script lang="ts">
	import AppPexelsImagesList from '../AppUnsplashImagesList.svelte'

  export let Hst: Hst
</script>

<Hst.Story>
	<AppPexelsImagesList query="nude" />
</Hst.Story>
