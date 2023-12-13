<script lang="ts">
	import UIIconCard from '../UIIconCard.svelte'
	import { FaceMindBlowSolid } from 'flowbite-svelte-icons'

	export let Hst: Hst
</script>

<Hst.Story>
	<UIIconCard icon={FaceMindBlowSolid} title="SomeTitle" />
</Hst.Story>
