import React from 'react';
import ReactDOM from 'react-dom';
import App from '../../../src/components/App';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

configure({ adapter: new Adapter() });

describe('App', () => {
    it('matches the snapshot', () => {
        const tree = shallow(<App />);
        expect(toJson(tree)).toMatchSnapshot();
    });
});