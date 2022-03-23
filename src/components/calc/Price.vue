<template>
    <div class="block">
        <div class="block__header block-header">
            <div class="block-header__title">Стоимость</div>
            <div class="block-header__sum">
            </div>
        </div>

        <div class="block__content sum">

            <div class="sum__all">ИТОГО: {{sumAll}}</div>

            <div class="sum__spoiler">
                <el-collapse v-model="spoilers.wardrobe">
                <el-collapse-item name="more">
                    <template slot="title">
                        Стоимость шкафа: {{wardrobe.results.sum}}
                    </template>
                    <div v-for="string in wardrobe.results.stringsArray" :key = "string">{{string}}</div>
                </el-collapse-item>
                </el-collapse>
            </div>

            <div class="sum__spoiler">
                <el-collapse v-model="spoilers.assembly">
                <el-collapse-item name="more">
                    <template slot="title">
                        Стоимость сборки: {{wardrobe.results.assembly}}
                    </template>
                    <div v-for="string in wardrobe.results.assemblyArray" :key = "string">{{string}}</div>
                </el-collapse-item>
                </el-collapse>
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
            wardrobe: {
                parts: {
                    params: {},
                    inner: {},
                    doors: {},
                    additional: {}
                },
                results: {
                    sum: 0,
                    stringsArray: [],
                    assembly: 0,
                    assemblyArray: [],
                },
            },
            spoilers: {
                wardrobe: [],
                assembly: []
            }
        }
    },
    computed: {
        ...mapGetters([
            'params/GET_SUMMARY',
            'params/ARE_ALL_PARAMS_SET',
            'inner/GET_SUMMARY',
            'doors/GET_SUMMARY',
            'additional/GET_SUMMARY'
        ]),
        sumAll: function() {
            return this.wardrobe.results.sum + this.wardrobe.results.assembly;
        },
        checkParams: function(){
            this.wardrobe.parts.params = this['params/GET_SUMMARY'];
        },
        checkInner: function(){
            this.wardrobe.parts.inner = this['inner/GET_SUMMARY'];
        },
        checkDoors: function(){
            this.wardrobe.parts.doors = this['doors/GET_SUMMARY'];
        },
        checkAdditional: function(){
            this.wardrobe.parts.additional = this['additional/GET_SUMMARY'];
        },
    },
    methods: {
        sum: function(){
            let parts = this.wardrobe.parts;

            let sum = 0;
            let stringsArray = [];
            let assembly = 0;
            let assemblyArray = [];

            for(let part in parts){
                sum = sum + parts[part].sum;
                stringsArray.push(...parts[part].stringsArray);
                if(parts[part].hasOwnProperty('assembly')){
                    assembly = assembly + parts[part].assembly;
                    assemblyArray.push(...parts[part].assemblyArray);
                }
            }

            this.wardrobe.results.sum = sum;
            this.wardrobe.results.stringsArray = stringsArray;
            this.wardrobe.results.assembly = assembly;
            this.wardrobe.results.assemblyArray = assemblyArray;
        },
    },
    watch: {
        'wardrobe.parts': {
            handler: function (after, before) {
                this.sum();
            },
            deep: true,
        }
    },
    beforeMount(){
        this.checkParams;
        this.checkInner;
        this.checkDoors;
        this.checkAdditional;
    }
}
</script>

<style lang="scss">

    .sum {

        &__all {
            font-weight: 900;
            margin-bottom: 10px;
            margin-top: 10px;
        }
        
        &__spoiler {
            margin-bottom: 10px;
        }
    }

</style>
