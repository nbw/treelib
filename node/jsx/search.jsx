import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Family from './components/family.jsx';
import Genus from './components/genus.jsx';
import Species from './components/species.jsx';
import SearchSidebar from './components/searchSidebar.jsx';

var pg = pageData;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
        	selectedItem: { item: null, itemType: null },
            sidebarMinimized: false,
            sidebarHidden: false
        };
    }
    componentDidMount() {
        window.addEventListener("fullScreenPhoto", () => {this.update('sidebarHidden', !this.state.sidebarHidden );});
    }
    componentWillUnmount(){
        window.removeEventListener("fullScreenPhoto", () => {});
    }
    update(name, value) {
        this.setState({
            [name]: value // ES6 computed property
        });
        console.log(this.state);
    }
    handleInputChange(name, e) {
        this.setState({
            [name]: e.target.value // ES6 computed property
        });
    }

    speciesSelectedHandler(s, handler) {
        self = this;
        fetch('/api/get_species_photos?species_id=' + s.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            if(response.ok) {
                response.json().then(function(photos) {
                    s.photos = photos;
                    handler('selectedItem', {itemType: 'species', item: s});
                });
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });     
    }

    genusSelectedHandler(g, handler) {
        self = this;
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
                    handler('selectedItem', {itemType: 'genus', item: g});
                });
            } else {
                console.log('Network response was not ok.');
            }
        })
        .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
        });
    }

    familySelectedHandler(f, handler) {
        self = this;
        fetch('/api/get_family_photos?family_id=' + f.id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(function(response) {
            if(response.ok) {
                response.json().then(function(photos) {
                    f.photos = photos;
                    handler('selectedItem', {itemType: 'family', item: f});
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
        var type = this.state.selectedItem.itemType,
            item = this.state.selectedItem.item,
            minimized = this.state.sidebarMinimized,
            hidden = this.state.sidebarHidden;
        return (
            <div className='mainContainer'>
                { hidden ? null :
                    <SearchSidebar 
                    	title = "Family"
                    	tree = {pg.tree}
                    	speciesHandler ={this.speciesSelectedHandler.bind(this)}
                        genusHandler ={this.genusSelectedHandler.bind(this)}
                        familyHandler ={this.familySelectedHandler.bind(this)}
                        handler = {this.update.bind(this)} 
                        minimized = {this.state.sidebarMinimized}/>
                }
                <div className={minimized ? "content minimized": "content"}>
                    { type === null ?
                        <div className="default">
                            <div className="message">
                                <i className="fa fa-caret-left"></i> Click on a <b>family</b>, <b>genus</b>, or <b>species</b> to get started!
                            </div>
                        </div>
                    : null}
                    { type === "family" ? <Family family={item}/> : null }
                    { type === "genus" ? <Genus genus={item}/> : null }
                    { type === "species" ? <Species species={item}/> : null }
                </div>
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