# SHOW ME THE TV!

[Click Here to Visit Live Site](http://showmethetv-env.uqrc23xqzq.us-east-2.elasticbeanstalk.com/)

---

Show Me The TV is a web application that can be used to search and view information about TV Shows.  It is a Full Stack Javascript web application built with Node/Express on the back end and React on the front end and deployed using AWS Elastic Beanstalk.  It queries The Movie Database API using Axios to get information on the shows and it is styled using Material UI (React components that implement Google's Material Design).

---

## __Why?__


When deciding what stack to use to build this application, I knew immediately that I wanted to use React to build the front end, not only for the speed and ease of customization, but because it's just plain fun to build React applications!  Also, I have been wanting to build a React app without using Create-React-App so that I could learn more about how to configure and transpile with Babel and Webpack.

So my only real decision was weather I wanted to use Node/Express for the back end or Rails.  I was originally planning to use Rails since I've been wanting to learn how to build a pipeline between Rails and React, but due to the strict timeline and personal circumstances giving me even less time to devote to the project, I decided to just keep it simple with Node/Express.

As for design, I have been spending a little time researching CSS frameworks since I feel that is still a big weak spot for me.  I had originally settled on using Bulma, but later discovered Material-UI and knew it would be perfect for the job.  It gave me not only a very responsive website (in some ways, it looks better on mobile than PC), but allowed for quick and easy implementation (which turned out to be a bigger benefit than I imagined).

Lastly, my decision on deployment.  Up until this point, I have only deployed apps to Github Pages (my personal portfolio site) and Heroku.  And while Heroku is built on AWS, it's not really the same thing.  With AWS becoming so important in the industry, this seemed like the perfect opportunity to dive in and start learning more about it.

---

## __Problems__ _and_ __Solutions__

My first, and by far the biggest, problem was Webpack.  It's such a complex tool and has so many various plugins and settings.  I probably spent close to half of my time simply trying to get my webpack config set up correctly (and I'm sure there are still many optimizations that could be made).  I wanted to make sure there was a clear separation between my back end API and the front end view, so first I made sure that the webpack build split into two separate files.

Then, I was getting compile errors with trying to use ES6 arrow functions (something I thought was supposed to be handled by babel's presets env and react), but luckily a quick Google search and I discovered this was resolved by simply adding a plugin (babel-plugin-transform-class-properties) to the .babelrc file.

Next, I was having issues making API calls on the front end.  Since the front and back were running on separate servers/ports, when I was making calls, it was calling the wrong port.  So I had to go implement proxy settings in the webpack config for the dev server.  This fixed the API call issue, but I was getting frustrated with my build setup...

I was using the webpack dev server to run my front end on port 8080 (the default port for WDS) on one terminal and running my back end Express server on port 3000 on another, but was quickly getting frustrated with having to stop both servers, create a build, then restart the servers to see changes made on the back end, so I hit Google again trying to figure out how I could get hot reloading on both the front and back end.  After some time and a lot of experimentation, I was finally able to resolve the issue.  A few minor tweaks to my webpack config, adding nodemon as a dev dependency, and then creating a new start script got everything up and running just how I wanted!

```javascript
"scripts": {
    "server": "nodemon ./server/server.js",
    "devstart": "npm run server & webpack-dev-server --mode development --open --hot"
}
```
---

## __Bugs__ _and_ __Issues__

There are a few issues and/or bugs with the site that I have yet been unable to resolve.  First, and most noticeably, is the delay when clicking on the search bar.  The animation that shows before the cursor appears in the field is pretty laggy.  I'm not sure if this is just a cause of the Material UI component or something in the code, but it's an issue I would like to investigate if I had more time.

Second, picture placement on the main page.  While most of the shows give a pretty good background picture, other's are a little wonky and cutting off heads or zooming in too much.  I'm sure if given enough time, I could tweak the styles for the photo and/or grid to make it look a little better.  Surprisingly enough, this is really only an issue on PC; on mobile devices, it display's the full picture for each show and looks very good!

Lastly, there is sometimes some weird interaction when deleting text from the search field.  When you remove all text, it should go back to displaying popular TV shows.  While most of the time it works correctly, I've noticed that sometimes if you delete letter's too quickly, it will not register and instead display a search of the last letter you deleted (aka the first letter from the original search).  I'm pretty sure I could clear this up using some of the React lifecycle methods given enough time to troubleshoot.

---

## __Future Updates__

The next features I would have liked to add would be (in order):

1. A menu to toggle between searching TV Shows and Movies
2. A cleaner, more vibrant display when you click on show to get more information (it's pretty boring on PC and on mobile doesn't always line up perfectly).
3. A "similar shows/movies" section when you click to view more info that would display 2 or 3 related items at the bottom with a link that would bring up info for them.
4. Implement a database and user authentication to allow users to log into the site and save/view favorites for TV shows and movies as well as see recommended titles.