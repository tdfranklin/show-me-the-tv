import React from 'react';
import ReactDOM from 'react-dom';
import Search from '../../../../src/components/search/Search';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import { Tabs, Tab } from 'material-ui/Tabs';

configure({ adapter: new Adapter() });

describe('Search', () => {
    it('matches the snapshot', () => {
        const tree = shallow(<Search />);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('calls componentDidMount', () => {
        jest.spyOn(Search.prototype, 'componentDidMount');
        const wrapper = shallow(<Search />);
        expect(Search.prototype.componentDidMount.mock.calls.length).toBe(1);
    });

    describe('Material UI Components', () => {
        const wrapper = shallow(<Search />);

        describe('TextField', () => {
            let node = wrapper.find(TextField);
            
            it('renders component', () => {
                expect(node).toBeTruthy();;
            });

            it('changes label text based on content type', () => {
                const props = node.props();
                expect(props.floatingLabelText).toBe("Search for TV Shows");
                wrapper.setState({value: 'movies'});
                node = wrapper.find(TextField);
                expect(node.props().floatingLabelText).toBe("Search for Movies");
            });

            it('updates value based on state change', () => {
                expect(node.props().value).toBe('');
                wrapper.setState({searchText: 'House'});
                node = wrapper.find(TextField);
                expect(node.props().value).toBe('House');
            });
        });

        describe('Tabs', () => {
            const node = wrapper.find(Tabs);
            
            it('renders component', () => {
                expect(node).toBeTruthy();;
            });
        });

        describe('Tab', () => {
            const node = wrapper.find(Tab);
            
            it('renders component', () => {
                expect(node).toBeTruthy();
            });
        });
    });
});