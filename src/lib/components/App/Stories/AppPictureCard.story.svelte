<!-- Meow.story.svelte -->
<script lang="ts">
	import AppPictureCard from '../AppPictureCard.svelte'
	import { onMount } from 'svelte'
	import { random } from 'lodash-es'

  const imageModules = import.meta.glob('../../../../tested-images/*.{jpg,png,jpeg,webp}')

	export let Hst: Hst

	const promises = Object.values(imageModules).map(v => v())
	const awaited = Promise.allSettled(promises)

	let images: string[] = []

	onMount(async () => {
		images = (await awaited).map((v) => v.value.default).slice(0, 21)
	})
</script>

<Hst.Story>
	{#if images.length > 0}
		<AppPictureCard src={images[random(0, 20)]} />
	{/if}
</Hst.Story>
