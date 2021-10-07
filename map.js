      mapboxgl.accessToken = 'pk.eyJ1IjoiYW5kcmVhYnJ1bmVsbGk5MyIsImEiOiJja3U4M3g4NDM0OHo5MnJxdG9sMmdqN3JtIn0.FKig19QeFQyFzGzFAcqaUw';
    
    function dataCaller(){
        return $.ajax({
            type: "GET",
            //YOUR TURN: Replace with csv export link
            url: 'https://docs.google.com/spreadsheets/d/1BrpScl-lXIB9rmELs3LzjPcUT6THi52S65W9PXvxNsQ/gviz/tq?tqx=out:csv&sheet=Sheet1',
            dataType: "text",
            async: !1,
            success: function(csvData) {   makeGeoJSON(csvData);    },
            failure: function(response){ console.log('non ci sono dati');}
            });
            
    }
    
    //Dichiaro la variabile degli stores per portarla fuori dalla funzione
    var stores = "";

    function makeGeoJSON(csvData) {
        geo_json = csv2geojson.csv2geojson(csvData, {
            name : 'Name',
            address: 'Address',
            city: 'City',
            province: 'State_Province',
            zip: 'Zip_code',
            country: 'Country',
            description: 'Short_description',
            latfield: 'Latitude',
            lonfield: 'Longitude',
            phone: 'Phone',
            website: 'Website',
            category: 'Category',
            delimiter: ','
        }, function(err, data) {
            //Popolo la variabile con i dati strutturati
            stores = data;
        });
    }
    

    dataCaller();
    var screen_width = window.innerWidth

    function openNav() {
      if( screen_width > 600 ){
        document.getElementById("mySidebar").style.width = "33%";
        document.getElementById("main").style.marginLeft = "33%";
        } else{
        document.getElementById("mySidebar").style.width = "100vw";
        document.getElementById("main").style.marginLeft = "100vw";
      }
    }
    
    function closeNav() {
      document.getElementById('mySidebar').style.width = "0px";
      document.getElementById('main').style.marginLeft= "0px";
    }

        /**
       * Add the map to the page
       */
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/andreabrunelli93/cku85j8ut571s19rz0t03363w',
        center: [11.002374885021773, 45.443389441640925],
        zoom: 13,
        scrollZoom: true
      });
      
      /**
       * Assign a unique id to each store. You'll use this `id`
       * later to associate each point on the map with a listing
       * in the sidebar.
       */
      stores.features.forEach((store, i) => {
        store.properties.id = i;
      });

      /**
       * Wait until the map loads to make changes to the map.
       */
      map.on('load', () => {
        /**
         * This is where your '.addLayer()' used to be, instead
         * add only the source without styling a layer
         */
        map.addSource('places', {
          'type': 'geojson',
          'data': stores
        });

        /**
         * Add all the things to the page:
         * - The location listings on the side of the page
         * - The markers onto the map
         */
        buildLocationList(stores);
        addMarkers();
      });

      /**
       * Add a marker to the map for every store listing.
       **/
      function addMarkers() {
        /* For each feature in the GeoJSON object above: */
        for (const marker of stores.features) {
          /* Create a div element for the marker. */
          const el = document.createElement('div');
          /* Assign a unique `id` to the marker. */
          el.id = `marker-${marker.properties.id}`;
          /* Assign the `marker` class to each marker for styling. */
          el.className = `marker ${marker.properties.Category.toLowerCase()}`;
          el.style.cssText = `background-image: url('./img/marker-${marker.properties.Category.toLowerCase()}.png');`;

          /**
           * Create a marker using the div element
           * defined above and add it to the map.
           **/

          new mapboxgl.Marker(el, { offset: [1, 0] })
            .setLngLat(marker.geometry.coordinates)
            .addTo(map);

          /**
           * Listen to the element and when it is clicked, do three things:
           * 1. Fly to the point
           * 2. Close all other popups and display popup for clicked store
           * 3. Highlight listing in sidebar (and remove highlight for all other listings)
           **/
          el.addEventListener('click', (e) => {
            /* Fly to the point */
            flyToStore(marker);
            /* Close all other popups and display popup for clicked store */
            createPopUp(marker);
            /* Highlight listing in sidebar */
            const activeItem = document.getElementsByClassName('active');
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            const listing = document.getElementById(
              `listing-${marker.properties.id}`
            );
            listing.classList.add('active');
          });
        }
      }

      /**
       * Add a listing for each store to the sidebar.
       **/
      function buildLocationList({ features }) {
        for (const { properties } of features) {
          /* Add a new listing section to the sidebar. */
          const listings = document.getElementById('listings');
          const listing = listings.appendChild(document.createElement('div'));
          /* Assign a unique `id` to the listing. */
          listing.id = `listing-${properties.id}`;
          /* Assign the `item` class to each listing for styling. */
          listing.className = `item ${properties.Category.toLowerCase()}`;

          /* Add the link to the individual listing created above. */
          const link = listing.appendChild(document.createElement('a'));
          
          link.href = '#';
          
          link.className = `title`;
          link.id = `link-${properties.id}`;
          link.innerHTML = `<div class="col-md-12" id="link-${properties.id}">

                  <h3 class="card-tile" id="special-font">${properties.Name}</h3>
                  <div class="badge"> <span>${properties.Category}</span> </div>
                      <div class="mt-3"> <span class="text1">${properties.Address} | ${properties.Phone} </span> </div>

              </div>`

          /*
          link.innerHTML = `${properties.Name}`;


          const details = listing.appendChild(document.createElement('div'));
          details.innerHTML = `<div class="badge"><span>${properties.Category}<span></div><h6 class="card-subtitle mb-2 text-muted">${properties.Address}</h6>`;
          if (properties.Phone) {
            details.innerHTML += `${properties.Phone}`;
          }*/

          /**
           * Listen to the element and when it is clicked, do four things:
           * 1. Update the `currentFeature` to the store associated with the clicked link
           * 2. Fly to the point
           * 3. Close all other popups and display popup for clicked store
           * 4. Highlight listing in sidebar (and remove highlight for all other listings)
           **/
          link.addEventListener('click', function () {
            for (const feature of features) {
              if (this.id === `link-${feature.properties.id}`) {
                console.log(screen_width)
                if(screen_width < 600){
                  closeNav();
                }
                flyToStore(feature);
                createPopUp(feature);
              }
            }
            const activeItem = document.getElementsByClassName('active');
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            this.parentNode.classList.add('active');
          });
        }
      }

      /**
       * Use Mapbox GL JS's `flyTo` to move the camera smoothly
       * a given center point.
       **/
      function flyToStore(currentFeature) {
        map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: 15
        });
      }

      /**
       * Create a Mapbox GL JS `Popup`.
       **/
      function createPopUp(currentFeature) {
        const popUps = document.getElementsByClassName('mapboxgl-popup');
        if (popUps[0]) popUps[0].remove();

        var place_name = currentFeature.properties.Name;
        var google_maps_query_name = place_name.split(' ').join('+');

        const popup = new mapboxgl.Popup({ closeOnClick: true })
          .setLngLat(currentFeature.geometry.coordinates)
          .setHTML(
            `<h3 id='pop-up-title'>${currentFeature.properties.Name}</h3>
            <h4 id='pop-up-category'>${currentFeature.properties.Category}</h4>
            <h4 id='pop-up-description'><a href='https://www.google.com/maps/search/?api=1&query=${google_maps_query_name}', target='_blank'><i class="fas fa-directions"></i> ${currentFeature.properties.Address}</a></h4>
            <p id='pop-up-description'>${currentFeature.properties.Short_description}</p>`
          )
          .addTo(map);
      }
