import React from 'react';
import { shallow, configure } from 'enzyme';
import Normalizer from './Normalizer';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('Normalizer', () => {
    
    const unnormalized = [
        ['a', 'b', 'c', 'd', 'e'],
    ];

    describe('normalizeTable', () => {

        it('should calculate bounds of given coords', () => {
            const wrapper = shallow(<Normalizer currentTable={unnormalized} />);
            const nameToIdx = {
                ADDRESS: 0,
                CITY: 1,
                STATE: 2,
                ZIPCODE: 3,
                CATEGORY: 4
            };
            const normalized = wrapper.instance().normalizeTable(nameToIdx, unnormalized);
            expect(normalized.length).toBe(1);
            expect(normalized[0].address).toBe('a b c d');
            expect(normalized[0].category).toBe('e');
        });
    });

    describe('handleSelectChange', () => {

        it('should add entry to state of selectedOptions', () => {
            const wrapper = shallow(<Normalizer currentTable={unnormalized} />);
            const e = { target: { value: 'ADDRESS' } };
            wrapper.instance().handleSelectChange(0, e);
            expect(wrapper.state('selectedOptions')[0]).toBe('ADDRESS');
        });

        it('should remove entry in state of selectedOptions', () => {
            const wrapper = shallow(<Normalizer currentTable={unnormalized} />);
            const e = { target: { value: '0' } };
            wrapper.instance().handleSelectChange(0, e);
            expect(Object.keys(wrapper.state('selectedOptions')).length).toBe(0);
        });
    });

    describe('handleSubmit', () => {

        it('should set an error for submitting with invalid selections', () => {
            const wrapper = shallow(<Normalizer currentTable={unnormalized} />);
            wrapper.setState({
                selectedOptions: {
                    0: 'ADDRESS',
                    1: 'ADDRESS',
                    2: 'STATE',
                    3: 'ZIPCODE',
                    4: 'CATEGORY'
                }
            });
            const e = { preventDefault: function() { return 1; } };
            wrapper.instance().handleSubmit(e);
            expect(wrapper.state('validationMsg')).toContain('unique');
        });
    });
});
