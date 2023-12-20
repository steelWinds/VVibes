<script lang="ts">
	import FormSearchInput from '../FormSearchInput.svelte'
	export let Hst: Hst

	const collection = [
    { value: 1, label: 'one' },
    { value: 2, label: 'two' },
    { value: 3, label: 'three' }
  ]

	let selected: any[] | null = null
</script>

<Hst.Story>
	<FormSearchInput
		bind:value={selected}
		items={collection}
		placeholder="Search images"
	/>

	<div class="mt-4">
		Data: { JSON.stringify(selected) }
	</div>
</Hst.Story>
