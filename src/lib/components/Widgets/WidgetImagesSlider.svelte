<script lang="ts">
	import UtilsSwiper from '$lib/components/Utils/UtilsSwiper.svelte'

	export let images: string[] = []
</script>

<div>
	<div>
		<UtilsSwiper
			data={images}
			direction="vertical"
			slides-per-view="auto"
			class="h-screen"
			slideClass="h-auto"
			mousewheel
			centered-slides
			let:prop={item}
		>
			<button class="block mb-4 rounded-xl overflow-hidden">
				<img src={item} alt="Slider img" />
			</button>
		</UtilsSwiper>
	</div>
</div>
