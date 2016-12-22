import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';

import Family from './components/family.jsx';
import Genus from './components/genus.jsx';
import Species from './components/species.jsx';
import SearchSidebar from './components/searchSidebar.jsx';

var pg = pageData;
var preSelected;
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
        preSelected = this.urlFGS();
        if (preSelected.family) {
            if (preSelected.genus) {
                if(preSelected.species) {
                    this.speciesSelectedHandler (preSelected.species, this.update.bind(this));
                } else {
                    this.genusSelectedHandler (preSelected.genus, this.update.bind(this));
                }
            } else {
                this.familySelectedHandler (preSelected.family, this.update.bind(this));
            }
        } else if (preSelected.genus) {
            if(preSelected.species) {
                this.speciesSelectedHandler (preSelected.species, this.update.bind(this));
            } else {
                this.genusSelectedHandler (preSelected.genus, this.update.bind(this));
            }
        } else if(preSelected.species) {
            this.speciesSelectedHandler (preSelected.species, this.update.bind(this));
        }
        window.addEventListener("fullScreenPhoto", () => {this.update('sidebarHidden', !this.state.sidebarHidden );});
    }
    componentWillUnmount() {
        window.removeEventListener("fullScreenPhoto", () => {});
    }
    update(name, value) {
        this.setState({
            [name]: value // ES6 computed property
        });
    }
    handleInputChange(name, e) {
        this.setState({
            [name]: e.target.value // ES6 computed property
        });
    }
    urlFGS() {
        var urlParams = this.getAllUrlParams(window.location.search),
            families = pg.tree,
            genera =  [].concat.apply([],families.map(function(f){return f.genera})),
            species = [].concat.apply([],genera.map(function(g){return g.species}));

        var obj = {};

        if (urlParams.f_id) {
            var fam = families.find(function(f){ 
                return f.id == urlParams.f_id
            });
            if( fam ) {
                genera = fam.genera;
                obj.family = fam;
            }
        }
        if (urlParams.g_id) {
            var gen = genera.find(function(g){ 
                return g.id == urlParams.g_id
            });
            if(gen) {
                species = gen.species;
                obj.genus = gen;
            }
        }
        if (urlParams.s_id) {
            obj.species = species.find(function(s){ 
                return s.id == urlParams.s_id
            });
        }
        
        return obj;
    }
    getAllUrlParams(url) {
      var queryString = url ? url.split('?')[1] : window.location.search.slice(1),
          obj = {};

      if (queryString) {
        queryString = queryString.split('#')[0];
        var arr = queryString.split('&');

        for (var i=0; i<arr.length; i++) {
            var a = arr[i].split('='),
                paramNum = undefined,
                paramName = a[0].replace(/\[\d*\]/, function(v) {
                    paramNum = v.slice(1,-1);
                    return '';
                }),
                paramValue = typeof(a[1])==='undefined' ? true : a[1];

            paramName = paramName.toLowerCase();
            paramValue = paramValue.toLowerCase();

            if (obj[paramName]) { 
                if (typeof obj[paramName] === 'string') { obj[paramName] = [obj[paramName]]; }
                if (typeof paramNum === 'undefined') { obj[paramName].push(paramValue); }
                else { obj[paramName][paramNum] = paramValue; }
            }
            else { obj[paramName] = paramValue; }
        }
      }
      return obj;
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
                    window.pho = photos;
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
                        minimized = {this.state.sidebarMinimized}
                        preSelected = {this.urlFGS(preSelected)}
                    />
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