<script context="module" lang="ts">
	import { register } from 'swiper/element/bundle'

	register()
</script>

<script lang="ts" generics="T">
	import { onMount, createEventDispatcher } from 'svelte'
	import type { Swiper } from 'swiper'

	export let data: T[] = []
	export let slideClass: string = ''

	interface Events {
		slideChange: Swiper
	}

	const dispatch = createEventDispatcher<Events>()

	onMount(() => {
		const swiperEl = document.querySelector('swiper-container')

		if (!swiperEl) return

		swiperEl.initialize()

		swiperEl.addEventListener('swiperslidechange', (_event) => {
			const event = _event as CustomEvent

			dispatch('slideChange', event.detail[0] as Swiper)
		})
	})
</script>

<swiper-container {...$$restProps}>
	{#each data as item, idx (idx)}
		<swiper-slide class={slideClass}>
			<slot prop={item} />
		</swiper-slide>
	{/each}
</swiper-container>
