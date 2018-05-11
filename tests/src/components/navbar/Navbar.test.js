import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../../../../src/components/navbar/Navbar';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('Navbar', () => {
    it('matches the snapshot', () => {
        const tree = shallow(<Navbar />);
        expect(toJson(tree)).toMatchSnapshot();
    });
});