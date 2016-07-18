import React from 'react';
import ReactDOM from 'react-dom';

var pg = pageData;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            title: pg.species.name || "",
            description: pg.species.descrip || "",
            genus_id: pg.species.genus_id || pg.genera[0].id || 0,
            album_id: pg.species.album_id || 0,
            links: pg.species.links || []
        };
    }
    update(name, value) {
        this.setState({
            [name]: value
        });
    }
    handleInputChange(name, e) {
        this.setState({
            [name]: e.target.value
        });
    }
    updateTheMotherShip() {
        if( !this.state.album_id ) {
            alert('Please choose a photo album, then try again.')
            return;
        }

        fetch('/api/edit_species', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: pg.species.id || null,
                name: this.state.title,
                descrip: this.state.description,
                g_id: this.state.genus_id,
                album_id: this.state.album_id || null,
                links: this.state.links,
                key: pg.key
            })
        }).then(function(response) {
            if(response.ok) {
                response.json().then(function(obj) {
                    window.location.href = window.location.origin + window.location.pathname + '?id=' + obj.id;
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
        return (
            <div>
                <h1>{this.state.title || "New Species"}</h1>
                <hr />
                <Inputer
                    id = "name"
                    title = "Name"
                    placeholder = "species"
                    text = {this.state.title}
                    handler = {this.handleInputChange.bind(this, 'title')} />
                <Dropper
                    id = "genera"
                    title = "Genus"
                    default = {this.state.genus_id}
                    list = {pg.genera}
                    handler = {this.handleInputChange.bind(this, 'genus_id')} />
                <hr />
                <Texter
                    id = "description" 
                    title = "Description"
                    placeholder = "enter description here"
                    text = {this.state.description}
                    handler = {this.handleInputChange.bind(this, 'description')} />
                <hr />
                <Dropper
                    id = "photoAlbum"
                    title = "Photo Album"
                    default = {this.state.album_id}
                    list = {pg.photo_albums}
                    handler = {this.handleInputChange.bind(this, 'album_id')} />
                <PhotoArray
                    photos = {pg.species.photos} />
                <hr />
                <Linker
                    links = {this.state.links}
                    handler = {this.update.bind(this, 'links')} />
                <hr />
                <Saver
                    id = "saveButton"
                    callback = {this.updateTheMotherShip.bind(this)} />
            </div>
        );
    }
}

class Inputer extends React.Component {
    render() {
        return (
            <div id={this.props.id} className='question'>
                <span className="title">{this.props.title}: </span>
                <input type="text"
                    value={this.props.text}
                    placeholder={this.props.placeholder}
                    onChange={this.props.handler}
                     />
            </div>
        );
    }
}
class Texter extends React.Component {
    render() {
        return (
            <div id={this.props.id} className='question'>
                <span className="title">{this.props.title}: </span>
                <textarea
                    value={this.props.text}
                    placeholder={this.props.placeholder}
                    onChange={this.props.handler}
                     />
            </div>
        );
    }
}

class Linker extends React.Component {
    constructor() {
        super();
        this.state = {
            newLinkName: "",
            newLinkURL: "",
            showAddLinkInput: false
        };
    }
    showInput() {
        this.setState({
            showAddLinkInput: true
        });
    }
    saveLink() {
        if(this.state.newLinkName.length === 0 || this.state.newLinkURL.length === 0) {
            alert('try again. something is missing.');
        } else {
            this.props.links.push({ name: this.state.newLinkName, url: this.state.newLinkURL});
            this.props.handler(this.props.links);
        }
        this.setState({
            newLinkName: "",
            newLinkURL: "",
            showAddLinkInput: false,
        });
    }
    removeLink(e) {
        var index = this.props.links.indexOf(e);
        this.props.links.splice(index, 1);
        this.props.handler(this.props.links);
    }
    updateLinkInput(name,e) {
        this.setState({
            [name]: e.target.value
        });
    }
    render() {
        var rows = [];
        for ( let item of this.props.links ) {
            rows.push(
                <Link   key={item.name}
                        name={item.name}
                        url={item.url}
                        handler={this.removeLink.bind(this)} />);
        }
        return (
        <div id="linker">
            Links:
            <table className="linksTable">
            <thead>
                <tr><th>Name</th><th>URL</th><th></th></tr>
            </thead>
            {rows}
            </table>
            { !this.state.showAddLinkInput ? <div className="addLinkBtn" onClick={this.showInput.bind(this)}>+ add URL</div> : null }
            { this.state.showAddLinkInput ?
                <div className="addLinkInput">
                    <input 
                        placeholder="display name"
                        value={this.state.newLinkName}
                        onChange={this.updateLinkInput.bind(this, 'newLinkName')} />
                    and <input 
                        placeholder="URL" 
                        value={this.state.newLinkURL} 
                        onChange={this.updateLinkInput.bind(this, 'newLinkURL')} />
                    <span className="btn-std" onClick={this.saveLink.bind(this)}>add</span>
                </div> : null }
        </div>
        );
    }
}
class Link extends React.Component {
    delete() {
        this.props.handler(this.props);
    }
    render() {
        return (
            <tr className="link">
                <td className="title">{this.props.name}</td><td><a className="url" href={this.props.url}>{this.props.url}</a></td><td><span className="delete" onClick={this.delete.bind(this)}></span></td>
            </tr>
        );
    }
}

class Dropper extends React.Component {
    render() {
        var rows = [];
        this.props.list.forEach(function(item) {
            rows.push(<option value={item.id} key={item.id}>{item.name}</option>);
        });
        return (
            <div className='question'>
                <span className="title">{this.props.title}: </span>
                <select onChange={this.props.handler} defaultValue={this.props.default}>
                    {rows}
                </select>
            </div>
        );
    }
}

class Saver extends React.Component {
    render() {
        return (
            <div id={this.props.id}
                className='button'
                onClick={this.props.callback}>
                save
            </div>
        );
    }
}


class PhotoArray extends React.Component {
    render() {
        var photoEditers = [];
        if (this.props.photos) {
            this.props.photos.forEach(function(item) {
                photoEditers.push(<PhotoEditer img={item} />);
            });
        }
        return (
            <div className='photoArray'>
                {photoEditers}
            </div>
        );
    }
}

class PhotoEditer extends React.Component {
    render() {
        return (
            <div className="photoEditer" >
                <img src={this.props.img} />
                {/*
                <div className="name"><input placeholder="name"/></div>
                <hr />
                <div className="description"><textarea placeholder="description"/></div>
                <hr />
                <div className="credit"><input placeholder="photo credit"/></div>
                <hr />
                <div className="btn-std">Save</div>
                */}
            </div>
        );
    }
}

if (self.fetch) {

} else {
    console.log('Unsupported browser. Please use Firefox or Google Chrome')
}

export default App
ReactDOM.render(<App />, document.getElementById('app'));
