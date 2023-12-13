<script>

    import Node from "../lib/Node.svelte";
    import { onDestroy } from "svelte";

    import { nodeList } from "../store.js";

    let nodes = [];

    const unsubscribe = nodeList.subscribe(value => {
        nodes = value;

    })

    onDestroy(unsubscribe);

    function findRootNodes(nodes) {
        const rootNodes = [];
        nodes.forEach(node => {
            if (node.parentID === null) {
                rootNodes.push(node);
            }
        });
        return rootNodes;
    }
    
    $: rootNodes = findRootNodes(nodes);



</script>
<div class="bg-neutral-800 min-h-screen absolute min-w-full flex ">

    <div class="w-fit mx-auto bg-neutral-100 my-20 overflow-auto">
        <span class="text-sm text-left flex pt-2 bg-neutral-200 pb-2 justify-left pl-3">Created by&nbsp;<a href="https://sahir.nl" class="underline">Sahir</a></span>
        <h1 class="text-3xl px-12 pt-9  text-center">Hierarchical note-taking </h1>
        <p class="text-center px-12 text-sm mt-2"> Tip - use colors as a second organizational dimension.</p>
        <p class="text-center px-12 text-sm "> Tip - add "sideways" for faster categories.</p>
        <div class="mx-6 pt-6 gap-2 flex justify-between">
            <button class="px-2 py-4 bg-blue-200 hover:bg-blue-300 w-full">
                Save Map
            </button>
            <button class="px-2 py-4 bg-blue-200 hover:bg-blue-300 w-full">
                Load Map
            </button>
        </div>
        <div class="p-6 flex justify-between">
            {#each rootNodes as node (node.id)}
            <div class="w-full flex grow">

                <Node {...node} />
            </div>
            {/each}
        </div>    
    </div>
</div>