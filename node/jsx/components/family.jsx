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

        var genera = f.genera.map(function(g,i){
            return <li key={i} ><a href={"/search?f_id="+ f.id + "&g_id="+ g.id}>{g.name}</a></li>
        });

        if( f.photos && f.photos.length > 0 ) {
            f.photos.forEach(function(link,index) {
                if(index == selectedPhoto) { 
                    thumbs.push(<img key={index} src={link.thumb} className="selected" />);
                } else {
                    thumbs.push(<img key={index} src={link.thumb} onClick={() => self.update('selectedPhotoIndex',index)} />);
                }
            });
        }
        return (
            <div className="family">
                <div className="title">
                    <a href={'/family/' + f.name.replace(/ /g,'_')}><label className="main">{f.name}</label></a>
                    <label className="secondary">family</label>
                </div>
                <div className="textContent">
                    <div className="description">
                        <div dangerouslySetInnerHTML={this.createMarkup(f.descrip)}></div>
                    </div>
                    <div className="genera">
                        <label className="genusTitle">Genera</label>
                        <ul>
                            {genera}
                        </ul>
                    </div>
                </div>
                { (selectedPhoto != null) ? 
                    <PhotoViewer 
                        nextCallback={() => this.nextPhoto()} 
                        prevCallback={() => this.prevPhoto()} 
                        closeCallback={() => this.closePhotoviewer()}
                        image={f.photos[selectedPhoto].medium}
                        imageName={f.photos[selectedPhoto].name}
                        imageDescription={f.photos[selectedPhoto].description} 
                        original = {f.photos[selectedPhoto].original} 
                        flickr_url = {f.photos[selectedPhoto].flickr_url} /> : null }
                { thumbs.length > 0 ? 
                <div className="photos">
                    <div className="thumbs">{thumbs}</div>
                    <label className="subtitle">The above photos have been randomly selected from species in {f.name}</label>
                </div> 
                : null }
            </div>
        );
    }
}

export default Family