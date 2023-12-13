<script>
    export let id;
    export let text;
    export let body;
    export let parentID = null;

    import { onDestroy } from "svelte";
    import { nodeList } from "../store.js";
    import Modal from "./Modal.svelte";

    import ConfirmDeleteModal from './ConfirmDeleteModal.svelte';
    // Rest of your code...

    let isDeleteModalOpen = false;

    function openDeleteModal() {
        const nodeToDelete = $nodeList.find(node => node.id === id);
        isDeleteModalOpen = true;
    }

    function closeDeleteModal() {
        isDeleteModalOpen = false;
    }

    function confirmDelete() {
        nodeList.update(nodes => nodes.filter(node => node.id !== id));
        closeDeleteModal();
    }

    let isModalOpen = false;

    function openModal() {
        isModalOpen = true;
    }

    function closeModal() {
        isModalOpen = false;
    }


    let isEditing = false;
    let tempText = text;

    function startEditing() {
        isEditing = true;
    }

    function stopEditing() {
        isEditing = false;
        if (tempText) {

            nodeList.update(value => {
                const index = value.findIndex(node => node.id === id);
                value[index].text = tempText;
                return value;
            })
        }
    }

    function handleKeydown(event) {
        if (event.key === "Enter") {
            stopEditing();
        }
    }

    let nodes = [];

    const unsubscribe = nodeList.subscribe(value => {
        nodes = value
        console.log(nodes)
    })

    onDestroy(unsubscribe);

    $: childNodes = findChildNodes(nodes, id);

    function findChildNodes(nodes, parentID) {
        const childNodes = [];
        nodes.forEach(node => {
            if (node.parentID === parentID) {
                childNodes.push(node);
            }
        });
        return childNodes;
    }



    $: nodeChildCount = $nodeList.filter(node => node.parentID === id).length;
    $: console.log(nodeChildCount);

    function addChild() {
        const newNode = {
            id: Math.random().toString(36).substr(2, 9),
            text: "New node",
            body: "test text",
            parentID: id
        }
        nodeList.update(value => [...value, newNode])
    }

    function addSideways() {
        const newNode = {
            id: Math.random().toString(36).substr(2, 9),
            text: "New node",
            body: "test text",
            parentID: parentID
        }
        nodeList.update(value => [...value, newNode])
    }

    function deleteSelf() {
        nodeList.update(value => value.filter(node => node.id !== id))
    }

    $: rootNodes = $nodeList.filter(node => node.parentID === null).length;


</script>

<div class='container flex flex-col '>


    <div class="node m-1 bg-neutral-200 flex flex-col items-center">
        <div class="node-content flex items-start w-full justify-between">
            {#if !isEditing}
                <button on:click={openModal} class=' m-4 node-text whitespace-nowrap {parentID === null? "text-2xl": ""} cursor-pointer' id={id}>
                    {text}
                </button>
            {:else}
                <input class='node-text whitespace-nowrap w-full {parentID === null?"text-2xl": ''} p-4 cursor-text' id={id} type='text' bind:value={tempText} on:blur={stopEditing} on:keydown={handleKeydown} />
            {/if}
            {#if (parentID === null)}
                <button class=" bg-green-500  w-6 relative h-full bg-opacity-10" on:click={addSideways}>+</button>
            {/if}

        </div>

        <div class='flex w-full'>
            <button class="w-full bg-black bg-opacity-10" on:click={addChild}>+</button>

            {#if parentID !== null || rootNodes > 1}
                <button class="w-full bg-red-200" on:click={openDeleteModal}>-</button>
            {/if}
        </div>
    </div>


    <div class="child-nodes flex">
        {#each childNodes as node (node.id)}
        <svelte:self {...node} />
        {/each}

    </div>


</div>
  
<svelte:component this={isModalOpen ? Modal : null} text={text} close={closeModal} body={body} id={id}/>
<ConfirmDeleteModal isOpen ={isDeleteModalOpen} nodeCount ={nodeChildCount} confirmDelete ={confirmDelete} cancelDelete = {closeDeleteModal} />