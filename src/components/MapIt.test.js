import React from 'react';
import { shallow, configure } from 'enzyme';
import MapIt from './MapIt';
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('MapIt', () => {

    describe('calculateBounds', () => {
        const rows = [
            { geo: { lat: 0, lng: 0 } },
            { geo: { lat: 1, lng: 1 } },
            { geo: { lat: 2, lng: 2 } }
        ];

        it('should calculate bounds of given coords', () => {
            const wrapper = shallow(<MapIt tables={[]} googleMapsApiKey={'foo'} />);
            const bounds = wrapper.instance().calculateBounds(rows);
            expect(bounds.ne.lat).toBe(2);
            expect(bounds.ne.lng).toBe(2);
            expect(bounds.sw.lat).toBe(0);
            expect(bounds.sw.lat).toBe(0);
        });
    });

    describe('handleClick', () => {
        it('should update centerLat, centerLng, activeMarkers', () => {
            const tables = [
                [
                    {
                        category: 'cat1',
                        address: 'addr1',
                        geo: { lat: 0, lng: 0 }
                    },
                    {
                        category: 'cat2',
                        address: 'addr2',
                        geo: { lat: 1, lng: 1 }
                    },
                    {
                        category: 'cat3',
                        address: 'addr3',
                        geo: { lat: 2, lng: 2 }
                    }
                ]
            ];
            const wrapper = shallow(<MapIt tables={tables} googleMapsApiKey={'foo'} />);
            wrapper.instance().handleClick(0);
            
            expect(parseInt(wrapper.state('centerLat'))).toBe(1);
            expect(parseInt(wrapper.state('centerLng'))).toBe(1);
            expect(Object.keys(wrapper.state('activeMarkers')).length).toBe(3);
        });
    });
});
