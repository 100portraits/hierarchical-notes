<script>
    export let text = '';
    export let body = '';
    export let id = '';
    export let close = () => {};
    export let color = 'white';
    export let updateColor = () => {};

    const colors = ['neutral-200', 'red-100', 'orange-100', 'yellow-100', 'green-100', 'cyan-100', 'blue-100', 'purple-100'];

    import { nodeList } from "../store.js";

    let isEditing = true;
    let isEditingBody = true;
    let tempText = text;
    let tempBody = body;

    function startEditing() {
        isEditing = true;
    }

    function startEditingBody() {
        isEditingBody = true;
    }

    function stopEditing() {
        text = tempText;
    }

    function stopEditingBody() {
        body = tempBody;
    }
    function stopEditingBodyClose() {
        isEditingBody = false;
        body = tempBody;
        close();
    }

    function handleKeydown(event) {
        if (event.key === 'Enter') {
            stopEditing();
            stopEditingBody();
        }
        if (event.key === 'Escape') {
            close();
        }
    }

    function saveChanges() {
        nodeList.update(nodes => nodes.map(node => node.id === id ? {...node, text: tempText, body: tempBody} : node));
    }

    function esc(event) {
        if (event.key === 'Escape') {
            close();
        }
    }

</script>

<button class="z-10 modal bg-gray-900 bg-opacity-50 absolute top-0 left-0 w-full h-full flex items-center justify-center" on:click={close} on:keydown={esc}>
    <button class="modal-content flex flex-col justify-between overflow-auto relative min-w-[20vw] bg-{color}" on:click|stopPropagation on:keydown={esc}>
        <div class="flex w-full h-16">
            {#each colors as colorOption (colorOption)}
                <button class="w-full bg-{colorOption}" on:click={() => updateColor(colorOption)}></button>
            {/each}
            
        </div>
        <div>
        {#if !isEditing}
            <button class="text-3xl px-6 mt-4 focus:outline-none text-left underline underline-offset-8 decoration-2 cursor-pointer" on:click={startEditing} on:keydown={esc}>{text}</button>
        {:else}
            <input class="text-3xl px-6 mt-4 focus:outline-none text-left underline underline-offset-8 decoration-2 cursor-text bg-{color}" type='text' bind:value={tempText} on:blur={saveChanges} on:keydown={handleKeydown} />
        {/if}
        <div class="flex flex-col h-full justify-between gap-4">
            {#if !isEditingBody}
                <button class="cursor-pointer focus:outline-none px-6 my-2" on:click={startEditingBody}>{body}</button>
            {:else}
                <textarea rows="6" class="px-6 my-2 focus:outline-none h-full w-full overflow-visible bg-{color}" bind:value={tempBody} on:blur={saveChanges}></textarea>
            {/if}
        </div>

        <button on:click={close} class='bg-gray-900 bg-opacity-20 py-2 w-full'>Close</button>
        </div>
    </button>
</button>