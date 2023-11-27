<script lang="ts">
	export let src: string = ''
	export let alt: string = 'Some picture card with your image'
</script>

<article class="app-picture-card">
	<img class="app-picture-card__image" src={src} alt={alt}>
</article>

<style>
	.app-picture-card {
		--object-fit: cover;
		--aspect: 56.25%;

		position: relative;
		object-fit: var(--object-fit);
		padding-top: var(--aspect);
		overflow: hidden;
	}

	.app-picture-card__image {
		position: absolute;
		inset: 0 auto auto 0;
		inline-size: 100%;
		block-size: 100%;
		object-fit: cover;
	}
</style>
