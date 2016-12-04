import React, { PropTypes } from 'react'

class BasicNavbar extends React.Component {
    func(){
         this.props.handler('search');
    }
    render() {
        self = this;
        return (
            <div className="basicNavbar">
                <ul>
                    <li className="treelib"><a href="/">Treelib</a></li>
                    <li className="search"><a href="/search">Search</a></li>
                    <li className="about"><a href="/about">About</a></li>
                    <li className="contact"><a href="/contact">Contact</a></li>
                </ul>
                <div className="navBorder first"></div><div className="navBorder second"></div><div className="navBorder third"></div>
            </div>
        );
    }
}

export default BasicNavbar