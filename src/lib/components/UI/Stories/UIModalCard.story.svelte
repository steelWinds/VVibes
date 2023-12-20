<script lang="ts">
	import UIModalCard from '../UIModalCard.svelte'

	export let Hst: Hst

</script>

<Hst.Story>
	<UIModalCard modalTitle="Modal title">
		<div slot="modal">
			Modal content
		</div>

		EXAMPLE TITLE
	</UIModalCard>
</Hst.Story>
