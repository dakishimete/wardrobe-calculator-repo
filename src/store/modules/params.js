export default {
    namespaced: true,

    state: {
        params: {
            width: {
                name: 'width',
                title: 'Ширина',
                input: '',
                defaultsArray: [1200, 1500, 1800, 2100, 2400],
                modified: {
                    status: false,
                    price: 1000,
                    title: 'Упил ширины'
                }
            },
            height: {
                name: 'height',
                title: 'Высота',
                input: '',
                defaultsArray: [2200, 2400, 2600],
                modified: {
                    status: false,
                    price: 500,
                    title: 'Упил высоты'
                }
            },
            depth: {
                name: 'depth',
                title: 'Глубина',
                input: '',
                defaultsArray: [450, 600],
                modified: {
                    status: false,
                    price: 1500,
                    title: 'Упил глубины'
                }
            },
        },
        summary: {
            sum: 0,
            stringsArray: []
        }
    },

    mutations: {
        HANDLE_SUM (state, payload) {
            state.summary.sum = payload.sum;
            state.summary.stringsArray = payload.stringsArray;
        },
        HANDLE_INPUT_PARAM (state, payload) {
            state.params[payload.param].input = payload.input;
            state.params[payload.param].modified.status = payload.status;
        }
    },

    getters: {
        GET_PARAMS: (state) => {
            let arr = state.params;
            for(let param in arr){
              arr[param].defaultsArray.sort( (a, b) => a - b );
            }
            return arr;
        },
        GET_SUMMARY: (state) => {
            return state.summary;
        }

    },

    actions: {}
}