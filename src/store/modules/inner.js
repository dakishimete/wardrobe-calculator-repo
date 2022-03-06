export default {
    namespaced: true,
    
    state: {
        selectedInnerName: '',
        inners: [
            { name: 'w120-1', width: 1200, img: 'inner/120/1.jpg', price: 12010, doorsRCount: 2, priceLight: 800, assembly: 800 },
            { name: 'w120-2', width: 1200, img: 'inner/120/2.jpg', price: 12020, doorsRCount: 2, priceLight: 800, assembly: 800 },
            { name: 'w120-3', width: 1200, img: 'inner/120/3.jpg', price: 12030, doorsRCount: 2, priceLight: 800, assembly: 800 },
    
            { name: 'w150-1', width: 1500, img: 'inner/150/1.jpg', price: 15010, doorsRCount: 3, priceLight: 900, assembly: 800 },
            { name: 'w150-2', width: 1500, img: 'inner/150/2.jpg', price: 15020, doorsRCount: 3, priceLight: 900, assembly: 800 },
            { name: 'w150-3', width: 1500, img: 'inner/150/3.jpg', price: 15030, doorsRCount: 3, priceLight: 900, assembly: 800 },
    
            { name: 'w180-1', width: 1800, img: 'inner/180/1.jpg', price: 18010, doorsRCount: 3, priceLight: 1000, assembly: 1000 },
            { name: 'w180-2', width: 1800, img: 'inner/180/2.jpg', price: 18020, doorsRCount: 3, priceLight: 1000, assembly: 1000 },
            { name: 'w180-3', width: 1800, img: 'inner/180/3.jpg', price: 18030, doorsRCount: 3, priceLight: 1000, assembly: 1000 },
            { name: 'w180-4', width: 1800, img: 'inner/180/4.jpg', price: 18040, doorsRCount: 3, priceLight: 1000, assembly: 1000 },
    
            { name: 'w210-1', width: 2100, img: 'inner/210/1.jpg', price: 21010, doorsRCount: 4, priceLight: 1100, assembly: 1200 },
            { name: 'w210-2', width: 2100, img: 'inner/210/2.jpg', price: 21020, doorsRCount: 4, priceLight: 1100, assembly: 1200 },
            { name: 'w210-3', width: 2100, img: 'inner/210/3.jpg', price: 21030, doorsRCount: 4, priceLight: 1100, assembly: 1200 },
            { name: 'w210-4', width: 2100, img: 'inner/210/4.jpg', price: 21030, doorsRCount: 4, priceLight: 1100, assembly: 1200 },
            { name: 'w210-5', width: 2100, img: 'inner/210/5.jpg', price: 21030, doorsRCount: 4, priceLight: 1100, assembly: 1200 },
    
            { name: 'w240-1', width: 2400, img: 'inner/240/1.jpg', price: 24010, doorsRCount: 4, priceLight: 1200, assembly: 1200 },
            { name: 'w240-2', width: 2400, img: 'inner/240/2.jpg', price: 24020, doorsRCount: 4, priceLight: 1200, assembly: 1200 },
            { name: 'w240-3', width: 2400, img: 'inner/240/3.jpg', price: 24030, doorsRCount: 4, priceLight: 1200, assembly: 1200 },
            { name: 'w240-4', width: 2400, img: 'inner/240/4.jpg', price: 24030, doorsRCount: 4, priceLight: 1200, assembly: 1200 },
            { name: 'w240-5', width: 2400, img: 'inner/240/5.jpg', price: 24030, doorsRCount: 4, priceLight: 1200, assembly: 1200 }
        ],
        summary: {
            sum: 0,
            stringsArray: [], 
            assembly: 0,
            assemblyArray: []
        }  
    },

    mutations: {
        HANDLE_SELECT_INNER (state, payload) {
            state.selectedInnerName = payload;
        },
        HANDLE_SUM (state, payload) {
            state.summary.sum = payload.sum;
            state.summary.stringsArray = payload.stringsArray;
            state.summary.assembly = payload.assembly;
            state.summary.assemblyArray = payload.assemblyArray;
        }   
    },

    getters: {
        GET_INNER_NAME: (state) => {
            return state.selectedInnerName;
        },
        GET_INNER_FULL_DATA: (state) => {
            if(state.selectedInnerName){
                return state.inners.find(item => item.name === state.selectedInnerName);
            }
            else return false;
        },
        GET_INNERS_BY_WIDTH: (state) => (width) => {
            return state.inners.filter(item => item.width === width);
        },
        GET_SUMMARY: (state) => {
            return state.summary;
        }
    },

    actions: {

    }
}