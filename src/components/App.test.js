import React from 'react';
import { shallow, configure } from 'enzyme';
import App from './App';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('App', () => {

    describe('addTable', () => {
        const mockGetGeocodes = jest.fn();

        mockGetGeocodes.mockReturnValue([{
            'lat': 111,
            'lng': 222
        }]);

        const table = [{
            category: 'foo',
            address: 'bar'
        }];

        it('should add a table with category and address', async () => {
            const wrapper = shallow(<App />);
            wrapper.instance().getGeocodes = mockGetGeocodes;
            wrapper.update();
            expect(wrapper.state('tables').length).toBe(0);
            await wrapper.instance().addTable(table);

            const tables = wrapper.state('tables');
            expect(wrapper.state('tables').length).toBe(1);
            expect(tables[0][0].category).toBe('foo');
            expect(tables[0][0].address).toBe('bar');
        });

        it('should add geo codes', async () => {
            const wrapper = shallow(<App />);
            wrapper.instance().getGeocodes = mockGetGeocodes;
            wrapper.update();
            await wrapper.instance().addTable(table);

            const tables = wrapper.state('tables');
            expect(tables[0][0].geo.lat).toBe(111);
            expect(tables[0][0].geo.lng).toBe(222);
        });
    }); 
});
