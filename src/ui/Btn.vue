<template>
    <button class="btn" v-on="$listeners">
        <slot />
    </button>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api';

export default defineComponent({
    name: 'Btn',
    props: {},
});
</script>

<style lang="scss" scoped>
.btn {
    padding: 10px 20px;
    background-color: $c_primary;
    border: none;
    color: $white;
    font-size: $fs_m;
    font-weight: 600;
    cursor: pointer;
    @include radius;
}
</style>
