import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import PhotoViewer from './photoViewer.jsx';

class Species extends React.Component {
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
        if (selectedPhoto < this.props.species.photos.length) {
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

    render() {
        var self = this,
            s = this.props.species,
            selectedPhoto = this.state.selectedPhotoIndex,
            thumbs = [];
            if (s.photos && s.photos.length > 0) {
                s.photos.forEach(function(link,index) {
                    if(index == selectedPhoto) { 
                        thumbs.push(<img key={index} src={link.thumb} className="selected" />);
                    } else {
                        thumbs.push(<img key={index} src={link.thumb} onClick={() => self.update('selectedPhotoIndex',index)} />);
                    }
                });
            }
        var links = s.links.map(function(link, index){
                return <li key={index} ><a target="_blank" href={link.url}>{link.name}</a></li>
        });
        return (
            <div className="species">
                <div className="title">
                    <a href={'/species/' + s.name.replace(/ /g,'_')}><label className="main">{s.genus_name} <span className="speciesTitle">{s.name}</span></label></a>
                    <label className="secondary">species</label>
                </div>
                <div className="description">
                    <div dangerouslySetInnerHTML={this.createMarkup(s.descrip)}></div>
                </div>
                <div className="links">
                    <ul>
                        {links}
                    </ul>
                </div>
                { (selectedPhoto != null) ? 
                    <PhotoViewer 
                        nextCallback={() => this.nextPhoto()} 
                        prevCallback={() => this.prevPhoto()} 
                        closeCallback={() => this.closePhotoviewer()}
                        image={s.photos[selectedPhoto].medium} 
                        imageName={s.photos[selectedPhoto].name} 
                        imageDescription={s.photos[selectedPhoto].description} 
                        original = {s.photos[selectedPhoto].original} /> : null }
                <div className="photos">
                    {thumbs}
                </div>
            </div>
        );
    }
}

export default Species