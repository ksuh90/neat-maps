# neat-maps

## Specs
- Nodejs (v9.9.0)
- React 16
- Jest, Enzyme for testing

## How to run
1. Clone the repository
    ```
    $ git clone https://github.com/ksuh90/neat-maps.git
    ```
2. ```$ mv src/config-sample.js src/config.js```
3. Add google maps api key in src/config.js 
4. ```$ npm install```
5. ```$ npm run start``` _( App is available on localhost:3000 )_
6. For testing, ```npm run test``` _(If running on OSX, make sure to have watchman installed "brew install watchman")_

## Description
The app can be broken down to three main components: Uploader, Normalizer, and the MapIt. 
- Uploader: Responsible for uploading of the csv file and ensuring it meets the requirements such as number of rows/columns. 
- Normalizer: Invites the user to map the appropriate column names and hit "Map It!".
- MapIt: Retrieves geo codes for all addresses via Google api and marks it on the displaying google map. Zoom level and center of the map is adjusted according to the mapped markers. For ever successful normalization, a button appears above the map(up to 3). User may toggle between data sets by clicking the buttons.
