<script lang="ts">
	import { useRotateHover } from '$lib/actions/use-rotate-hover'
	import UtilsSwiper from '$lib/components/Utils/UtilsSwiper.svelte'
	import AppPictureCard from '$lib/components/App/AppPictureCard.svelte'

	export let images: string[] = []
</script>

<div use:useRotateHover class="rounded-30 overflow-hidden transition-all duration-300 hover:duration-150 ease-out">
	<div>
		<UtilsSwiper
			data={images}
			slides-per-view="1"
			let:prop={item}
		>
			<div>
				<AppPictureCard src={item} />
			</div>
		</UtilsSwiper>
	</div>
</div>
