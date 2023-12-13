import { writable } from 'svelte/store';


export const nodeList = writable([
    {
        id: 1,
        text: 'Topic Node',
        body: 'Click to edit...',
        parentID: null, 
        color: 'neutral-200'
    },
    
    
])