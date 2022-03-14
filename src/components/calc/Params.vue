<template>
    <div class="block">
        <div class="block__header block-header">
            <div class="block-header__title">Габариты</div>
            <div class="block-header__sum">
                <el-tooltip placement="bottom-end" class="tooltip">
                    <div  slot="content" v-html="sumString"></div>
                    <div>{{sumNumber}}</div>
                </el-tooltip>
            </div>
        </div>

        <div class="block__content params">
            <div class="params__row param" v-for="param in params" :key="param.title">
                <div class="param__title">{{param.title}}</div>
                <div class="param__input"
                    :class="{   'input--error': isInputParamEmpty(param.name) || isInputParamMoreThanMax(param.name), 
                                'input--warning': isInputParamModified(param.name)
                            }">
                    <el-input v-model="param.input" type="number" size="small" @input="handleInputParam(param.name)" :max="maxDefaultParam(param.name)"></el-input>
                </div>
                <div class="param__warning">
                    <div v-if="isInputParamEmpty(param.name)" class="param__warning--red">Заполните поле</div> 
                    <div v-if="isInputParamModified(param.name)" class="param__warning--yellow">Упил</div> 
                    <div v-if="isInputParamMoreThanMax(param.name)" class="param__warning--red">Нельзя больше {{maxDefaultParam(param.name)}}</div> 
                </div>
                <div class="param__default">
                    <el-tag type="info" size="small" 
                        v-for="defaultParam in param.defaultsArray" :key="defaultParam" 
                        class ="param__default-item" @click="handleDefaultParamToInput(param.name, defaultParam)"
                        >
                        {{defaultParam}}
                    </el-tag>
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
    watch: {
        params: {
            handler: function (after, before) {
                this.sum();
            },
            deep: true,
        }
    },
    computed: {
        ...mapGetters('params',[
            'GET_SUMMARY',
            'GET_PARAMS'
        ]),
        sumString: function() {
            if(this.GET_SUMMARY.sum > 0){
                let str = this.GET_SUMMARY.stringsArray.join('<br/>');
                return str;
            }
            return 'Нет упилов';
        },
        sumNumber: function() {
            return this.GET_SUMMARY.sum;
        },

    },
    methods: {
        ...mapMutations('params', [
            'HANDLE_SUM',
            'HANDLE_INPUT_PARAM'
        ]),
        getAllParamsFromVuex: function() {
            this.params = JSON.parse(JSON.stringify(this.GET_PARAMS));
        },
        isInputParamEmpty: function(param){
            return +this.params[param].input === 0;
        },
        isInputParamMoreThanMax: function(param){
            let defaultsArray = this.params[param].defaultsArray;
            let defaultMax = defaultsArray[defaultsArray.length - 1];
            let input = this.params[param].input;
            return input > defaultMax;
        },
        isInputParamModified: function(param){
            return this.params[param].modified.status;
        },
        handleInputParam: function(param){
            let value = +this.params[param].input;
            let defaultsArray = this.params[param].defaultsArray;
            this.params[param].modified.status = value > 0 && !defaultsArray.includes(value) && !this.isInputParamMoreThanMax(param);
        
            let input = +this.params[param].input;
            let status = this.params[param].modified.status;
            let payload = {param, input, status};
            this.HANDLE_INPUT_PARAM(payload);
        },
        handleDefaultParamToInput: function(param, defaultParam){
            this.params[param].input = defaultParam;
            this.handleInputParam(param);
        },
        maxDefaultParam: function(param){
            return Math.max(...this.params[param].defaultsArray);
        },
        sum: function(){
            let sum = 0;
            let stringsArray = [];

            for(let param in this.params){
                if(this.params[param].modified.status){
                    let changeSum = this.params[param].modified.price
                    let str = this.params[param].modified.title + ': ' + changeSum;
                    sum = sum + this.params[param].modified.price;
                    stringsArray.push(str);
                }
            }

            let payload = {sum, stringsArray};
            this.HANDLE_SUM(payload);
        },
    },
    beforeMount(){
        this.getAllParamsFromVuex();
    }
}
</script>

<style lang="scss">
    .params {
        display: flex;

        &__row {
            display: grid;
            grid-template-rows: auto auto auto;
            grid-template-columns: 60px 200px;
            grid-gap: 2px;
            align-items: center;
            margin-right: 20px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .param {
        &__title {
            grid-column-start: 1;
            grid-column-end: 2;
            grid-row-start: 1;
            grid-row-end: 2;
            align-self: end;
        }

        &__input {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 2;
            grid-row-end: 3;
        }

        &__default {
            grid-column-start: 1;
            grid-column-end: 3;
            grid-row-start: 3;
            grid-row-end: 4;
            font-size: 0.8em;
            margin-top: 4px;

            &-item {
                margin-right: 5px;
                cursor: pointer;

                &:last-child {
                margin-right: 0;
                }

                &.el-tag--info {
                    transition:  all 0.3s ease-in-out;
                    &:hover {
                        background-color: #ecf5ff;
                        border-color: #d9ecff;
                        color: #409EFF;
                    }
                }
            }
        }

        &__warning {
            grid-column-start: 2;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 2;
            justify-self: end;
            align-self: end; 

            &--yellow {
                color: #e6a23c;
            }

            &--red {
                color: #ff0000;
            }
        }
    }
</style>
