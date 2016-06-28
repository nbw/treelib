import React from 'react';
import ReactDOM from 'react-dom';

var pg = pageData;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            title: pg.species.name || "",
            description: pg.species.descrip || "",
            genus_id: pg.species.genus_id || pg.genera[0].id || 0
        };
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
    updateTheMotherShip(){
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
                    title = "Genera"
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

                <p>Description: {this.state.description}</p>
                <p>Fam id: {this.state.family_id}</p>
                <p>Gen id: {this.state.genus_id}</p>
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

if (self.fetch) {

} else {
    console.log('Unsupported browser. Please use Firefox or Google Chrome')
}



export default App
ReactDOM.render(<App />, document.getElementById('app'));
