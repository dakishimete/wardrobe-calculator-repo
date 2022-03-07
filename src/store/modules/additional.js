export default {
    namespaced: true,

    state: {
        additional: {
            top: {status: false, price: 100, title: 'Козырек', name: 'top'},
            light: {status: false, title: 'Подсветка', name: 'light', assembly: 1000, assemblyTitle: 'Монтаж подсветки'},
            elements:{
                boxes: {count: 0, price: 1000, title: 'Ящики', name: 'boxes', max: 30, assembly: 200, assemblyTitle: 'Установка ящиков'},
                shelves: {count: 0, price: 500, title: 'Доп. полки',  name: 'shelves', max: 50, assembly: 100, assemblyTitle: 'Установка доп. полок'},
                rods: {count: 0, price: 250, title: 'Доп. штанги',  name: 'rods', max: 10, assembly: 50, assemblyTitle: 'Установка доп. штанг'}
            },
        },
        summary: {
            sum: 0,
            stringsArray: [],
            assembly: 0,
            assemblyArray: []
        },
    },

    mutations: {
        SET_TOP (state, payload) {
            state.additional.top.status = payload;
            if(!payload){
                state.additional.light.status = false;
            }
        },
        SET_LIGHT (state, payload) {
            state.additional.light.status = payload;
            if(payload){
                state.additional.top.status = true;
            }
        },
        SET_ELEMENT (state, payload) {
            state.additional.elements[payload.param].count = payload.value;
        },
        SET_SUMMARY (state, payload) {
            state.summary.sum = payload.sum;
            state.summary.stringsArray = payload.stringsArray;
            state.summary.assembly = payload.assembly;
            state.summary.assemblyArray = payload.assemblyArray;
        }
    },

    getters: {
        GET_ADDITIONAL: (state) => {
            return state.additional;
        },
        GET_SUMMARY: (state) => {
            return state.summary;
        },
    },

    actions: {}
}