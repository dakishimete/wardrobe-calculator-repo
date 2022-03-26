<template>
    <div class="doors-rasp">

        <div class="doors-rasp__count" >
            В этой модели корпуса кол-во дверей: {{doorsCount}}
            <span class="doors-rasp__error" v-show="isTooManyDoorsSelected"> <i class="el-icon-warning"></i> Выбрано больше дверей, чем нужно</span>
        </div>

        <div class="doors-rasp__material" >

            <div class="num-input-item" v-for="item in params.material" :key="item.id">
                <el-input-number 
                    v-model="item.count" 
                    controls-position="right" 
                    @change="handleSelectMaterial(item.id)" 
                    :min="0" 
                    :max="doorsCount" 
                    size="small" 
                    :class="{'num-input-item__input--selected': isMaterialSelected(item.id) }">
                    </el-input-number>
                <span 
                    class="num-input-item__title" 
                    :class="{'num-input-item__title--selected': isMaterialSelected(item.id) }">
                    {{item.name}}
                </span>
            </div>

        </div>

    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';


export default {
    data() {
        return {
            params: {}
        }
    },
    computed: {
        ...mapGetters('inner',[
            'GET_INNER_FULL_DATA',
        ]),
        ...mapGetters('doors',[
            'GET_R_DOORS_PARAMS',
        ]),
        ...mapGetters('params',[
            'GET_PARAM_INPUT' 
        ]),
        doorsCount: function() {
            let inner = this.GET_INNER_FULL_DATA;
            let count = inner.doorsRCount;
            return count;
        },
        isTooManyDoorsSelected: function() {
            let total = this.params.material.reduce((prev,curItem) => prev + curItem.count, 0);
            return total > this.doorsCount;
        },
        isContentAllowedToView: function() {
            return this.GET_PARAM_INPUT('width') && this.GET_INNER_FULL_DATA;
        }
    },
    methods: {
        ...mapMutations('doors', [
            'SET_R_MATERIAL_COUNT', //y
            'SET_SUMMARY' //y
        ]),
        handleSelectMaterial: function (id) {
            let object = this.params.material.find(item => item.id === id);
            if(object){
                let count = object.count;
                let payload = {id, count};
                this.SET_R_MATERIAL_COUNT(payload);
            }   
        },
        isMaterialSelected: function (id) {
            let object = this.params.material.find(item => item.id === id);
            if(object){
                return object.count > 0;
            }
        },
        getDataFromVuex: function() {
            this.params = JSON.parse(JSON.stringify(this.GET_R_DOORS_PARAMS));
        },
        sum: function() {
            let type = 'r';
            let sum = 0;
            let stringsArray = [];

            if(this.isContentAllowedToView){
                let chosenDoors = this.params.material.filter(item => item.count > 0);

                for(let door of chosenDoors){
                    let sumDoor = door.price * door.count;
                    sum = sum + sumDoor;
                    let str = door.name + ': ' + door.price + '*' + door.count + ' = ' + sumDoor;
                    stringsArray.push(str);
                }
            }

            let payload = {type, sum, stringsArray};

            this.SET_SUMMARY(payload);
        }
    },
    watch: {
        params: {
            handler: function (after, before) {
                this.sum();
            },
            deep: true,
        },
        isContentAllowedToView: function(after, before) {
            this.sum();
        }
    },
    beforeMount(){
        this.getDataFromVuex();
    }
}
</script>

<style lang="scss">

    .doors-rasp {

        &__error {
            padding: 7px;
            color: #e6a23c;
            background-color: #fdf6ec;
            border: 1px solid #f5dab1;
            border-radius: 4px;
        }

        &__count {
            margin-bottom: 10px;
        }
    }

</style>

<style lang="scss">

</style>
