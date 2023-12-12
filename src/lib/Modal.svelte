<script>
    export let text = '';
    export let body = '';
    export let id = '';
    export let close = () => {};

    import { nodeList } from "../store.js";

    let isEditing = false;
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
        isEditing = false;
        text = tempText;
    }

    function stopEditingBody() {
        isEditingBody = false;
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
    }

    function saveChanges() {
        nodeList.update(nodes => nodes.map(node => node.id === id ? {...node, text: tempText, body: tempBody} : node));
    }

</script>

<div class="modal bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full flex items-center justify-center" on:click={close}>
    <div class="modal-content flex flex-col justify-between p-4 overflow-auto relative min-w-[20vw] h-1/2 bg-white" on:click|stopPropagation>
        <span class="close-button absolute top-0 right-0 m-2 mr-3 text-3xl cursor-pointer" on:click={close}>&times;</span>
        <div>
        {#if !isEditing}
            <h1 class="text-3xl px-12 py-4 text-center underline underline-offset-8 decoration-2 cursor-pointer" on:click={startEditing}>{text}</h1>
        {:else}
            <input class="text-3xl px-12 py-4 text-center underline underline-offset-8 decoration-2 cursor-text" type='text' bind:value={tempText} on:blur={saveChanges} on:keydown={handleKeydown} autofocus />
        {/if}
        <div class="p-4 flex flex-col h-full justify-between gap-4">
            {#if !isEditingBody}
                <p class="cursor-pointer p-3 mb-20" on:click={startEditingBody}>{body}</p>
            {:else}
                <textarea rows="6" class="p-3 h-full w-full overflow-visible" bind:value={tempBody} on:blur={saveChanges}></textarea>
            {/if}
        </div>
        </div>
        <div class='flex gap-4'>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" on:click={stopEditingBody}>Save</button>
        <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" on:click={stopEditingBodyClose}>Save and Close</button>
        </div>
    </div>
</div>