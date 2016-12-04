import React from 'react'

class About extends React.Component {
    render() {
        return (
            <div className='aboutPage'>
            	<div className="section">
            		<label className="title">About the photos</label>
            		<p>
            			All but a handful of the photos have been taken by the author in botanical gardens, larger private collections, university arboretums, private  gardens, natural forests across Western North America and in Japan.  
            		</p>
            		<p>
            			Photos were taken with a Canon 70D camera, using 40mm, 17mm x 85mm and 18mm x 55mm lenses. The 70D is equipped with Canon’s new high resolution CMOS 70D sensor which allows raising film speed to up to 2000 or more without noticeable graininess.  
            		</p>

            	</div>
            	<div className="banner"></div>
            	<div className="section">
            		<label className="title">Species confirmation</label>
            		<p>
            			The purpose of this site is more to give a flavour of the varieties of each species than to provide an authoritative catalogue of them.  For detailed lists of most of the varieties of each species, I have found that searching species names on Wikipedia provides the best information.
            		</p>
            		<p>
            			Preference has been, in most cases, to support confirmation of many species and varieties at major sites like Vandusen Garden, Washington University Arboretum and other botanical gardens all over the Western North America, as far back as Manitoba and North Dakota, supplementing with pictures from many other locations. 
            		</p>
            		<p>
            			Cross-referencing of Latin names and usages has also been done from many of these sites, from web sites and from numerous good tree apps and books on tree identification; there are some differences in nomenclature between the U.S., Canada, Japan and Europe.  Regarding common English names, they are often quite varied and are best outlined on sites such as Wikipedia and other plant sites.   
            		</p>
            	</div>
            	<div className="banner"></div>
            	<div className="bio">
            		<div className='title'>Who we are</div>
            		<table>
            			<tbody>
            			<tr>
            				<td>
			            		<img className="photo" src="img/blake.jpg" />
			            	</td>
			            	<td>
			            		<ul className="description">
		            				<li className="title">Blake - Biologist and Photographer</li>
		            				<li className="content">
		            					Blake is a biologist and photographer who has over 25 years in the forestry industry, specifically with the import/export of lumber between Canada and Japan.
		        					</li>
		        				</ul>
			            	</td>
			            </tr>
            			<tr>
            				<td>
			            		<img className="photo" src="img/nathan.jpg" />
			            	</td>
			            	<td>
			            		<ul className="description">
		            				<li className="title">Nathan - Developement</li>
		            				<li className="content">
		            					<a href="http://nathanwillson.com/">Nathan</a> is a web developer based out of Victoria, Canada.
		        					</li>
		        				</ul>
			            	</td>
			            </tr>
			            </tbody>
		            </table>
		            <div className="footer">
		            	This site was a collaboration between Blake and his son Nathan. 
	            	</div>
            	</div>
            </div>
        );
    }
}

export default About