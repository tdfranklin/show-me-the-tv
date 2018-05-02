import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { GridList, GridTile } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import axios from 'axios';

class TVShowResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            currentShow: ''
        };
    };

    handleOpen = id => {
        axios.get(`/api/show/${id}`)
        .then(res => {
            this.setState({open: true, currentShow: res.data});
        })
        .catch(err => console.log(err));
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        let showContent;
        const { shows } = this.props;

        if(shows) {
            showContent = (
                <GridList cols={3}>
                    {shows.map(show => (
                        <GridTile
                            title={show.name}
                            key={show.id}
                            actionIcon={
                                <IconButton onClick={() => this.handleOpen(show.id)}>
                                    <ZoomIn color="white" />
                                </IconButton>
                            }
                        >
                            <img src={show.image} alt="" />
                        </GridTile>
                    ))}
                </GridList>
            );
        } else {
            showContent = null;
        }

        const actions = [
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />
        ]

        const dialogStyle = {
            width: '100%',
            maxWidth: '90%',
            marginTop: '-10%',
        }
        return (
            <div>
                {showContent}
                <Dialog 
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={dialogStyle}
                >
                    <img src={this.state.currentShow.image} alt="" style={{ width: '30%', height: '50%', float: 'left', marginRight: 50 }} />
                    <a href={this.state.currentShow.website} target='_blank'><h1 style={{ paddingTop: 100, textDecoration: 'underline', color: 'white' }}>{this.state.currentShow.name}</h1></a>
                    <br />
                    <p>{this.state.currentShow.summary}</p>
                    <br />
                    <p>Genre: {this.state.currentShow.genres}</p>
                    <p>Episodes: {this.state.currentShow.episodes}</p>
                    <p>Seasons: {this.state.currentShow.seasons}</p>                    
                    <p>Rating: {this.state.currentShow.rating}</p>
                    <p>Status: {this.state.currentShow.status}</p>
                </Dialog>
            </div>
        );
    }
}

TVShowResults.propTypes = {
    shows: PropTypes.array.isRequired
}

export default TVShowResults;