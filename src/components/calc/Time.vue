<template>
    <div class="block">
        <div class="block__header block-header">
            <div class="block-header__title">Сроки</div>
            <div class="block-header__sum">
            </div>
        </div>

        <div class="block__content sum">
            <div class="time__number">{{timeString}}</div>

            <div class="time-spoiler">
                <el-collapse v-model="spoiler">
                    <el-collapse-item name="more">
                        <template slot="title">
                            Подробнее
                        </template>
                        <div v-for="obj in timeOptionsArrayForSpoiler" :key = "obj.str" 
                            class="time-spoiler__row" 
                            :class="{'time-spoiler__row--active': obj.status}">
                                <div class="time-spoiler__row--icon-wrapper"><i class="el-icon-check" v-show="obj.status"></i></div>
                                <span>{{obj.str}}</span>
                        </div>
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
            timeOptions: {},
            spoiler: []
        }
    },
    computed: {
        ...mapGetters([
            'params/IS_AT_LEAST_ONE_PARAM_IS_MODIFIED',
            'params/ARE_ALL_PARAMS_SET',
            'inner/GET_INNER_FULL_DATA',
            'doors/GET_DOORS_TYPE', 
            'time/GET_TIME_OPTIONS'
        ]),
        isContentAllowedToView: function(){
            return this['params/ARE_ALL_PARAMS_SET'] && this['inner/GET_INNER_FULL_DATA'];
        },
        timeString: function() {
            let time = this.timeOptions.default;
            let param = 'r';
            let prefix = 'от ';

            if(this.isContentAllowedToView) {
                time = this.daysCount();
                param = 'i';
                prefix = '';
            }

            let word = this.daysWordRusEnding(time, param);

            return prefix + time + ' ' + word;
        },
        timeOptionsArrayForSpoiler: function() {
            let timeOptions = [];

            //doors type
            let doors = this.timeOptions.doorsType;
            for (let currentDoorsType in doors){
                let currentDoorParam = this.timeOptions.doorsType[currentDoorsType];
                let str = currentDoorParam.name + ': от ' + currentDoorParam.time;
                let selectedDoorsType = this['doors/GET_DOORS_TYPE'];
                let status = false;
                if(this.isContentAllowedToView){
                    status = currentDoorsType === selectedDoorsType;
                }
                let timeOption = {str, status}
                timeOptions.push(timeOption);
            }

            //params modified
            let str = this.timeOptions.paramsModified.name + ': +' + this.timeOptions.paramsModified.time;
            let status = this['params/IS_AT_LEAST_ONE_PARAM_IS_MODIFIED'];
            let timeOption = {str, status}
            timeOptions.push(timeOption);

            return timeOptions;
        },
    },
    methods: {
        daysWordRusEnding: function (value, param){  
            let words = {
                i: ['день', 'дня', 'дней'], //именительный падеж
                r: ['дня', 'дней'] //родительный падеж
            }
            value = Math.abs(value) % 100; 
            let num = value % 10;

            if(param == 'i'){
                if(value < 10 || value >= 20){
                    if(num == 1) return words.i[0]; 
                    if(num > 1 && num < 5) return words.i[1];
                    return words.i[2]; 
                }

                if(value >= 10 || value < 20){
                    return words.i[2]; 
                }

                return words.i[2];
            }

            if(param == 'r'){
                if((value < 10 || value >= 20) && num == 1) return words.r[0];
                return words.r[1];
            }
        },
        daysCount: function() {
            let doorsType = this['doors/GET_DOORS_TYPE'];
            let areParamsModified = this['params/IS_AT_LEAST_ONE_PARAM_IS_MODIFIED'];
            let time = 0;

            time = time + this.timeOptions.doorsType[doorsType].time;

            if(areParamsModified){
                time = time + this.timeOptions.paramsModified.time;
            }

            return time;
        },
        gettimeOptionsFromVuex: function() {
            this.timeOptions = JSON.parse(JSON.stringify(this['time/GET_TIME_OPTIONS']));
        }
    },
    beforeMount(){
        this.gettimeOptionsFromVuex();
    }
}
</script>

<style lang="scss">

.time {

    &__number {
        font-weight: 900;
        margin-bottom: 10px;
        margin-top: 10px;
    }
  
    &-spoiler {
        margin-bottom: 10px;

        &__row{
            padding: 0 5px;
            font-size: 14px;
            display: flex;

            &--icon-wrapper{
                width: 20px;
            }

            &--active {
                background-color: #ecf5ff;
                color: #007dff;
            }
        }
    }

}

</style>
