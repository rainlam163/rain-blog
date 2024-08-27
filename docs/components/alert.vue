<template>
    <div v-if="show" class="alert">
        <div class="alert-wrapper">
            <div class="alert-header">
                <h4>{{ title }}</h4>
            </div>
            <div class="alert-body">
                <span>{{ msg }}</span>
            </div>
            <div class="alert-footer">
                <button @click="handleClose">关闭</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '提示'
    },
    msg: {
        type: String,
        required: true
    }
})
const emits = defineEmits(['update:modelValue', 'close'])
const show = computed({
    get() {
        return props.modelValue
    },
    set(val) {
        emits('update:modelValue', val)
    }
})
const handleClose = () => {
    show.value = false
    emits('close')
}
</script>

<style>
.alert {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    font-size: 14px;
    line-height: 30px;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.alert-wrapper {
    background-color: #fff;
    width: 360px;
    position: absolute;
    top: 100px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 10px 20px;
}
.alert-wrapper .alert-header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
}
.alert-wrapper .alert-body span {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.alert-wrapper .alert-footer {
    text-align: right;
    width: 100%;
}
.alert-wrapper .alert-footer button {
    padding: 5px 20px;
    border-radius: 5px;
    background-color: #0099ff;
    color: #fff;
    width: fit-content;
}
</style>