export default { 
    namespaced: true,

    state: {
        doorsType: 'r',
        r: {
            params: {
                material: [
                    { id: 'r001', name: 'ДСП Российское', count: 0, price: 2000,},
                    { id: 'r002', name: 'ДСП Egger', count: 0, price: 3500},
                    { id: 'r003', name: 'МДФ AGT', count: 0, price: 6000},
                    { id: 'r004', name: 'МДФ Петропрофиль', count: 0, price: 7500},
                ],
            },
            summary: {
                sum: 0,
                stringsArray: []
            }
        },
        k: {
            params: {
                count: 2,
                doorWidth: 0,
                dels: {
                    hor: { id: 'hor', name: 'Делитель горизонтальный', count: 0, price: 300, title: 'Горизонтальные', max: 10 },
                    vert: { id: 'vert', name: 'Делитель вертикальный', count: 0, price: 600, title: 'Вертикальные', max: 4 }
                },
                material: [
                    { id: 'k001', name: 'ДСП Российское', count: 0, priceOnSuare: 2000},
                    { id: 'k002', name: 'ДСП Egger', count: 0, priceOnSuare: 3500},
                    { id: 'k003', name: 'МДФ AGT', count: 0, priceOnSuare: 6000},
                    { id: 'k004', name: 'Зеркало', count: 0, priceOnSuare: 1000},
                    { id: 'k005', name: 'Зеркало тонированное (графит/бронза)', count: 0, priceOnSuare: 2500},
                    { id: 'k006', name: 'Окрашенное стекло', count: 0, priceOnSuare: 2700},
                    { id: 'k007', name: 'Зеркало с пескоструйным рисунком', count: 0, priceOnSuare: 5500},
                    { id: 'k008', name: 'Зеркало тонированное с пескоструйным рисунком', count: 0, priceOnSuare: 8500}
                ]
            },
            summary: {
                sum: 0,
                stringsArray: []
            }
        },
        summary: {
            sum: 0,
            stringsArray: []
        }
    },

    mutations: {
        SET_DOORS_TYPE (state, payload){
            state.doorsType = payload;
        },
        SET_R_MATERIAL_COUNT (state, payload){
            let object = state.r.params.material.find(item => item.id === payload.id);
            if(object){
                object.count = payload.count;
            }  
        },
        SET_SUMMARY (state, payload){
            state.summary.sum = payload.sum;
            state.summary.stringsArray = payload.stringsArray;
        },
        SET_K_COUNT (state, payload){
            state.k.params.count = payload;
        },
        SET_K_DELS (state, payload){
            state.k.params.dels[payload.param].count = payload.count; 
        },
        SET_K_MATERIAL (state, payload){
            let object = state.k.params.material.find(item => item.id === payload.id);
            if(object){
                object.count = payload.count;
            }  
        },
    },

    getters: {
        GET_DOORS_TYPE: (state) => {
            return state.doorsType;
        },
        GET_R_DOORS_PARAMS: (state) => {
            return state.r.params;
        },
        GET_K_DOORS_PARAMS: (state) => {
            return state.k.params;
        },
        GET_SUMMARY: (state) => {
            return state.summary;
        },
    },

    actions: {

    }
}