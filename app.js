var model = {
    placesActive: null,
    places: [{
            latitude: 19.330528,
            longitude: 72.816043,
            name: 'Fort Bassein',
            id: 0,
        }, {
            latitude: 19.008233,
            longitude: 73.041062,
            name: 'Belapur Fort',
            id: 1,
        }, {
            latitude: 18.931495,
            longitude: 72.838485,
            name: 'Bombay Castle',
            id: 2,
        }, {
            latitude: 19.041800,
            longitude: 72.819084,
            name: 'Castella de Aguada',
            id: 3,
        }, {
            latitude: 18.941196,
            longitude: 72.838822,
            name: 'Fort George Bombay',
            id: 4,
        }, {
            latitude: 19.296126,
            longitude: 72.888794,
            name: 'Ghodbunder Fort',
            id: 5,
        }, {
            latitude: 19.132292,
            longitude: 72.795132,
            name: 'Madh Fort',
            id: 6,
        }, {
            latitude: 19.042064,
            longitude: 72.838538,
            name: 'Mahim Fort',
            id: 7,
        }, {
            latitude: 18.965643,
            longitude: 72.843186,
            name: 'Mazagon Fort',
            id: 8,
        }, {
            latitude: 19.047013,
            longitude: 72.865019,
            name: 'Riwa Fort',
            id: 9,
        }, {
            latitude: 19.000658,
            longitude: 72.860534,
            name: 'Sewri Fort',
            id: 10,
        }, {
            latitude: 19.046554,
            longitude: 72.877994,
            name: 'Sion Hillock Fort',
            id: 11,
        }, {
            latitude: 19.023695,
            longitude: 72.817320,
            name: 'Worli Fort',
            id: 12,
        },

    ]

};

var viewModel = {
    //Function to initialize maps and places
    init: function() {
        viewModel.mapsAPIInitialize();
        viewModel.placesInitialize();
    },
    //Initialize Maps API asynchronously
    mapsAPIInitialize: function() {
        $.getScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyC4sTmzH3JV8wMKjD45KkjtgYjZFZilxS0")
            .done(function(script, textStatus) {

                mapView.markerRender();
                viewModel.search('');
            })
            .fail(function(jqxhr, settings, exception) {
                window.alert("error loading the maps API.");
            });
    },

    placesInitialize: function() {
        model.placesActive = model.places;
        console.log(model.placesActive);
    },

    getPlaces: function() {
        return model.places;
    },


    placesshown: ko.observableArray(),

    query: ko.observable(''),

    marker: [],

    wikiValue: ko.observable(''),


    //Function for search functionality
    search: function(value) {

        viewModel.placesshown.removeAll();

        for (var x in model.places) {
            if (model.places[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
                viewModel.placesshown.push(model.places[x]);
            }
        }
        //mapView.markerRender();
        mapView.markerVisibility();

    },

    listAnimate: function(item) {

        lat = item.latitude;
        lon = item.longitude;
        id = item.id;

        google.maps.event.trigger(viewModel.marker[id], 'click');
    },
};

var listitems = function() {

    model.placesshown.forEach(function(place) {

        viewModel.placesshown.push(new listitems(place));
    });
};

viewModel.query.subscribe(viewModel.search);

var mapView = {
    //Function to Render the markers and infowindow

    map: {},

    markerRender: function() {
        var location = { lat: 19.137680, lng: 72.826172 };
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: location
        });
        var places = viewModel.placesshown();
        //Initialize infowindow object
        var infowindow = new google.maps.InfoWindow();
        //Creating Markers for Map
        for (var i = 0; i < model.places.length; i++) {

            viewModel.marker[i] = new google.maps.Marker({
                position: { lat: model.places[i].latitude, lng: model.places[i].longitude },
                map: map,
                animation: google.maps.Animation.DROP,
            });
            //Adding listener to marker
            viewModel.marker[i].addListener('click', (function(i) {
                return function() {
                    if (viewModel.marker[i].getAnimation() !== null) {
                        viewModel.marker[i].setAnimation(null);
                    } else {
                        viewModel.marker[i].setAnimation(google.maps.Animation.BOUNCE);
                        map.setCenter(viewModel.marker[i].getPosition());
                        infowindow.setContent(model.places[i].name);
                        infowindow.open(map, viewModel.marker[i]);
                        getWikiInfo(model.places[i]);
                        setTimeout(function() { viewModel.marker[i].setAnimation(null); }, 750);
                    }
                };
            })(i));
        }
        mapView.markerVisibility();
    },
    //Setting Marker visibility
    markerVisibility: function() {
        var list_of_id = [];
        var places = viewModel.placesshown();
        for (var i = 0; i < places.length; i++) {
            list_of_id[i] = places[i].id;
        }

        for (var i = 0; i < viewModel.marker.length; i++) {
            if ($.inArray(i, list_of_id) === -1) {
                viewModel.marker[i].setMap(null);
            } else {
                viewModel.marker[i].setMap(map);
            }
        }
    },


};
//Wikipedia Ajax Call
var getWikiInfo = function(place) {
    wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + place.name + '&prop=images&format=json&callback=wikiCallback';

    $.ajax({
        url: wikiUrl,
        dataType: 'jsonp',
        success: function(response) {
            var articleList = response;
            var html = '<center><h3>' + articleList[0] + '</h3></center><br><p>' + articleList[2][0] + '</p><br><a href="' + articleList[3][0] + '"><b>' + articleList[3][0] + '</b></a><br><br><cite>This information is being displayed from Wikipedia.</cite>';
            viewModel.wikiValue(html);

        },
        error: function(xhr, textStatus, errorThrown) {
            alert('Wikipedia request failed!');
        }
    });
};

// Initialization
ko.applyBindings(viewModel);
viewModel.init();