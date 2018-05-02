import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TVShowResults from '../tvShowResults/TVShowResults';
import axios from 'axios';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchText: '',
            shows: [],
            popular: []
        };
    };

    componentDidMount() {
        axios
            .get('/api/popular')
            .then(res => this.setState({shows: res.data, popular: res.data}))
            .catch(err => console.log(err));
    }

    onTextChange = e => {
        const value = e.target.value;
        this.setState({ [e.target.name]: value }, () => {
            if (value === '') {
            this.setState({ shows: this.state.popular });
            } else {
                axios
                    .get(`/api/search/${value}`)
                    .then(res => this.setState({ shows: res.data }))
                    .catch(err => console.log(err));
            } 
        });
    }

    render() {
        return (
            <div>
                <TextField
                    name='searchText'
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                    floatingLabelText="Search for TV Shows"
                    fullWidth={true}
                />
                <br />
                {this.state.shows.length > 0 ? (<TVShowResults shows={this.state.shows} />) : null }
            </div>
        );
    }
}

export default Search;