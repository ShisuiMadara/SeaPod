# SeaPod
A sea of podcasts. Dive into a world of podcasts from different genres like Education, Devotional or Adventure. The application is hosted on Microsoft Azure and is based on a Node.js backend. The frontend is made in React.js and styled using MaterialUI and Tailwind CSS with the data being stored in MongoDB. There is secured login and signup using JWT authentication. 
<h1>Technologies Used</h1>
<ui>
  <li>Reactjs</li>
  <li>Nodejs</li>
  <li>MaterialUI</li>
  <li>Tailwind CSS</li>
  <li>Microsoft Azure</li>
  <li>Axios</li>
  <li>JWT authentication</li>
  <li>MongoDB</li>
 </ui>
 <br>
 <h1>Salient Features</h1>
 <br>
 <p>The signup and login are secured using JWT authorization, for <b>additional security </b>strong passwords are created using regular expression matching. The email authentication is done to prevent spammers and hackers from making bogus accounts.</p>
 <p>The user interface is <b>friendly and interactive</b>, based on React JS and MaterialUI. This makes the navigation easier and the response fast, providing a <b>seamless user experience</b>. </p>
 <p>The media is played using video tag implentation in HTML. This allows a <b>simple implmentation</b> to a complex task, importing a library for a media player would increase the overload of the application and thus could produce a lagging experience. </p>
 <p>There are <b>podcasts recommendations</b> are based on the selected genres of the user, of all the selected genres, the application provides them with the ones with highest like.</p>
 <p>To <b>promote other artists and content</b>, podacsts which might not be in the genre of the user or may have less likes, are displayed in form of crousel to the user. </p>
 <p>The recent listens and incomplete listens are displyed to the user so that they can <b>begin from where they left</b>.</p>
 <p>The podcast content is displayed in form of <b>flip cards</b>. These on the frontside have the title of the podcast and the description. On click, the video is played on the backside. </p>
 <p>The account section provides the current account details to the user and allows them to <b>update their password and genre choices</b>. The user is required to login again due to security protocols.</p>
 <p>The podcasts can only be <b>uploaded by the user with admin previlages</b>. This maintains the autencticity of content and prevent spammers from uploading copied or stolen content. The user based access is implemented using JWT token itself.</p>
 
<br>
<h1>Implementation features</h1>
<ui>
  <li>A strong backend based on Node using <b>REST api based implementation</b>. This ensure that the application provide a <b>great deal of flexibility</b>. The data is not tied to resources or methods, so REST can <b>handle multiple types of calls</b>, return different data formats and even change structurally with the correct implementation of hypermedia.</li>
  <li>The security is ensure with JWT token. The token is <b>checked each time</b> before any API call is made. This ensures that all the access are made by the user in session. Then token are regenerated when the account details are modified, thus <b>ensuring privacy and security of the user</b>.</li>
  <li>The database is a <b>NoSQL MongoDB</b>. This provides for <b>flexible storing and access</b>. The database is hosted on cloud and thus allows to make calls from different hosting environment without compromising performance. This makes the code more readble and accessible.</li>
  <li>The code is <b>modular and follows a guide for coding style</b>. This makes the codebase easy to read and manage.</li>
</ui>
<br>
<h1>Database features</h1>
<p>The database maintains a cluster for each:
    <ui>
      <li>Registered users</li>
      <li>Podcasts</li>
      <li>Podcasts viewed by users</li>
  </ui>
 </p>
<p>
  The registered user collection has the following keys:
  <ui>
    <li>user ID (string) </li>
    <li>user email (string) </li>
    <li>Hashed password (string) </li>
    <li>isAdmin (boolean) </li>
    <li>Genres (array) </li>
  </ui>
  <br>
 <p>The user ID identifies each of the user along with the email. The hashed password is stored to match while the account details are updated. The isAdmin variable allows the role based access and the Genres is the array of genres which the user is interested in. These can be updated from the Account section.
   </p>
</p>
<br>
<p>
  The Podcast collection contains the following keys:
  <ui>
    <li>Name (string)</li>
    <li>Creator ID (string) </li>
    <li>Genre (string)</li>
    <li>Likes (integer)</li>
    <li>File Name (string) </li>
    <li>File extension (string)</li>
    <li>Description (string) </li>
  </ui>
  <br>
 <p>The name is the name of the podcast. The creator ID is the unique ID of the creator, the genre is the type of genre the podcast caters to. The number of likes and the file name is also stored. The description is the brief detail about the podcast and thus can attract the viewers to listen to it.</p>
</p>
<br>
<p>
  The user view collection has:
  <ui>
    <li>User ID (string)</li>
    <li>Podcast ID (string)</li>
    <li>Active Listen (boolean) </li>
    <li>Likes (Integer)</li>
    <li>Position (Integer)</li>
    <li>Completed (Boolean)</li>
  </ui>
  <br>
  The user Id is the unique identification for the user along with the podcast ID it was listening to. This, is stored if he/she left in the middle of the listen, in which case the active listen boolean would be true. This would be used to store the podcasts that the user is listening to so that they can start from where they left. The likes is the number of likes the podcast has and the position is the position of the video time which has passed till now. When the video has completed, we can change the boolean to true and we can remove it from the active listen database.
</p>

![WhatsApp Image 2023-04-24 at 15 40 47](https://user-images.githubusercontent.com/77777434/234038883-399e5f95-aea2-4f9b-94d5-d5ffce4b83b6.jpeg)

