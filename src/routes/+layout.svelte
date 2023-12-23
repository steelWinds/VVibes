<script>
  import '$lib/assets/fonts/Inter/include.css'
  import '$lib/assets/css/main.pcss'
  import '$lib/assets/css/swiper.pcss'
	import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<slot />

<SvelteToast options={{ duration: 90000000 }} />
