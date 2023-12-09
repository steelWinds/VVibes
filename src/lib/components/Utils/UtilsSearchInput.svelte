<script setup lang="ts">
	import { Search, Button } from 'flowbite-svelte'
	import { MicrophoneSolid, SearchOutline } from 'flowbite-svelte-icons'
</script>

<Search class="flex gap-2 items-center" placeholder="Search images">
	<button type="button" class="outline-none">
		<MicrophoneSolid class="w-4 h-4 me-2" />
	</button>
</Search>
<Button size="sm">
	<SearchOutline class="w-5 h-5 me-2 -ms-1" />
	Search
</Button>
