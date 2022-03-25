<template>
    <div class="block">
        <div class="block__header block-header">
            <div class="block-header__title">Дополнительные элементы</div>
            <div class="block-header__sum">
                <el-tooltip placement="bottom-end" class="tooltip">
                    <div  slot="content" v-html="sumString"></div>
                    <div>{{sumNumber}}</div>
                </el-tooltip>
            </div>
        </div>

        <div class="block__content">

            <div v-show="!isContentAllowedToView">Сначала заполните все параметры и выберите модель корпуса</div>

            <div v-show="isContentAllowedToView">
                <div class="additional">

                    <div class="additional-item">
                        <el-checkbox v-model="additional.top.status" @change="handleTop()">Козырек</el-checkbox>
                    </div>

                    <div class="additional-item">
                        <el-checkbox v-model="additional.light.status" @change="handleLight()">Подсветка</el-checkbox>
                    </div>

                    <div class="additional-item num-input-item" v-for="item in additional.elements" :key="item.name">
                        <el-input-number 
                            v-model="item.count" 
                            @change="handleElement(item.name)" 
                            :min="0" :max="item.max" size="small" controls-position="right" 
                            :class="{'num-input-item__input--selected': isElementSelected(item.name) }">
                        </el-input-number>
                        <span class="num-input-item__title" :class="{'num-input-item__title--selected': isElementSelected(item.name) }">
                            {{item.title}}
                        </span>
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
            additional: {},
        }
    },
    computed: {
        ...mapGetters('inner',[
            'GET_INNER_FULL_DATA',
        ]),
        ...mapGetters('params',[
            'ARE_ALL_PARAMS_SET'
        ]),
        ...mapGetters('additional',[
            'GET_SUMMARY',
            'GET_ADDITIONAL' 
        ]),
        isContentAllowedToView: function(){
            return this.ARE_ALL_PARAMS_SET && this.GET_INNER_FULL_DATA;
        },
        sumString: function() {
            if(this.GET_SUMMARY.sum > 0){
                let sum = this.GET_SUMMARY.stringsArray.join('<br/>');
                let assembly = this.GET_SUMMARY.assemblyArray.join('<br/>');
                let str = sum + '<br/>' + assembly;
                return str;
            }
            return 'Нет дополнительных элементов';
        },
        sumNumber: function() {
            return this.GET_SUMMARY.sum + this.GET_SUMMARY.assembly;
        }
    },
    methods: {
        ...mapMutations('additional', [
            'SET_ELEMENT',
            'SET_TOP',
            'SET_LIGHT',
            'SET_SUMMARY' 
        ]),
        handleTop: function() {
            this.SET_TOP(this.additional.top.status);
            if(!this.additional.top.status){
                this.additional.light.status = false;
                this.SET_LIGHT(false);
            }
        },
        handleLight: function() {
            this.SET_LIGHT(this.additional.light.status);
            if(this.additional.light.status){
                this.additional.top.status = true;
                this.SET_TOP(true);
            }
        },
        handleElement: function(param) {
            let value = this.additional.elements[param].count;
            let payload = {param, value}
            this.SET_ELEMENT(payload);
        },
        isElementSelected: function(elementName){
            return this.additional.elements[elementName].count > 0;
        },
        sum: function() {
            let sum = 0;
            let stringsArray = [];
            let assembly = 0;
            let assemblyArray = [];

            if(this.isContentAllowedToView){
                let top = this.sumTop();
                let light = this.sumLight();
                let elements = this.sumElements();

                sum = top.sum + light.sum + elements.sum;

                stringsArray = [...top.stringsArray,
                                    ...light.stringsArray,
                                    ...elements.stringsArray];

                assembly =  light.assembly + elements.assembly; 

                assemblyArray =   [...light.assemblyArray,
                                        ...elements.assemblyArray]; 
            }
            

            let payload = {sum, stringsArray, assembly, assemblyArray};

            this.SET_SUMMARY(payload); 
        },
        sumTop: function() {
            let sum = 0;
            let stringsArray = [];
            
            if(this.additional.top.status){
                let topSum = this.additional.top.price;
                let str = this.additional.top.title + ': ' + topSum;
                stringsArray.push(str);
                sum = sum + topSum;
            }

            let result = {sum, stringsArray};
            return result;
        },
        sumLight: function() {
            let sum = 0;
            let stringsArray = [];
            let assembly = 0;
            let assemblyArray = [];
            let inner = this.GET_INNER_FULL_DATA;

            if(this.additional.light.status && inner){
                sum = inner.priceLight;
                let str = this.additional.light.title + ': ' + sum;
                stringsArray.push(str);
                assembly = this.additional.light.assembly;
                let strAssembly = this.additional.light.assemblyTitle + ': ' + assembly;
                assemblyArray.push(strAssembly);
            }

            let result = {sum, stringsArray, assembly, assemblyArray};
            return result;

        },
        sumElements: function() {
            let sum = 0;
            let stringsArray = [];
            let assembly = 0;
            let assemblyArray = [];

            for (let item in this.additional.elements){
                if (this.additional.elements[item].count > 0){
                    let additionalSum = this.additional.elements[item].price * this.additional.elements[item].count;
                    let str = this.additional.elements[item].title + ': ' + this.additional.elements[item].price + '*' + this.additional.elements[item].count + ' = ' + additionalSum;
                    let additionalAssembly = this.additional.elements[item].assembly * this.additional.elements[item].count;
                    let strAssembly = this.additional.elements[item].assemblyTitle + ': ' + this.additional.elements[item].assembly + '*' + this.additional.elements[item].count + ' = ' + additionalAssembly;

                    sum = sum + additionalSum;
                    stringsArray.push(str);
                    assembly = assembly + additionalAssembly;
                    assemblyArray.push(strAssembly);
                }
            }

            let result = {sum, stringsArray, assembly, assemblyArray};
            return result;

        },
        getDataFromVuex: function() {
            this.additional = JSON.parse(JSON.stringify(this.GET_ADDITIONAL));
        }
    },
    watch: {
        additional: {
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
    .additional {
        &-item {
            margin-bottom: 5px;
        }
    }
</style>
