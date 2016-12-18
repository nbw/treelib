import React, { PropTypes } from 'react'

import CheckBoxer from './checkBoxer.jsx';

class SearchSidebar extends React.Component {
    constructor() {
        super();
        this.state = {
            selectedFamily: null,
            selectedGenus: null,
            selectedSpecies: null,
            showLatinNames: true,
            showCommonNames: false,
        };
    }
    componentDidMount() {
        var preSelected = this.props.preSelected;
        this.setState({selectedFamily: preSelected.family || null});
        this.setState({selectedGenus: preSelected.genus || null});
        this.setState({selectedSpecies: preSelected.species || null});
    }
    update(name, value) {
        this.setState({
            [name]: value // ES6 computed property
        });
    }
    handleInputChange(name, e) {
        this.setState({
            [name]: e.target.value
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
    	var selectedFamily =  this.state.selectedFamily,
    		selectedGenus = this.state.selectedGenus,
    		selectedSpecies = this.state.selectedSpecies,
            minimized = this.props.minimized,
    	    familyRows = self.props.tree.map(function(item) {
                var isSelected = selectedFamily && (selectedFamily.id == item.id),
                    latinName = self.state.showLatinNames ? item.name : "",
                    commonName = self.state.showCommonNames ? item.common_name : "";
                return <SidebarListItem 
                            isSelected={isSelected} 
                            value={item.id} key={item.id} 
                            onClick={(event) => self.familyClicked(item, event)}
                            latinName={latinName}
                            commonName={commonName}
                        />;
	        });

	    var generaRows = [];
	    if(selectedFamily) {
	    	generaRows = selectedFamily.genera.map(function(item) {
                var isSelected = selectedGenus && (selectedGenus.id == item.id),
                    latinName = self.state.showLatinNames ? item.name : "",
                    commonName = self.state.showCommonNames ? item.common_name : "";
	    		return <SidebarListItem 
                            isSelected={isSelected} 
                            value={item.id} key={item.id} 
                            onClick={(event) => self.genusClicked(item, event)}
                            latinName={latinName}
                            commonName={commonName}
                        />;
	    	});
	    } else if (!(selectedFamily || selectedSpecies) || !(selectedFamily || selectedGenus) || selectedGenus){
            self.props.tree.forEach(function(family) {
                family.genera.forEach(function(item) {
                    var isSelected = selectedGenus && (selectedGenus.id == item.id),
                    latinName = self.state.showLatinNames ? item.name : "",
                    commonName = self.state.showCommonNames ? item.common_name : "";
                    generaRows.push(
                        <SidebarListItem 
                            isSelected={isSelected} 
                            value={item.id} key={item.id} 
                            onClick={(event) => self.genusClicked(item, event)}
                            latinName={latinName}
                            commonName={commonName}
                        />
                    );
                });
            });
            // sort alphabetically
            generaRows.sort(function(a, b){
                if(a.props.latinName < b.props.latinName) return -1;
                if(a.props.latinName > b.props.latinName) return 1;
                return 0;
            })
        }

	    var speciesRows = [];
	    if(selectedGenus) {
	    	speciesRows = selectedGenus.species.map(function(item) {
                var isSelected = selectedSpecies && (selectedSpecies.id == item.id),
                    latinName = self.state.showLatinNames ? item.name : "",
                    commonName = self.state.showCommonNames ? item.genus_common_name + " " + item.common_name : "";
                return <SidebarListItem 
                            isSelected={isSelected} 
                            value={item.id} key={item.id} 
                            onClick={(event) => self.speciesClicked(item, event)}
                            latinName={latinName}
                            commonName={commonName}
                        />;
	    	});
	    } else if (!(selectedGenus || selectedFamily)) {
            self.props.tree.forEach(function(family) {
                family.genera.forEach(function(genus) {
                    genus.species.forEach(function(item) {
                        var isSelected = selectedSpecies && (selectedSpecies.id == item.id),
                            latinName = self.state.showLatinNames ? item.name : "",
                            commonName = self.state.showCommonNames ? item.genus_common_name + " " + item.common_name : "";

                        speciesRows.push(
                                <SidebarListItem 
                                isSelected={isSelected} 
                                value={item.id} key={item.id} 
                                onClick={(event) => self.speciesClicked(item, event)}
                                latinName={latinName}
                                commonName={commonName}
                            />
                        );
                    });
                });
            });
            // sort alphabetically
            speciesRows.sort(function(a, b){
                if(a.props.latinName < b.props.latinName) return -1;
                if(a.props.latinName > b.props.latinName) return 1;
                return 0;
            });
        }

        return (
            <div id={this.props.id}　className={ minimized ? "searchbar minimized" : "searchbar"} >
            	<div className="title"><a href="/"><img src="/img/logo.png"></img><label>TreeLib</label></a></div>
                <div className="closeButton" onClick={(event) => self.hideSidebar(event)}>
                    { minimized ? 
                        <i className="fa fa-angle-right"></i> : 
                        <i className="fa fa-angle-left"></i>}
                </div>
                <div className="nameSelector">
                    <CheckBoxer
                        isChecked={this.state.showLatinNames}
                        title=" latin names"
                        handler={this.update.bind(this,'showLatinNames')}
                    />
                    <CheckBoxer
                        isChecked={this.state.showCommonNames}
                        title=" common names"
                        handler={this.update.bind(this,'showCommonNames')}
                    />
                </div>
                <div className="familyList">
                    <div className="subtitle"><label >Family</label></div>
                	<ul className="searchSidebar-list">
                        {familyRows}
                	</ul>
                </div>
                <div className="generaList">
                    <div className="subtitle"><label>Genus</label></div>
                    <ul className="searchSidebar-list">
            		    {generaRows}
            	    </ul>
                </div>
                <div className="speciesList">
                    <div className="subtitle"><label>Species</label></div>
                    <ul className="searchSidebar-list">
            		    {speciesRows}
            	    </ul>
                </div>
            </div>
        );
    };
}

function SidebarListItem(props) {
    var classNames;

    if (props.isSelected) {
        classNames = "selected";
    }

    return (
        <li className={"sidebarListItem " + classNames} key={props.id} value={props.item} onClick={props.onClick}>
            <ul className="sidebarListItem-names">
                <li><label className="latinName">{props.latinName}</label></li><li>
                <label className="commonName">{props.commonName}</label></li>
            </ul>
        </li>
    );
}

export default SearchSidebar