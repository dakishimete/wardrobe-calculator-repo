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
        },
        ARE_ALL_PARAMS_SET: (state) => {
            let array = [];
            for (let param in state.params){
                state.params[param].input > 0 ? array.push(true): array.push(false);
            }
            return array.every(Boolean);
        },
        GET_PARAM_INPUT: (state) => (param) => {
            return state.params[param].input;
        },
        GET_PARAM_DEFAULTS_ARRAY: (state) => (param) => {
            let arr = state.params[param].defaultsArray;
            arr.sort( (a, b) => a - b );
            return arr;
        },
        IS_AT_LEAST_ONE_PARAM_IS_MODIFIED: (state) => {
            let array = [];
            for (let param in state.params){
                if(state.params[param].modified.status){
                    return true; //end cycle after first true result
                }
            }
            return false; //no true result = all params are not modified
          }
    },

    actions: {}
}