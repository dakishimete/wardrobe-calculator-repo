<template>
    <div class="doors-kupe"> 

        <div class="doors-kupe__count">
            <div class="param">
                <div class="param__header">
                    <div class="param__title">
                        Количество дверей-купе
                    </div>
                </div>
                <div class="param__content param-content">
                    <div class="num-input-item">
                        <el-input-number 
                            v-model="params.count" 
                            controls-position="right" 
                            :min="2" 
                            :max="doorsCount" 
                            size="small"
                            @change="handleCount">
                        </el-input-number>
                        <span class="num-input-item__title">Ширина двери: {{doorWidth}} мм</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="doors-kupe__dels">
            <div class="param">
                <div class="param__header">
                    <div class="param__title">
                        Количество делителей
                    </div>
                </div>
                <div class="param__content param-content">

                    <div class="param-content__row" v-for="param in params.dels" :key="param.id">
                        <div class="num-input-item">
                            <el-input-number 
                                v-model="param.count" 
                                controls-position="right" 
                                :min="0" 
                                :max="param.max" 
                                size="small" 
                                :class="{'num-input-item__input--selected': isDelAdded(param.id) }"
                                @change="handleDel(param.id)" >
                            </el-input-number>
                            <span class="num-input-item__title" :class="{'num-input-item__title--selected': isDelAdded(param.id) }">{{param.title}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="doors-kupe__material">
            <div class="param">
                <div class="param__header">
                    <div class="param__title">
                        Материал
                    </div>
                    <span class="doors-kupe__error" v-show="isTooManyDoorsSelected"> <i class="el-icon-warning"></i> Выбрано больше дверей, чем нужно</span>
                </div>
                <div class="param__content param-content">
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
                        <span class="num-input-item__title" :class="{'num-input-item__title--selected': isMaterialSelected(item.id) }">{{item.name}}</span>
                    </div>
                </div>
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
        ...mapGetters('params',[
            'GET_PARAM_INPUT' 
        ]),
        ...mapGetters('doors',[
            'GET_K_DOORS_PARAMS' 
        ]),
        ...mapGetters('inner',[
            'GET_INNER_FULL_DATA' 
        ]),
        doorsCount: function() {
            let inner = this.GET_INNER_FULL_DATA;
            if(inner){
                return inner.doorsRCount;
            }
            else return 4;
        },
        doorWidth: function() {
            let wardrobeWidth = this.GET_PARAM_INPUT('width');
            let count = this.params.count;
            return Math.round(wardrobeWidth / count);
        },
        isTooManyDoorsSelected: function() {
            let total = this.params.material.reduce((prev,curItem) => prev + curItem.count, 0);
            return total > this.params.count;
        },
        isContentAllowedToView: function() {
            return this.GET_PARAM_INPUT('width') && this.GET_INNER_FULL_DATA;
        }
    },
    methods: {
        ...mapMutations('doors', [
            'SET_K_COUNT',
            'SET_K_DELS',
            'SET_K_MATERIAL',
            'SET_SUMMARY'
        ]),
        handleCount: function(){
            this.SET_K_COUNT(this.params.count);
        },
        handleDel: function(param){
            let count = this.params.dels[param].count;
            let payload = {param, count};
            this.SET_K_DELS(payload);
        },
        isDelAdded: function(param){
            return this.params.dels[param].count > 0;
        },
        handleSelectMaterial: function(id){
            let object = this.params.material.find(item => item.id === id);
            if(object){
                let count = object.count;
                let payload = {id, count};
                this.SET_K_MATERIAL(payload);
            }   
        },
        isMaterialSelected: function(id){
            let object = this.params.material.find(item => item.id === id);
            if(object){
                return object.count > 0;
            }
        },
        getDataFromVuex: function() {
            this.params = JSON.parse(JSON.stringify(this.GET_K_DOORS_PARAMS));
        },
        sum: function() {
            let type = 'k';
            let sum = 0;
            let stringsArray = [];

            if(this.isContentAllowedToView){
                let width = this.GET_PARAM_INPUT('width');
                let widthOfDoor = +(width / this.params.count / 1000).toFixed(2);

                //dels
                for(let param in this.params.dels){
                    let del = this.params.dels[param];
                    if(del.count > 0){
                        let delsSum = del.price * del.count;
                        sum = sum + delsSum;
                        let delsStr = del.name + ': ' + del.price + '*' + del.count + ' = ' + delsSum;
                        stringsArray.push(delsStr);
                    }
                }

                //material
                let doors = this.params.material.filter(item => item.count > 0);
                for(let d in doors){
                    let door = doors[d];
                    let doorSum = door.priceOnSuare * widthOfDoor * door.count;
                    doorSum = Math.round(doorSum);
                    sum = sum + doorSum;
                    let doorStr = door.name + ': ' + door.priceOnSuare + '*' + widthOfDoor + '*' + door.count + ' = ' + doorSum;
                    stringsArray.push(doorStr);
                }
            }

            //to vuex
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
    .doors-kupe {
        &__error {
            padding: 7px;
            color: #e6a23c;
            background-color: #fdf6ec;
            border: 1px solid #f5dab1;
            border-radius: 4px;
        }

        .param {
            margin-bottom: 20px;

            &__header {
                margin-bottom: 10px;
                display: flex;
            }

            &__title {
                font-size: 1.1em;
                align-self: center;
                margin-right: 10px;
            }
        }
    }
</style>

<style lang="scss">
    
</style>
