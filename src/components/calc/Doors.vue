<template>
    <div class="block">
        <div class="block__header block-header">
            <div class="block-header__title">Двери</div>
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
                
                <div class="doors__type">
                    <el-radio v-model="doorsType" label="r">Распашные</el-radio>
                    <el-radio v-model="doorsType" label="k">Купе</el-radio>
                </div>

                <div>

                    <div v-if="doorsType === 'r'">
                        <DoorsRasp/>
                    </div>

                    <div v-if="doorsType === 'k'">
                        <DoorsKupe/>
                    </div>

                </div>

            </div>
            
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapMutations } from 'vuex';

import DoorsRasp from '@/components/calc/DoorsRasp.vue';
import DoorsKupe from '@/components/calc/DoorsKupe.vue';

export default {
    data() {
        return {
        
        }
    },
    computed: {
        ...mapGetters('doors',[
            'GET_DOORS_TYPE',
            'GET_SUMMARY'
        ]),
        ...mapGetters('params',[
            'ARE_ALL_PARAMS_SET',
        ]),
        ...mapGetters('inner',[
            'GET_INNER_FULL_DATA',
        ]),
        doorsType: {
            get(){
                return this.GET_DOORS_TYPE;
            },
            set(value){
                this.SET_DOORS_TYPE(value);
            }
        },
        sumString: function() {
            if(this.GET_SUMMARY.sum > 0){
                let str = this.GET_SUMMARY.stringsArray.join('<br/>');
                return str;
            }
            return 'Двери шкафа не выбраны';
        },
        sumNumber: function() {
            return this.GET_SUMMARY.sum;
        },
        isContentAllowedToView: function() {
            return this.ARE_ALL_PARAMS_SET && this.GET_INNER_FULL_DATA;
            // return true;
        }
    },
    methods: {
        ...mapMutations('doors', [
            'SET_DOORS_TYPE'
        ]),
    },
    watch: {

    },
    components: {
        DoorsRasp, DoorsKupe
    },
    beforeMount(){
    }
}
</script>

<style lang="scss">
    .doors {
        &__type {
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px solid #ebebeb;
        }
    }
</style>
