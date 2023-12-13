<script>
    export let isOpen = false;
    export let nodeCount = 0;
    export let confirmDelete = () => {};
    export let cancelDelete = () => {};
    export let nodeTitle;
</script>

{#if isOpen && nodeCount > 0}
    <div class="modal fixed w-full h-full top-0 left-0 flex items-center justify-center">
        <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" on:click={cancelDelete}></div>

        <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto   z-50 overflow-y-auto">
            <div class="modal-content text-left">


                <p class='p-4'>Delete "{nodeTitle}" and its <span class='font-bold'>{nodeCount}</span> sub-nodes?</p>

                <div class="flex w-full justify-between">
                    <button class="bg-neutral-200 w-full py-1" on:click={cancelDelete}>Cancel</button>
                    <button class="bg-red-200 w-full py-1" on:click={confirmDelete}>Delete</button>
                </div>
            </div>
        </div>
    </div>
{:else if isOpen && nodeCount === 0}
    {confirmDelete()}

{/if}
