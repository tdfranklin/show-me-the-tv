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
            currentItem: ''
        };
    };

    handleOpen = id => {
        const apiUrl = this.props.content === 'tv' ? '/api/tv' : '/api/movie';
        axios.get(`${apiUrl}/${id}`)
        .then(res => {
            this.setState({open: true, currentItem: res.data});
        })
        .catch(err => console.log(err));
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        let itemContent;
        const { display, content } = this.props;
        let dialogDisplay;

        if(content === 'tv') {
            dialogDisplay = (
                <div>
                    <img src={this.state.currentItem.image} alt="" style={{ width: '30%', height: '50%', float: 'left', marginRight: 50 }} />
                    <a href={this.state.currentItem.website} target='_blank'><h1 style={{ paddingTop: 100, textDecoration: 'underline', color: 'white' }}>{this.state.currentItem.name}</h1></a>
                    <br />
                    <p>{this.state.currentItem.summary}</p>
                    <br />
                    <p>Genre: {this.state.currentItem.genres}</p>
                    <p>Episodes: {this.state.currentItem.episodes}</p>
                    <p>Seasons: {this.state.currentItem.seasons}</p>                    
                    <p>Rating: {this.state.currentItem.rating}</p>
                    <p>Status: {this.state.currentItem.status}</p>
                </div>
            )
        } else {
            dialogDisplay = (
                <div>
                    <img src={this.state.currentItem.image} alt="" style={{ width: '30%', height: '50%', float: 'left', marginRight: 50 }} />
                    <a href={this.state.currentItem.website} target='_blank'><h1 style={{ paddingTop: 100, textDecoration: 'underline', color: 'white' }}>{this.state.currentItem.name}</h1></a>
                    <br />
                    <p>{this.state.currentItem.summary}</p>
                    <br />
                    <p>Genre: {this.state.currentItem.genres}</p>
                    <p>Runtime: {this.state.currentItem.runtime}</p>
                    <p>Release Date: {this.state.currentItem.release}</p>
                    <p>Rating: {this.state.currentItem.rating}</p>
                </div>
            )
        }

        if(display) {
            itemContent = (
                <GridList cols={3}>
                    {display.map(item => (
                        <GridTile
                            title={item.name}
                            key={item.id}
                            actionIcon={
                                <IconButton onClick={() => this.handleOpen(item.id)}>
                                    <ZoomIn color="white" />
                                </IconButton>
                            }
                        >
                            <img src={item.image} alt="" />
                        </GridTile>
                    ))}
                </GridList>
            );
        } else {
            itemContent = null;
        }

        const actions = [
            <FlatButton label="Close" primary={true} onClick={this.handleClose} />
        ]

        const dialogStyle = {
            width: '100%',
            maxWidth: '90%',
            marginTop: '-8%',
        }
        return (
            <div>
                {itemContent}
                <Dialog 
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    contentStyle={dialogStyle}
                    autoScrollBodyContent={true}
                >
                    {dialogDisplay}
                </Dialog>
            </div>
        );
    }
}

TVShowResults.propTypes = {
    display: PropTypes.array.isRequired,
    content: PropTypes.string.isRequired
}

export default TVShowResults;