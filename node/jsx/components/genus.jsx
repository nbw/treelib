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

    render() {
        var self = this,
            g = this.props.genus,
            selectedPhoto = this.state.selectedPhotoIndex,
            thumbs = [];

        var species = g.species.map(function(s){
            return <li><a href={"/species/" + s.name}>{s.name}</a></li>
        });

        g.photos.forEach(function(link,index) {
            if(index == selectedPhoto) { 
                thumbs.push(<img key={index} src={link.thumb} className="selected" />);
            } else {
                thumbs.push(<img key={index} src={link.thumb} onClick={() => self.update('selectedPhotoIndex',index)} />);
            }
        });
        return (
            <div className="genus">
                <div className="title">
                    <a href={'/genus/' + g.name.replace(/ /g,'_')} ><label className="main">{g.name}</label></a>
                    <label className="secondary">genus</label>
                </div>
                <div className="textContent">
                    <div className="description">
                        {g.descrip}
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
                        original = {g.photos[selectedPhoto].original} /> : null }
                <div className="photos">
                    {thumbs}
                </div>
            </div>
        );
    }
}

export default Genus