<template>
    <section class="negotiation-panel">
        <header>
            <h2 class="negotiation-panel__title">{{ title }}</h2>
        </header>

        <form @submit="submit">
            <label v-show="!submitted">
                <span class="negotiation-panel__label">{{ $t('app.negotiation.panel.input.label') }}</span>
                <input ref="inputEl" class="negotiation-panel__input" type="number" v-model="inputValue" />
            </label>

            <btn class="negotiation-panel__submit" type="submit" :disabled="!allowedToSubmit">
                {{ $t('app.negotiation.panel.submit.label') }}
            </btn>
        </form>
    </section>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from '@vue/composition-api';
import Btn from '@/ui/Btn.vue';

export default defineComponent({
    name: 'NegociationPanel',
    components: { Btn },
    props: {
        title: {
            type: String,
            required: true,
        },
    },
    setup(props, { emit }) {
        const inputEl = ref<HTMLElement | null>(null);
        const inputValue = ref<string | null>(null);
        const submit = (e: Event) => {
            e.preventDefault();

            if (inputValue.value === '' || inputValue.value === null) {
                return;
            }

            emit('submit', parseInt(inputValue.value, 10));
            submitted.value = true;
        };
        const submitted = ref<boolean>(false);
        const allowedToSubmit = computed<boolean>(() => inputValue.value !== null && !submitted.value);
        const focusField = () => {
            if (!inputEl.value) {
                return;
            }

            inputEl.value.focus();
        };

        onMounted(focusField);

        return {
            inputEl,
            inputValue,
            allowedToSubmit,
            submit,
            submitted,
        };
    },
});
</script>

<style lang="scss" scoped>
.negotiation-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 300px;
    padding: 20px;

    &__title {
        margin-bottom: 20px;
        font-size: $fs_l;
    }

    &__label {
        @include srOnly;
    }

    &__input {
        padding: 10px;
        font-size: $fs_m;
        font-weight: 600;
        @include radius;
        border: 1px solid $c_bd;

        &:focus {
            border-color: $c_primary;
            outline: none;
        }
    }

    &__submit {
        display: block;
        margin: 30px auto 0;
    }
}
</style>
