<template>
    <div class="calc">
        
        <div class="calc__row">
            <div class="calc__block">
                <Params/>
            </div>
        </div>

        <div class="calc__row">
            <div class="calc__block">
                <Inner/>
            </div>
        </div>

        <div class="calc__row">
            <div class="calc__block">
                <Doors/>
            </div>
        </div>

        <div class="calc__row">
            <div class="calc__block">
                <Additional/>
            </div>
        </div>

        <div class="calc__row">
            <div class="calc__block">
                <Price/>
            </div>
            <div class="calc__block">
                <Time/>
            </div>
        </div>

    </div>
</template>

<script>
// @ is an alias to /src

import Params from '@/components/calc/Params.vue';
import Inner from '@/components/calc/Inner.vue';
import Doors from '@/components/calc/Doors.vue';
import Additional from '@/components/calc/Additional.vue';
import Price from '@/components/calc/Price.vue';
import Time from '@/components/calc/Time.vue';

export default {
    name: 'Calc',
    components: {
        Params, Inner, Doors, Additional, Price, Time
    }
}
</script>

<style lang="scss">
    .calc {
        padding: 20px;
        max-width: 1024px;
        box-sizing: border-box;
        
        &__row {
            display: flex;
            margin-bottom: 10px;
            width: 100%;

            &:last-child {
                margin-bottom: 0;
            }
        }

        &__block {
            flex: 1 1 100%;
            background-color: #ffffff;
            color: #495057;
            box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12);
            border-radius: 3px;
            padding: 1rem;
            margin-right: 10px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .block {
        &__header {
            font-size: 1.5em;
            font-weight: 700;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
        }
    }
</style>

<style lang="scss">
    //Element-UI

    .el-tooltip__popper {
        line-height: 1.5 !important;
        font-size: 14px !important;
    }

    .el-input__inner {
        padding: 0 5px;
    }

    .input--error {
        .el-input__inner {
            border: 1px solid red !important;
        }
    }

    .input--warning{
        .el-input__inner {
            border: 1px solid orange !important;
        }
    }

    .el-checkbox__input{
        vertical-align: baseline !important;
    }

    .el-checkbox__label {
        font-size: 16px !important;
        padding-left: 7px !important;
    }

    .el-input-number--small {
        width: 80px !important;
    }

    .el-checkbox__input.is-checked+.el-checkbox__label {
        color: red !important;
    }

    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: red !important;
        border-color: red !important;
    }

    .el-input-number.is-controls-right .el-input__inner {
        padding-right: 48px !important;
    }

    
        // .el-radio__input {
        //     vertical-align: baseline;
        // }

        // .el-radio__label {
        //     font-size: 16px;
        // }
</style>
