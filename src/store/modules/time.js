export default {
    namespaced: true,

    state: {
        timeOptions: {
            doorsType: {
                'r': {
                    name: 'Распашные двери',
                    time: 2,
                },
                'k': {
                    name: 'Купе двери',
                    time: 5,
                }
            },
            paramsModified: {
                name: 'Упилы по длине/ширине/высоте',
                time: 3,
            },
            default: 1
        },
    },

    getters: {
        GET_TIME_OPTIONS: (state) => {
            return state.timeOptions;
        }
    },

    mutations: {},

    actions: {}
}