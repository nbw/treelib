import React from 'react';
import ReactDOM from 'react-dom';

var pg = pageData;

class App extends React.Component {
    render() {
        var families = [];
        pg.tree.forEach(function(item) {
            families.push(
                <Family family={item} />)
        });
        return (
            <div>
                <h1>Family Tree</h1>
                <hr />
                {families}
            </div>
        );
    }
}

class Family extends React.Component {
    render() {
        var f = this.props.family,
            genera = [];
        this.props.family.genera.forEach(function(item) {
            genera.push(<Genus genus={item} />);
        });
        return (
            <div id={'family-' + f.id} className='family'>
                family <span className='name'><a href={"/admin/edit_family?id=" + f.id}>{f.name}</a></span>
                <div className='generaWrapper'>
                    {genera}
                </div>
            </div>
        );
    }
}

class Genus extends React.Component {
    render() {
        var g = this.props.genus,
            species = [];
        this.props.genus.species.forEach(function(item) {
            species.push(<Species species={item} />);
        });
        return (
            <div id={'genus-' + g.id} className='genus'>
                genus <span className='name'><a href={"/admin/edit_genus?id=" + g.id}>{g.name}</a></span>
                <div className="speciesWrapper">
                {species}
                </div>
            </div>
        );
    }
}

class Species extends React.Component {
    render() {
        var s = this.props.species;
        return (
            <div id={'species-' + s.id} className='species'>
                <div className='name'><a href={'/admin/edit_species?id=' + s.id}>{s.name}</a></div>
            </div>
        );
    }
}

export default App
ReactDOM.render(<App />, document.getElementById('app'));