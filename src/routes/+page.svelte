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
        <h1 class="text-3xl px-12 pt-9 text-center">Hierarchical note-taking </h1>
        <span class="text-sm text-center flex justify-center">Created by&nbsp;<a href="https://sahir.nl" class="underline">Sahir</a></span>
        <p class="text-center bg-yellow-200 py-3 mx-6 mt-6">In development: does not save</p>
        <div class="p-6 flex justify-between">
            {#each rootNodes as node (node.id)}
            <div class="w-full flex grow">

                <Node {...node} />
            </div>
            {/each}
        </div>    
    </div>
</div>