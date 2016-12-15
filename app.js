var model = {
    places : [
        {
            latitude: 19.072391,
            longitude: 72.821831,
            name: 'Nemo\'s Pastry Palace',
            category: 'Bakery',
            rating: '5',
        },
        {
            latitude: 19.072391,
            longitude: 72.823643,
            name: 'Spidey Burger Shack',
            category: 'Restaurant',
            rating: '4.5',
        },
        {
            latitude: 19.071885,
            longitude: 72.828364,
            name: 'Hulk Tacos',
            category: 'Restaurant',
            rating: '4',
        },
        {
            latitude: 19.070655,
            longitude: 72.831324,
            name: 'Thor Coffee House',
            category: 'Bakery',
            rating: '4',
        },
        {
            latitude: 19.069787,
            longitude: 72.825123,
            name: 'Hawkeye Bowling Alley',
            category: 'Entertainment',
            rating: '3.5',
        },
        {
            latitude: 19.067037,
            longitude: 72.832115,
            name: 'IronMan\'s Motor Repair Shop',
            category: 'Car Repair',
            rating: '3',
        },
        {
            latitude: 19.067544,
            longitude: 72.820989,
            name: 'Groot DJ House',
            category: 'Entertainment',
            rating: '4',
        },
        {
            latitude: 19.063669,
            longitude: 72.825852,
            name: 'Flash Jogger\'s Park',
            category: 'Fitness',
            rating: '4.5',
        },
        {
            latitude: 19.060799,
            longitude: 72.832257,
            name: 'DeadPool Snooker House',
            category: 'Entertainment',
            rating: '5',
        },
        {
            latitude: 19.059738,
            longitude: 72.823657,
            name: 'Archie Picture Place',
            category: 'Entertainment',
            rating: '4',
        },
        {
            latitude: 19.057543,
            longitude: 72.831108,
            name: 'Captain\'s Memorial',
            category: 'Entertainment',
            rating: '3',
        },
        {
            latitude: 19.059738,
            longitude: 72.835012,
            name: 'Thanos Jewels',
            category: 'Shopping',
            rating: '2.5',
        },
        {
            latitude: 19.055613,
            longitude: 72.826056,
            name: 'Batman Gadget Shack',
            category: 'Shopping',
            rating: '5',
        },
        {
            latitude: 19.055758,
            longitude: 72.836850,
            name: 'Superman Gym',
            category: 'Fitness',
            rating: '3.5',
        },
        {
            latitude: 19.058580,
            longitude: 72.827944,
            name: 'Xavier Pizza Paradise',
            category: 'Restaurant',
            rating: '3.5',
        },

    ]

};

var viewModel = {
    init: function(){
        console.log("viewmodel has been initialized");
        viewModel.mapsAPIInitialize();

    },

    mapsAPIInitialize: function(){
        console.log("mapsAPIInitialize()function call");
        $.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4sTmzH3JV8wMKjD45KkjtgYjZFZilxS0" )
      .done(function( script, textStatus ) {
        mapView.mapInit();
      })
      .fail(function( jqxhr, settings, exception ) {
        window.alert("error loading the maps API.");
        });
    },

};

var mapView = {

    mapInit: function(){
        console.log("mapInit function call");
        var location = {lat: 19.066249, lng: 72.826172};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location
        });
        mapView.markerRender(map, location);

    },

    markerRender: function(map, location){
        console.log("markerRender function call");
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
    },

};

// Initialization
ko.applyBindings(viewModel);
viewModel.init();