<script>
    export let id;
    export let text;
    export let children = []; 
    export let parentID = null;

    import { onDestroy } from "svelte";
    import { nodeList } from "../store.js";


    let nodes = [];

    const unsubscribe = nodeList.subscribe(value => {
        nodes = value
        console.log(nodes)
    })

    onDestroy(unsubscribe);


    function findChildNodes(nodes, parentID) {
        const childNodes = [];
        nodes.forEach(node => {
            if (node.parentID === parentID) {
                childNodes.push(node);
            }
        });
        return childNodes;
    }

    $: childNodes = findChildNodes(nodes, id);

    function addChild() {
        const newNode = {
            id: Math.random().toString(36).substr(2, 9),
            text: "New node",
            children: [],
            parentID: id
        }
        nodeList.update(value => [...value, newNode])
    }

    function deleteSelf() {
        nodeList.update(value => value.filter(node => node.id !== id))
    }

</script>

<div class='container flex flex-col'>


    <div class="node m-1 bg-neutral-200 flex flex-col items-center">
        <div class="node-content flex items-start w-full p-4">
            {#if (parentID !== null)}
            <div class='node-text whitespace-nowrap' id={id}>{text}</div>
            {:else}
            <div class='node-text whitespace-nowrap text-xl' id={id}>{text}</div>
            {/if}

        </div>  
        <div class='flex w-full'>
            <button class="w-full bg-black bg-opacity-10" on:click={addChild}>+</button>
            {#if (parentID !== null)}
            <button class="w-fit px-[10%] bg-red-200" on:click={deleteSelf}>-</button>
            {/if}
        </div>
    </div>


    <div class="child-nodes flex">
        {#each childNodes as node (node.id)}
        <svelte:self {...node} />
        {/each}

    </div>


</div>
  