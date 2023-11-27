<script context="module" lang="ts">
	import { register } from 'swiper/element/bundle'

	register()
</script>

<script lang="ts" generics="T">
	import { onMount } from 'svelte'

	export let data: T[] = []

	onMount(() => {
		const swiperEl = document.querySelector('swiper-container')

		swiperEl?.initialize()
	})
</script>

<swiper-container {...$$restProps}>
	{#each data as item, idx (idx)}
		<swiper-slide>
			<slot prop={item} />
		</swiper-slide>
	{/each}
</swiper-container>
