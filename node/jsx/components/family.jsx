import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import PhotoViewer from './photoViewer.jsx';

class Family extends React.Component {
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
        if (selectedPhoto < this.props.family.photos.length) {
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
            f = this.props.family,
            selectedPhoto = this.state.selectedPhotoIndex,
            thumbs = [];
        f.photos.forEach(function(link,index) {
            if(index == selectedPhoto) { 
                thumbs.push(<img key={index} src={link.thumb} className="selected" />);
            } else {
                thumbs.push(<img key={index} src={link.thumb} onClick={() => self.update('selectedPhotoIndex',index)} />);
            }
        });
        return (
            <div className="family">
                <div className="title">
                    <a href={'/family/' + f.name.replace(/ /g,'_')}><label className="main">{f.name}</label></a>
                    <label className="secondary">family</label>
                </div>
                <div className="description">
                    <div dangerouslySetInnerHTML={this.createMarkup(f.descrip)}></div>
                </div>
                { (selectedPhoto != null) ? 
                    <PhotoViewer 
                        nextCallback={() => this.nextPhoto()} 
                        prevCallback={() => this.prevPhoto()} 
                        closeCallback={() => this.closePhotoviewer()}
                        image={f.photos[selectedPhoto].medium} 
                        original = {f.photos[selectedPhoto].original} /> : null }
                <div className="photos">
                    {thumbs}
                </div>
            </div>
        );
    }
}

export default Family