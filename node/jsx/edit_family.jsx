import React from 'react';
import ReactDOM from 'react-dom';

var pg = pageData;

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            title: pg.family.name || "",
            description: pg.family.description || "",
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
        fetch('/api/edit_family', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: pg.family.id || null,
                name: this.state.title,
                descrip: this.state.description,
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
    deleteMe() {
        var r = confirm("Are you sure you want to delete me?");
        if (r == true) {
            fetch('/api/delete_family', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: pg.family.id,
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
                <h1 className="mainTitle">{this.state.title || "New Family"}</h1>
                { pg.family.id ? 
                    <Buttoner id="deleteButton" 
                        callback={this.deleteMe.bind(this)}
                        text="delete" />: null}
                <hr />
                <Inputer
                    id = "name"
                    title = "Name"
                    placeholder = "family"
                    text = {this.state.title}
                    handler = {this.handleInputChange.bind(this, 'title')} />
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
class Buttoner extends React.Component {
    render() {
        return (
            <div id={this.props.id}
                className='button'
                onClick={this.props.callback}>
                {this.props.text}
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
