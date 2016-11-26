import React from 'react';
import ReactDOM from 'react-dom';

import Inputer from './components/inputer.jsx';
import Buttoner from './components/buttoner.jsx';
import Dropper from './components/dropper.jsx';
import Texter from './components/texter.jsx'

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
                f_id: this.state.family_id
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
    deleteMe() {
        var r = confirm("Are you sure you want to delete me?");
        if (r == true) {
            fetch('/api/delete_genus', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: pg.genus.id,
                    key: pg.key
                })
            }).then(function(response) {
                if(response.ok) {
                    response.json().then(function(obj) {
                        if(obj.err) {
                            console.log(obj.msg);
                            alert(obj.msg);
                        } else {
                            window.location.href = window.location.origin + window.location.pathname;
                        }  
                    });
                } else {
                    console.log('Network response was not ok.');
                }
            })
            .catch(function(error) {
                console.log('There has been a problem with your fetch operation: ' + error.message);
            });
        } 
    }
    render() {
        return (
            <div>
                <h1 className="mainTitle">{this.state.title || "New Genus"}</h1>
                { pg.genus.id ? 
                    <Buttoner id="deleteButton" 
                        callback={this.deleteMe.bind(this)}
                        text="delete" />: null}
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
                <Buttoner
                    id = "saveButton"
                    callback = {this.updateTheMotherShip.bind(this)}
                    text="save" />
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
