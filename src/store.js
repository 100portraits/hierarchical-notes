import { writable } from 'svelte/store';


export const nodeList = writable([
    {
        id: 1,
        text: 'node 1',
        children: [],
        parentID: null
    },
    
    
])