# Neighbourhood Map Project; yycEats
This web application showcases a map of Calgary, Canada **(YYC)** using Google Map's API.
Several markers are placed on the map of some of my favourite restaurants in the
downtown core area. The user can click each marker to open an infowindow showing
the restaurant's address using Foursquare's API. The application also features a
list of all the restaurants, where the user can click restaurant names on the list
which will open the infowindow as well. There is also a search bar to filter the
list, which also filters the markers on the map as well.

## Important Files and Folders
* `index.html` ; main page, and the view of the application
* `img folder` ; contains Foursquare attribution logo

### JavaScript Files
* `app.js` ; the necessary code for the model and viewmodel
* `places.js` ; coordinates for named locations
* `styles.js` ; map styling for Google Maps
* `plume.js` ; required code for side navigation function
* `jquery.nanoscroller.js` ; required code for side navigation scrollbar function
* `jquery-3.3.1.min.js` ; jQuery library
* `knockout-3.4.2.js` ; Knockout framework

### CSS Files
* `style.css` ; minor styling of page
* `siimple.css` ; majority of styling on page
* `plume.css` ; styling of side navigation
* `nanoscroller.js` ; styling of side navigation scrollbar

## Dependencies
No dependencies. All required files, including outsourced material are included
in the package.

## Microsoft Windows Instructions
1. Download and extract project to a desired directory.
2. Run `index.html` on your favourite browser.

## Attributions
Several sources were used to make this project possible:
1. [Google Maps API](https://developers.google.com/maps/)
2. [Foursquare API](https://developer.foursquare.com/)
3. [Knockout Framework](http://knockoutjs.com/)
4. [jQuery Library](https://jquery.com/)
5. [siimple and plume Framework](https://siimple.juanes.xyz/)
6. [nanoScroller](https://jamesflorentino.github.io/nanoScrollerJS/)
7. [Snazzy Maps](https://snazzymaps.com/)

## Disclaimer
This application was written by Robert Nguyen with the help and guidance
of Udacity's Full Stack Web Developer Nanodegree Program.
