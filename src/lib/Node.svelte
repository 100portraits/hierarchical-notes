<script>
    export let id;
    export let text;
    export let body;
    export let parentID = null;
    export let color = 'white';
    const colors = ['neutral-200', 'red-100', 'orange-100', 'yellow-100', 'green-100', 'cyan-100', 'blue-100', 'purple-100'];
    let usedColors = new Set($nodeList.filter(node => node.parentID === null).map(node => node.color));

    function updateColor(colorOption) {
        color = colorOption;
        nodeList.update(value => {
            const index = value.findIndex(node => node.id === id);
            value[index].color = colorOption;
            return value;
        })
    }

    import { onDestroy } from "svelte";
    import { nodeList } from "../store.js";
    import Modal from "./Modal.svelte";

    import ConfirmDeleteModal from './ConfirmDeleteModal.svelte';

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

    function addChild() {
        const newNode = {
            id: Math.random().toString(36).substr(2, 9),
            text: "New Node " + parseInt(nodeChildCount+1),
            body: "Click title or body to edit",
            parentID: id,
            color: color
        }
        nodeList.update(value => [...value, newNode])
    }

    function addSideways() {
        const unusedColors = colors.filter(color => !usedColors.has(color));
        const color = unusedColors.length > 0 ? unusedColors[Math.floor(Math.random()*unusedColors.length)] : colors[Math.floor(Math.random() * colors.length)];

        const newNode = {
            id: Math.random().toString(36).substr(2, 9),
            text: "Topic Node " + parseInt(rootNodes+1),
            body: "Click to edit...",
            parentID: parentID,
            color: color
        }
        nodeList.update(value => [...value, newNode])
        usedColors.add(color);
    }

    function deleteSelf() {
        nodeList.update(value => value.filter(node => node.id !== id))
    }

    $: rootNodes = $nodeList.filter(node => node.parentID === null).length;
    $: console.log(rootNodes);


</script>

<div class='container flex flex-col '>


    <div class="node m-1 bg-{color} flex flex-col items-center">
        <div class='cursor-pointer flex w-full justify-between'>
            <div on:click={openModal} class="node-content  group flex items-start w-full justify-between">
                <div  class='group-hover:underline underline-offset-[4px] decoration-1 m-4 node-text whitespace-nowrap {parentID === null? "text-2xl": ""} cursor-pointer' id={id}>
                    {text}
                </div>
            </div>
            <button class=" bg-gray-700 hover:bg-black hover:bg-opacity-20 bg-opacity-10  w-6 relative h-full " on:click={addSideways}>+</button>
        </div>
        <div class='flex w-full'>
            <button class="w-full bg-gray-700 hover:bg-black hover:bg-opacity-20 bg-opacity-[7.5%]" on:click={addChild}>+</button>

            {#if parentID !== null || rootNodes > 1}
                <button class="w-full bg-gray-700 hover:bg-black hover:bg-opacity-20 bg-opacity-[15%]" on:click={openDeleteModal}>-</button>
            {/if}
        </div>
    </div>


    <div class="child-nodes flex">
        {#each childNodes as node (node.id)}
        <svelte:self {...node} />
        {/each}

    </div>


</div>
  
<svelte:component this={isModalOpen ? Modal : null} updateColor={updateColor} text={text} close={closeModal} body={body} id={id} color={color}/>
<ConfirmDeleteModal  nodeTitle={text} isOpen ={isDeleteModalOpen} nodeCount ={nodeChildCount} confirmDelete ={confirmDelete} cancelDelete = {closeDeleteModal} />
