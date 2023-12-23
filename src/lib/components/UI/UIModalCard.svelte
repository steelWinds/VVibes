<script lang="ts">
	import { Modal } from 'flowbite-svelte'

	export let modalTitle: string = ''

	let modalIsOpen = false
</script>

<Modal title={modalTitle} bind:open={modalIsOpen} outsideclose>
	<slot name="modal" />
</Modal>

<button on:click={() => (modalIsOpen = true)}>

	<slot />
</button>

<style lang="postcss">
	.ui-selectable {
		position: relative;
    cursor: pointer;
		overflow: hidden;

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
    inline-size: 100%;
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
