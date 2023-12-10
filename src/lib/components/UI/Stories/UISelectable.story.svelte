<script lang="ts">
	import UISelectable from '../UISelectable.svelte'
  import { onMount } from 'svelte'
	import { random } from 'lodash-es'

  const imageModules = import.meta.glob('../../../../tested-images/*.{jpg,png,jpeg,webp}')

	export let Hst: Hst

	const promises = Object.values(imageModules).map(v => v())
	const awaited = Promise.allSettled(promises)

	let images: string[] = []
	let isActive = false

	onMount(async () => {
		images = (await awaited).map((v) => v.value.default).slice(0, 21)
	})
</script>

<Hst.Story>
	{#if images.length > 0}
		<UISelectable active={isActive} on:toggle={() => (isActive = !isActive)}>
			<img src={images[random(0, 20)]} alt="Girl" class="w-[600px] bg-red-100" />
		</UISelectable>
	{/if}
</Hst.Story>
