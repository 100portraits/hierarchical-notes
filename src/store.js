import { writable } from 'svelte/store';


export const nodeList = writable([
    {
        id: 1,
        text: 'node 1',
        body: 'node 1 body',
        parentID: null
    },
    
    
])