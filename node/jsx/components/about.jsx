import React from 'react'

class About extends React.Component {
    render() {
        return (
            <div className='aboutPage'>
            	<div className="section">
            		Photos in the pacific north west.
            	</div>
            	<div className="section">
            		These pictures are to be used for study and educational purposes only.  Copying them and using them for commercial purposes is not permitted without specific written permission from the author.
            	</div>
            	<div className="section">
            		This site was a collaboration between Blake and his son Nathan. 
            	</div>
            	<h2>Who we are</h2>
            	<div className="bio section">
            		<table>
            			<tr>
            				<td>
			            		<img className="photo" src="img/blake.jpg" />
			            	</td>
			            	<td>
			            		<ul className="description">
		            				<li className="title">Biologist and Photographer</li>
		            				<li className="content">
		            					Blake is a biologist and photographer who has over 25 years in the forestry industry, specifically with the import/export of lumber between Canada and Japan.
		        					</li>
		        				</ul>
			            	</td>
			            </tr>
		            </table>
            	</div>
            	<div className="bio section">
	            	<table>
            			<tr>
            				<td>
			            		<img className="photo" src="img/nathan.jpg" />
			            	</td>
			            	<td>
			            		<ul className="description">
		            				<li className="title">Web Programmer</li>
		            				<li className="content">
		            					The guy that meant this site. The guy that meant this site. The guy that meant this site.
		        					</li>
		        				</ul>
			            	</td>
			            </tr>
		            </table>
            	</div>
            </div>
        );
    }
}

export default About