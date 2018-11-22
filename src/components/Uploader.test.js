import React from 'react';
import { shallow, configure } from 'enzyme';
import Uploader from './Uploader';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('Uploader', () => {

    describe('verifyFormat', () => {

        it('should validate ok', () => {
            const wrapper = shallow(<Uploader />);
            const data = [ [ 1,2,3,4,5 ] ];
            const ok = wrapper.instance().verifyFormat(data);
            expect(ok).toBe(true);
            expect(wrapper.state('validationMsg')).toBe('');
        });

        it('should return false for empty data', () => {
            const wrapper = shallow(<Uploader />);
            const data = [];
            const ok = wrapper.instance().verifyFormat(data);
            expect(ok).toBe(false);
            expect(wrapper.state('validationMsg')).toContain('empty');
        });

        it('should return false for invalid column number', () => {
            const wrapper = shallow(<Uploader />);
            const data = [ [ 1, 2, 3, 4, 5, 6 ] ];
            const ok = wrapper.instance().verifyFormat(data);
            expect(ok).toBe(false);
            expect(wrapper.state('validationMsg')).toContain('column');
        });

        it('should return false for too many rows', () => {
            const wrapper = shallow(<Uploader />);
            const row = [ 1, 2, 3, 4, 5 ];
            const data = [];
            let count = 21;
            while (count--) {
                data.push(row);
            }
            const ok = wrapper.instance().verifyFormat(data);
            expect(ok).toBe(false);
            expect(wrapper.state('validationMsg')).toContain('Too many rows');
        });
    });
});
