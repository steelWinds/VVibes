<script lang="ts">
	export let color: string
	export let title: string
</script>

<article class="grid grid-flow-col auto-cols-auto justify-start items-center gap-2 text-14 font-medium">
	<span class="p-3 rounded-full" style:background={color} />

	<span>
		{ color }
	</span>

	<h3>
		{ title }
	</h3>
</article>
