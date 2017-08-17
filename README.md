<h1>Treelib</h1>
<p>A collection of high-quality tree photographs for educators, students and lay persons.</p>
<p style="text-align=center;">
<a href="http://treelib.nathanwillson.com">Click here for a live demo!</a>
</p>
<p>Uses Flickr API for photo hosting.</p>

<h2>Tech Stack</h2>
<ul>
<li>Ruby (Sinatra server, ERB for templating)</li>
<li>MySQL</li>
<li>React</li>
<li>SASS</li>
<li>HTML</li>
</ul>

</hr>

<h3>Front Facing Pages</h3>
<ul>
<li>Species search</li>
<li>Homepage</li>
<li>Contact, Feedback, etc.</li>
</ul>

![front_1](https://github.com/nbw/treelib/blob/master/screenshots/ss2.png?raw=true)

![front_2](https://github.com/nbw/treelib/blob/master/screenshots/ss3.png?raw=true)

</hr>

<h3>Admin pages:</h3>
<ul>
<li>Create/Edit Species (includes photos from Flickr)</li>
<li>Create/Edit Genera</li>
<li>Create/Edit Families</li>
</ul>
![admin_1](https://github.com/nbw/treelib/blob/master/screenshots/ss1.png?raw=true)
![admin_2](https://github.com/nbw/treelib/blob/master/screenshots/ss4.png?raw=true)


<h2>Changes I'd like to make:</h2>
<p>I wrote this project as a way to learn code, but in hindsight there design decisions that I wished I'd made -- especially after reading <a href="https://www.amazon.com/Practical-Object-Oriented-Design-Ruby-Addison-Wesley/dp/0321721330">POODIR</a>. I'm mostly writing this to journal my own thoughts. 
<p>
<ul>
<li>Have Species, Family, and Genus class inherit from a "classification" class to minimize repeatability.</li>
<li>
Look at ways to abstract the Plantae class so that it's not one large minefield of dependancies. There is also some repeating happening where the only difference is species becomes genus or family (basically the issue being namespacing). Those cases are perfect candidates to be reduced to a single method. 
</li>
<li>Reduce complexity in server.rb file. The controller should be as simple as possible.</li>
</ul>
