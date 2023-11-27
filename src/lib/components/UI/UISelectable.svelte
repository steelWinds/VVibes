<script lang="ts">
	import { CheckOutline, CloseOutline } from 'flowbite-svelte-icons'
	import { createEventDispatcher } from 'svelte'

	export let active: boolean = false

	interface Events {
		toggle: boolean
	}

	const dispatch = createEventDispatcher<Events>()
</script>

<button class="ui-selectable" class:active on:click={() => dispatch('toggle', active)}>
	<span class="ui-selectable__overlay backdrop-blur bg-backdrop-dark">
		<span class="ui-selectable__checkmark group p-6 bg-white rounded-full">
			<CheckOutline class="block group-hover:hidden" />
			<CloseOutline class="hidden group-hover:block" />
		</span>
	</span>

	<slot />
</button>

<style lang="postcss">
	.ui-selectable {
		position: relative;
    cursor: pointer;

		&.active {
			.ui-selectable__overlay,
			.ui-selectable__checkmark {
				opacity: 1;
			}
		}
  }

	.ui-selectable__overlay, .ui-selectable__checkmark {
		transition: opacity .25s ease;
	}

	.ui-selectable__overlay {
		position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
		place-content: center;
    opacity: 0;
	}

	.ui-selectable__checkmark {
		opacity: 0;
		transition-delay: .1s;
	}
</style>
