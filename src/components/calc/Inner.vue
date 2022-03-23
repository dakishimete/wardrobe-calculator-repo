<template>
    <div class="block">
        <div class="block__header block-header">
            <div class="block-header__title">Корпус</div>
            <div class="block-header__sum">
                <el-tooltip placement="bottom-end" class="tooltip">
                    <div  slot="content" v-html="sumString"></div>
                    <div>{{sumNumber}}</div>
                </el-tooltip>
            </div>
        </div>

        <div class="block__content">

            <div v-show="!isContentAllowedToView">Сначала заполните все параметры</div>

            <div v-show="isContentAllowedToView">
                <ul class="inners">
                    <li class="inner" v-for="item in innersArray" :key="item.name" 
                        :class="{'inner--selected' : isInnerSelected(item.name)}">
                        <div class="inner__image" @click="handleSelectInner(item.name)">
                            <img :src="innerImg(item.img)" alt="">
                        </div>
                        <div class="inner__name" @click="handleSelectInner(item.name)"
                            :class="{'inner__name--selected' : isInnerSelected(item.name)}" >
                            {{item.name}}
                        </div>
                    </li>
                </ul>
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
            selectedInnerName: '',
        }
    },
    computed: {
        ...mapGetters('inner',[
            'GET_INNER_NAME',
            'GET_INNER_FULL_DATA',
            'GET_INNERS_BY_WIDTH',
            'GET_SUMMARY',
        ]),
        ...mapGetters('params',[
            'GET_PARAM_DEFAULTS_ARRAY',
            'GET_PARAM_INPUT',
            'ARE_ALL_PARAMS_SET'
        ]),
        isContentAllowedToView: function(){
            return this.ARE_ALL_PARAMS_SET;
        },
        suitableWidth: function(){
            let widthInput = +this.GET_PARAM_INPUT('width');
            let widthDefaultsArray = this.GET_PARAM_DEFAULTS_ARRAY('width');

            //width default values are sorted min -> max in vuex getter
            let widthDefaultMax = widthDefaultsArray[widthDefaultsArray.length - 1];
            let widthDefaultMin = widthDefaultsArray[0];

            let suitableWidth;

            if(widthInput > 0){
                if (widthInput <= widthDefaultMax){
                    //iterate through array until find the first item bigger then input
                    //i.e. default '1500' is ok for input in range 1201-1500
                    //then inner may be modified to fit customer's width
                    suitableWidth = widthDefaultsArray.find(item => item >= widthInput);
                }
                else if (widthInput > widthDefaultMax){
                    suitableWidth = widthDefaultMax;
                }
                else {
                    suitableWidth = widthDefaultMin;
                }
            }
 
            return suitableWidth;
        },
        innersArray: function(){
            if(this.isContentAllowedToView){
                this.checkSelectedInner();
                let innersArray = this.GET_INNERS_BY_WIDTH(this.suitableWidth);
                return innersArray;
            }
        },
        sumNumber: function() {
            return this.GET_SUMMARY.sum + this.GET_SUMMARY.assembly;
        },
        sumString: function () {
            if(this.GET_SUMMARY.sum > 0){
                let sum = this.GET_SUMMARY.stringsArray.join('<br/>');
                let assembly = this.GET_SUMMARY.assemblyArray.join('<br/>');
                let str = sum + '<br/>' + assembly;
                return str;
            }
            return 'Дизайн не выбран';
        }
    },
    methods: {
        ...mapMutations('inner', [
            'HANDLE_SELECT_INNER',
            'HANDLE_SUM'
        ]),
        getInnerNameFromVuex: function(){
            this.selectedInnerName = this.GET_INNER_NAME;
        },
        innerImg: function(pic) {
            return require('@/assets/'+pic);
        },
        isInnerSelected: function(name){
            return name === this.selectedInnerName;
        },
        handleSelectInner: function(name){
            this.selectedInnerName = name;
            this.HANDLE_SELECT_INNER(name);
            this.sum();
        },
        sum: function() {
            let sum = 0;
            let stringsArray = [];
            let assembly = 0;
            let assemblyArray = [];

            if(this.selectedInnerName && this.isContentAllowedToView){
                let inner = this.GET_INNER_FULL_DATA;
                sum = sum + inner.price;
                stringsArray.push('Модель корпуса ' + inner.name + ': ' + inner.price);
                assembly = inner.assembly;
                assemblyArray.push('Сборка корпуса: ' + inner.assembly);
            }
            let payload = {sum, stringsArray, assembly, assemblyArray};
            this.HANDLE_SUM(payload);
        },
        checkSelectedInner: function(){
            if(this.GET_INNER_NAME){
                let inner = this.GET_INNER_FULL_DATA;
                if(inner.width !== this.suitableWidth){
                    this.handleSelectInner('');
                }
            }
        }
    },
    watch: {
        isContentAllowedToView: function(){
            this.sum();
        }
    },
    beforeMount(){
        this.getInnerNameFromVuex();
    }
}
</script>

<style lang="scss">
    .inners {
        padding: 0;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
    }

    .inner {
        list-style-type: none; 
        padding: 10px; 
        margin: 10px; 
        border-radius: 3px;
        border: 1px solid #ebebeb;
        flex: 0 1 30%;
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        justify-items: center;
        text-align: center;
        transition: all 0.3s ease;

        &:hover {
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        }

        &--selected {
            border-color: #409eff;
        }

        &>* {
            flex: 1 0 100%;
            justify-self: center;
        }

        &__image {
            width: 250px;
            height: 250px;
            margin-bottom: 10px;
            cursor: pointer;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        &__name {
            font-weight: 700;
            cursor: pointer;

            &--selected{
                color: #409eff;
            }
        }
    }
</style>
