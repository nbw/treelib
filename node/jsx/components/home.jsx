import React from 'react'

class Home extends React.Component {
    render() {
        return (
            <div className='homePage'>
                <div className="banner">
                	<div className="innerBanner">
                		<span className="helper"></span>
	                	<div className="wrapper">
		                	A collection of high-quality tree photographs for educators, students and lay persons.
		                	<div className="searchButton">
			                	<a  href='/search'>Start searching</a>
		                	</div>
		                </div>
	                </div>
                </div>
                <div className="section">
                	<p>
                		This site is for students, professors, laymen, artists, naturalists – anyone studying trees or who just appreciates their beauty.  Need more pictures for a dendrology class, or to make your own collection, or to add background to a new website? <b>Treelib</b> is yours all in one spot.
                	</p>
                </div>
                <div className="banner">
                	<div className="innerBanner">
                		<span className="helper"></span>
	                	<div className="wrapper">
		                	Trees are our silent partners, sensing us as we move about, providing shelter, offering us beauty, and nurturing and protecting the earth.
		                </div>
	                </div>
                </div>
                <div className="section">
                	<p>
                		This site is for students, professors, laymen, artists, naturalists – anyone studying trees or who just appreciates their beauty.  Need more pictures for a dendrology class, or to make your own collection, or to add background to a new website? <b>Treelib</b> is yours all in one spot.
                	</p>
                </div>
            </div>
        );
    }
}

export default Home