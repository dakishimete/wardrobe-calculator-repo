<template>
    <div class="block">
        <div class="block__header block-header">
            <div class="block-header__title">Стоимость</div>
            <div class="block-header__sum">
            </div>
        </div>

        <div class="block__content sum">
            <div class="time__number">{{timeString}}</div>

            <div class="time-spoiler">
                <el-collapse v-model="spoiler">
                    <el-collapse-item name="more">
                        <template slot="title">
                            Сроки
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
            'doors/GET_DOORS_TYPE', 
            'time/GET_TIME_OPTIONS'
        ]),
        timeString: function() {
            let time = this.daysCount();
            let word = this.daysWordRusEnding(time);

            return time + ' ' + word;
        },
        timeOptionsArrayForSpoiler: function() {
            let timeOptions = [];

            let doors = this.timeOptions.doorsType;
            for (let currentDoorsType in doors){
                let currentDoorParam = this.timeOptions.doorsType[currentDoorsType];
                let str = currentDoorParam.name + ': от ' + currentDoorParam.time;
                let selectedDoorsType = this['doors/GET_DOORS_TYPE'];
                let status = currentDoorsType === selectedDoorsType;
                let timeOption = {str, status}
                timeOptions.push(timeOption);
            }

            let str = this.timeOptions.paramsModified.name + ': +' + this.timeOptions.paramsModified.time;
            let status = this['params/IS_AT_LEAST_ONE_PARAM_IS_MODIFIED'];
            let timeOption = {str, status}
            timeOptions.push(timeOption);

            return timeOptions;
        },
    },
    methods: {
        daysWordRusEnding: function (value){  
            let words = ['день', 'дня', 'дней'];
            value = Math.abs(value) % 100; 
            let num = value % 10;

            if(num == 1) return words[0]; 
            if(num > 1 && num < 5) return words[1];
            if(value >= 5 && value < 20) return words[2]; 
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
