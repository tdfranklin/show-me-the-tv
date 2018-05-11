import React from 'react';
import ReactDOM from 'react-dom';
import SearchResults from '../../../../src/components/searchResults/SearchResults';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const apiKey = 'fb6a1d3f38c3d97f67df6d141f936f29';
const apiSearchUrl = 'https://api.themoviedb.org/3';
const apiImageUrl = 'https://image.tmdb.org/t/p/original';
const axios = require('axios');
const popularShows = [];

configure({ adapter: new Adapter() });

beforeAll(() => {
    axios
        .get(`${apiSearchUrl}/tv/popular?api_key=${apiKey}`)
        .then(payload => {
            payload.data.results.forEach(show => {
                popularShows.push({
                    id: show.id,
                    name: show.name,
                    image: `${apiImageUrl}${show.backdrop_path}`
                });
            });
        })
        .catch(err => console.log(err));
});

describe('SearchResults', () => {
    it('matches the snapshot', () => {
        const tree = shallow(<SearchResults display={[]} content='tv' />);
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('accepts display and content prop', () => {
        const wrapper = shallow(<SearchResults display={popularShows} content='tv' />);
        expect(wrapper.instance().props.display).toBe(popularShows);
        expect(wrapper.instance().props.content).toBe('tv');
    });

    it('changes data based on display array', () => {
        const wrapper = shallow(<SearchResults display={[]} content='tv' />);
        const data = wrapper.get(0);
        wrapper.setProps({display: popularShows});
        expect(wrapper.get(0)).not.toBe(data);
    });

    it('changes data based on content string', () => {
        const wrapper = shallow(<SearchResults display={[]} content='tv' />);
        let data = wrapper.get(0);
        wrapper.setProps({content: 'movies'});
        expect(wrapper.get(0)).not.toBe(data);
    });

    describe('Material UI Components', () => {
        const wrapper = shallow(<SearchResults display={popularShows} content='tv' />);

        describe('GridList', () => {
            let node = wrapper.find(GridList);
            
            it('renders component', () => {
                expect(node).toBeTruthy();
            });

            it('has 3 columns', () => {
                expect(node.props().cols).toBe(3);
            });
        });

        describe('GridTile', () => {
            const node = wrapper.find(GridTile);
            
            it('renders component', () => {
                expect(node).toBeTruthy();
            });
        });

        describe('IconButton', () => {
            const node = wrapper.find(IconButton);
            
            it('renders component', () => {
                expect(node).toBeTruthy();
            });
        });

        describe('ZoomIn', () => {
            const node = wrapper.find(ZoomIn);
            
            it('renders component', () => {
                expect(node).toBeTruthy();
            });
        });

        describe('Dialog', () => {
            const node = wrapper.find(Dialog);
            
            it('does not render component', () => {
                expect(node).toBeTruthy();
            });
        });

        describe('FlatButton', () => {
            const node = wrapper.find(FlatButton);
            
            it('does not render component', () => {
                expect(node).toBeTruthy();
            });
        });
    });
});