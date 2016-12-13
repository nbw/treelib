import React, { PropTypes } from 'react'

function SidebarListItem(props) {
    var classNames;

    if (props.isSelected) {
        classNames = "selected";
    }

    return (
        <li className={classNames} key={props.id} value={props.item} onClick={props.onClick}>
            {props.children}
        </li>
    );
}

class SearchSidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedFamily: null,
            selectedGenus: null,
            selectedSpecies: null
        };
    }
    update(name, value) {
        this.setState({
            [name]: value // ES6 computed property
        });
    }
	familyClicked(item,e){
        this.update('selectedGenus', null);
        this.update('selectedSpecies', null);
        this.props.familyHandler(item, this.props.handler);
        this.update('selectedFamily', item);
         
	}
	genusClicked(item,e){
        this.update('selectedSpecies', null); 
        this.update('selectedGenus', item);
        this.props.genusHandler(item, this.props.handler);
             
	}
	speciesClicked(item,e){
        this.props.speciesHandler(item, this.props.handler);
        this.update('selectedSpecies', item);
	}
    hideSidebar(e){
        var minimized = this.props.minimized;
        this.props.handler('sidebarMinimized', !minimized);
    }
    render() {
    	self = this;
    	var selectedFamily = this.state.selectedFamily,
    		selectedGenus = this.state.selectedGenus,
    		selectedSpecies = this.state.selectedSpecies,
            minimized = this.props.minimized,
    	    familyRows = self.props.tree.map(function(item) {
                var isSelected = selectedFamily && (selectedFamily.id == item.id);
                return <SidebarListItem isSelected={isSelected} value={item.id} key={item.id} onClick={(event) => self.familyClicked(item, event)}>{item.name}</SidebarListItem>;
	        });

	    var generaRows = [];
	    if(selectedFamily) {
	    	generaRows = selectedFamily.genera.map(function(item) {
                var isSelected = selectedGenus && (selectedGenus.id == item.id)
	    		return <SidebarListItem isSelected={isSelected} value={item.id} key={item.id} onClick={(event) => self.genusClicked(item, event)}>{item.name}</SidebarListItem>;
	    	});
	    } else if (!(selectedFamily || selectedSpecies) || !(selectedFamily || selectedGenus) || selectedGenus){
            self.props.tree.forEach(function(family) {
                family.genera.forEach(function(item) {
                    var isSelected = selectedGenus && (selectedGenus.id == item.id)
                    generaRows.push(<SidebarListItem isSelected={isSelected} value={item.id} key={item.id} onClick={(event) => self.genusClicked(item, event)}>{item.name}</SidebarListItem>);
                });
            });
            // sort alphabetically
            generaRows.sort(function(a, b){
                if(a.props.children < b.props.children) return -1;
                if(a.props.children > b.props.children) return 1;
                return 0;
            })
        }

	    var speciesRows = [];
	    if(selectedGenus) {
	    	speciesRows = selectedGenus.species.map(function(item) {
                var isSelected = selectedSpecies && (selectedSpecies.id == item.id)
                return <SidebarListItem isSelected={isSelected} value={item.id} key={item.id} onClick={(event) => self.speciesClicked(item, event)}>{item.name}</SidebarListItem>;
	    	});
	    } else if (!(selectedGenus || selectedFamily)) {
            self.props.tree.forEach(function(family) {
                family.genera.forEach(function(genus) {
                    genus.species.forEach(function(item) {
                        var isSelected = selectedSpecies && (selectedSpecies.id == item.id)
                        speciesRows.push(<SidebarListItem isSelected={isSelected} value={item.id} key={item.id} onClick={(event) => self.speciesClicked(item, event)}>{item.name}</SidebarListItem>);
                    });
                });
            });
            // sort alphabetically
            speciesRows.sort(function(a, b){
                if(a.props.children < b.props.children) return -1;
                if(a.props.children > b.props.children) return 1;
                return 0;
            });
        }

        return (
            <div id={this.props.id}　className={ minimized ? "searchbar minimized" : "searchbar"} >
            	<div className="title"><a href="/"><img src="/img/logo.png"></img><label>TreeLib</label></a></div>
                <div className="closeButton"onClick={(event) => self.hideSidebar(event)}>
                    { minimized ? 
                        <i className="fa fa-angle-right"></i> : 
                        <i className="fa fa-angle-left"></i>}
                </div>
                <div className="familyList">
                    <div className="subtitle"><label >Family</label></div>
                	<ul>
                        {familyRows}
                	</ul>
                </div>
                <div className="generaList">
                    <div className="subtitle"><label>Genus</label></div>
                    <ul>
            		    {generaRows}
            	    </ul>
                </div>
                <div className="speciesList">
                    <div className="subtitle"><label>Species</label></div>
                    <ul>
            		    {speciesRows}
            	    </ul>
                </div>
            </div>
        );
    };
}

export default SearchSidebar