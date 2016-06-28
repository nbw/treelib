import React from 'react';
import ReactDOM from 'react-dom';

var pg = pageData;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            title: pg.genus.name || "",
            description: pg.genus.description || "",
            family_id: pg.genus.family_id || pg.families[0].id || 0
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
        fetch('/api/edit_genus', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: pg.genus.id || null,
                name: this.state.title,
                descrip: this.state.description,
                f_id: this.state.family_id,
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
                <h1>{this.state.title || "New Genus"}</h1>
                <hr />
                <Inputer
                    id = "name"
                    title = "Name"
                    placeholder = "genus"
                    text = {this.state.title}
                    handler = {this.handleInputChange.bind(this, 'title')} />
                <Dropper
                    id = "family"
                    title = "Family"
                    default = {this.state.family_id}
                    list = {pg.families}
                    handler = {this.handleInputChange.bind(this, 'family_id')} />
                <hr />
                <Texter
                    id = "description" 
                    title = "Description"
                    placeholder = "enter description here"
                    text = {this.state.description}
                    handler = {this.handleInputChange.bind(this, 'description')} />

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
