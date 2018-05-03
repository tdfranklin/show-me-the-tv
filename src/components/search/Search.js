import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { Tabs, Tab } from 'material-ui/Tabs';
import SearchResults from '../searchResults/SearchResults';
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            display: [],
            popularTV: [],
            popularMovies: [],
            value: 'tv'
        };
    }

    componentDidMount() {
        axios
            .get('/api/tv/popular')
            .then(res => this.setState({display: res.data, popularTV: res.data}))
            .catch(err => console.log(err));
        axios
            .get('/api/movie/popular')
            .then(res => this.setState({popularMovies: res.data}))
            .catch(err => console.log(err));
    }

    onTextChange = e => {
        const val = e.target.value;
        const content = this.state.value;
        this.setState({ [e.target.name]: val }, () => {
            if (val === '') {
                content === 'tv' ?
                this.setState({ display: this.state.popularTV }) :
                this.setState({ display: this.state.popularMovies });             
            } else {
                const apiUrl = content === 'tv' ? '/api/tv/search' : '/api/movie/search';
                console.log(apiUrl);
                axios
                    .get(`${apiUrl}/${val}`)
                    .then(res => this.setState({ display: res.data }))
                    .catch(err => console.log(err));
            } 
        });
    }

    handleChange = value => {
        value === 'tv' ? 
        this.setState({value, searchText: '', display: this.state.popularTV}) : 
        this.setState({value, searchText: '', display: this.state.popularMovies});
    }

    render() {
        const tabStyle = {
            background: '#1c1d1d',
            color: 'darkgrey',
            fontSize: '20px'
        }
        const labelText = this.state.value === 'tv' ? 'Search for TV Shows' : 'Search for Movies';
        return (
            <div>
                <TextField
                    name='searchText'
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText={labelText}
                    fullWidth={true}
                />
                <br />
                <Tabs
                        value={this.state.value}
                        onChange={this.handleChange}
                        style={{marginBottom: '1%'}}
                    >
                        <Tab label="TV" value="tv" style={tabStyle} />>
                        <Tab label="Movies" value="movies" style={tabStyle} />>
                    </Tabs>
                {this.state.display.length > 0 ? 
                (<SearchResults display={this.state.display} content={this.state.value} />) : 
                null }
            </div>
        );
    }
}

export default Search;