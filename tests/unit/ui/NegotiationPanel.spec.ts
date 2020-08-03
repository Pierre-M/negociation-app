import NegotiationPanel from '@/ui/NegotiationPanel.vue';
import { shallowMount, Wrapper } from '@vue/test-utils';
import flushPromises from "flush-promises";

let wrapper: Wrapper<any>;

describe('NegotiationPanel', () => {
    beforeEach(() => {
        wrapper = shallowMount(NegotiationPanel, {
            propsData: {
                title: 'Test',
                inputLabel: 'toto',
            },
        });
    });

    afterEach(() => wrapper.destroy());

    describe('Initial state', () => {
        it('should display input with no value', () => {
            expect(wrapper.find('label').element).toBeVisible();
            expect(wrapper.find('input').element).toHaveValue(null);
        });

        it('should not allow submission', () => {
            expect(wrapper.find('button[type="submit"]').element).toBeDisabled();
        });
    });

    it('should allow submission once a value has been entered', async () => {
        wrapper.find('input').setValue(10);
        await flushPromises();

        expect(wrapper.find('button').element).not.toBeDisabled();
    });

    it('should not emit submit event when input value is null', () => {
        wrapper.find('input').setValue(null);

        wrapper.find('form').trigger('submit');

        expect(wrapper.emitted().submit).toBeFalsy();
    });

    it('should emit submit event with parsed input value upon submission', () => {
        const typedValue = '10';
        wrapper.find('input').setValue(typedValue);

        wrapper.find('form').trigger('submit');

        expect((wrapper.emitted().submit as any)[0][0]).toEqual(10);
    });

    it('should not display input once form has been submitted', async () => {
        const typedValue = '10';
        wrapper.find('input').setValue(typedValue);
        wrapper.find('form').trigger('submit');

        await flushPromises();

        expect(wrapper.find('label').element).not.toBeVisible();
    });

    it('should not be allowed to submit again once form has been submitted', async () => {
        const typedValue = '10';
        wrapper.find('input').setValue(typedValue);
        wrapper.find('form').trigger('submit');

        await flushPromises();

        expect(wrapper.find('button[type="submit"]').element).toBeDisabled();
    });
});
