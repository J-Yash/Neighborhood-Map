var model = {
    placesActive: null,
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
        viewModel.placesInitialize();


    },

    mapsAPIInitialize: function(){
        console.log("mapsAPIInitialize()function call");
        $.getScript( "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4sTmzH3JV8wMKjD45KkjtgYjZFZilxS0" )
      .done(function( script, textStatus ) {

        mapView.markerRender();
        viewModel.search('');
      })
      .fail(function( jqxhr, settings, exception ) {
        window.alert("error loading the maps API.");
        });
    },

    placesInitialize: function(){
        console.log("placesInitialize function call");
        model.placesActive = model.places;
        console.log(model.placesActive);

        //listView.init(model.placesActive);

    },

    getPlaces : function(){
        console.log("getPlaces function called");
        return model.places;

    },


    placesshown: ko.observableArray(),

    query: ko.observable(''),

    marker: [],

    search: function(value){
        console.log("search function called"+value);
        /*if(viewModel.query() === '')
        {
            viewModel.placesshown.removeAll();

        for(var x in model.places) {

            viewModel.placesshown.push(model.places[x]);

            }
        }
        else{
*/
        viewModel.placesshown.removeAll();

        for(var x in model.places) {
        if(model.places[x].name.toLowerCase().indexOf(value.toLowerCase()) >= 0) {
        viewModel.placesshown.push(model.places[x]);
                }
            }
        //
        mapView.markerRender();
        //mapView.listAnimate();
        //}
    },

    listAnimate: function(item){
                console.log("listAnimate function call");

                //var places = viewModel.placesshown();

                lat = item.latitude;
                lon = item.longitude;
                //console.log("listAnimate lat"+lat);
                //console.log("listAnimate lon"+lon);
                //console.log("listAnimate length"+viewModel.placesshown().length);
                //console.log("listAnimate length"+viewModel.marker.length);
                //console.log("listAnimate item"+item);
                console.log("listAnimate item props "+item.latitude);
                console.log("listAnimate item props "+item.longitude);
                //console.log("listAnimate places props "+viewModel.placesshown()[1].latitude);
                //console.log("listAnimate places props "+viewModel.placesshown()[1].longitude);
                //console.log("listAnimate marker props "+viewModel.marker[2].position.lat());
                //console.log("listAnimate marker props "+viewModel.marker[2].position.lng());




                //google.maps.event.trigger(viewModel.marker, 'click');

                for(var i=0; i< viewModel.marker.length; i++){
                    if(viewModel.marker[i].position.lat()  === lat && viewModel.marker[i].position.lng() === lon)
                    {
                        console.log("listAnimate lat"+viewModel.marker[i].position.lat());
                        console.log("listAnimate lon"+viewModel.marker[i].position.lng());
                        google.maps.event.trigger(viewModel.marker[i], 'click');
                        break;
                    }

                }
    }

};

var listitems = function(){
    console.log("listitems function called");

    model.placesshown.forEach(function(place){

        viewModel.placesshown.push(new listitems(place));
    });
};

viewModel.query.subscribe(viewModel.search);

var mapView = {

    mapInit: function(){
        console.log("mapInit function call");

    },

    markerRender: function(){
        console.log("markerRender function call");
        var location = {lat: 19.066249, lng: 72.826172};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: location
        });
        var places = viewModel.placesshown();
        //var marker = [];
        for(var i = 0; i < places.length;i++)
        {
                viewModel.marker[i] = new google.maps.Marker({
                position: {lat: places[i].latitude, lng: places[i].longitude},
                map: map,
                animation: google.maps.Animation.DROP,
            });

            viewModel.marker[i].addListener('click', (function(i){
                return function(){
                    if (viewModel.marker[i].getAnimation() !== null) {
          viewModel.marker[i].setAnimation(null);
        } else {
          viewModel.marker[i].setAnimation(google.maps.Animation.BOUNCE);
          setTimeout(function(){ viewModel.marker[i].setAnimation(null); }, 750);

        }
                }
            })(i));

        }

    },



};

/*var toggleBounce = function(i) {
    if (viewModel.marker[i].getAnimation() !== null) {
          viewModel.marker[i].setAnimation(null);
        } else {
          viewModel.marker[i].setAnimation(google.maps.Animation.BOUNCE);
        }
};*/

var listView = {

};


// Initialization
ko.applyBindings(viewModel);
viewModel.init();
