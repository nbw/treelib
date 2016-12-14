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
			                	<a  href='/search'>start searching</a>
		                	</div>
		                </div>
	                </div>
                </div>
                <div className="section">
                	<p>
                		This site is for students, professors, laymen, artists, naturalists – anyone studying trees or who just appreciates their beauty.  Need more pictures for a dendrology class, or to make your own collection, or to add background to a new website? <b>TreeLib</b> is yours all in one spot.
                	</p>
                    <div className="photoBanner">
                        <div>
                            <img src="img/homepage-banner/5.jpg" />
                            <img src="img/homepage-banner/6.jpg" />
                        </div><div>
                            <img src="img/homepage-banner/7.jpg" />
                            <img src="img/homepage-banner/8.jpg" />
                        </div>
                    </div>
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
                        Help yourself to the site, downloading  to enhance your learning and understanding of the trees around you.  It is not the final resource for every aspect of identification, but rather a tool to be used to visually complement many other good sources of information.  Visitors are encouraged to connect to other excellent sources of technical information such as the Northern Ontario Plant Database, Wikipedia and so on.
                    </p>
                    <div className="photoBanner">
                        <img src="img/homepage-banner/1.jpg" />
                        <img src="img/homepage-banner/4.jpg" />
                        <img src="img/homepage-banner/3.jpg" />
                        <img src="img/homepage-banner/2.jpg" />
                    </div>
                   <p>
                        <u><b>TreeLib</b> is for educational purposes</u> to complement many excellent sources of technical information on trees, providing over 7,000 high quality pictures of many aspects of species.  Photos available through the site are to be used for study and educational purposes only.  Copying them and using them for commercial purposes is not permitted without specific written permission from the author.
                    </p>
                </div>
            </div>
        );
    }
}

export default Home