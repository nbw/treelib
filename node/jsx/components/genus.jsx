import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import PhotoViewer from './photoViewer.jsx';

class Genus extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedPhotoIndex: null
        };
    }
    update(name, value) {
        this.setState({
            [name]: value // ES6 computed property
        });
    }
    nextPhoto(){
        var selectedPhoto = this.state.selectedPhotoIndex;
        if (selectedPhoto < this.props.genus.photos.length) {
            this.update("selectedPhotoIndex", selectedPhoto + 1);
        }
        return;
    }
    prevPhoto(){
        var selectedPhoto = this.state.selectedPhotoIndex;
        if (selectedPhoto > 0) {
            this.update("selectedPhotoIndex", selectedPhoto - 1);
        }
    }
    closePhotoviewer(){
            this.update("selectedPhotoIndex", null);
    }
    createMarkup(s) {
        return {__html: s};
    }
    grabMorePhotos(event) {
        var self = this,
        g = this.props.genus;
        fetch('/api/get_genus_photos?genus_id=' + g.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            if(response.ok) {
                response.json().then(function(photos) {
                    g.photos = photos;
                    self.update("selectedPhotoIndex", null);
                });
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    }

    render() {
        var self = this,
            g = this.props.genus,
            selectedPhoto = this.state.selectedPhotoIndex,
            thumbs = [];

        var species = g.species.map(function(s,i){
            return <li key={i} ><a href={"/search?f_id=" + g.family_id + "&g_id=" + g.id + "&s_id="+ s.id}>{s.name}</a></li>
        });
        if( g.photos && g.photos.length > 0 ) {
            g.photos.forEach(function(link,index) {
                if(index == selectedPhoto) { 
                    thumbs.push(<img key={index} src={link.thumb} className="selected" />);
                } else {
                    thumbs.push(<img key={index} src={link.thumb} onClick={() => self.update('selectedPhotoIndex',index)} />);
                }
            });
        }
        return (
            <div className="genus">
                <div className="title">
                    <a href={'/genus/' + g.name.replace(/ /g,'_')} ><label className="main">{g.name}</label></a>
                    <label className="commonName">{g.common_name}</label>
                    <label className="secondary">genus</label>
                </div>
                <div className="textContent">
                    <div className="description">
                        <div dangerouslySetInnerHTML={this.createMarkup(g.descrip)}></div>
                    </div>
                    <div className="species">
                        <label className="speciesTitle">Species</label>
                        <ul>
                            {species}
                        </ul>
                    </div>
                </div>
                { (selectedPhoto != null) ? 
                    <PhotoViewer 
                        nextCallback={() => this.nextPhoto()}
                        prevCallback={() => this.prevPhoto()}
                        closeCallback={() => this.closePhotoviewer()}
                        image={g.photos[selectedPhoto].medium}
                        imageName={g.photos[selectedPhoto].name}
                        imageDescription={g.photos[selectedPhoto].description}
                        original = {g.photos[selectedPhoto].original} 
                        flickr_url = {g.photos[selectedPhoto].flickr_url} /> : null }
                { thumbs.length > 0 ? 
                <div className="photos">
                    <label className="subtitle">The photos below have been randomly selected from species in {g.name}.</label>
                    <div className="thumbs">{thumbs}</div>
                    <div onClick={ this.grabMorePhotos.bind(this) } className="newPhotoSelectionButton">
                        new random photo selection
                    </div>
                </div>
                : null}
            </div>
        );
    }
}

export default Genus