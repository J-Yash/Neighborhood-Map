var model = {
    placesActive: null,
    places : [
        {
            latitude: 19.330528,
            longitude: 72.816043,
            name:'Fort Bassein',
            id: 0,
        },
        {
            latitude: 19.008233,
            longitude: 73.041062,
            name:'Belapur Fort',
            id: 1,
        },
        {
            latitude: 18.931495,
            longitude: 72.838485,
            name:'Bombay Castle',
            id: 2,
        },
        {
            latitude: 19.041800,
            longitude: 72.819084,
            name:'Castella de Aguada',
            id: 3,
        },
        {
            latitude: 18.941196,
            longitude: 72.838822,
            name:'Fort George Bombay',
            id: 4,
        },
        {
            latitude: 19.296126,
            longitude: 72.888794,
            name:'Ghodbunder Fort',
            id: 5,
        },
        {
            latitude: 19.132292,
            longitude: 72.795132,
            name:'Madh Fort',
            id: 6,
        },
        {
            latitude: 19.042064,
            longitude: 72.838538,
            name:'Mahim Fort',
            id: 7,
        },
        {
            latitude: 18.965643,
            longitude: 72.843186,
            name:'Mazagon Fort',
            id: 8,
        },
        {
            latitude: 19.047013,
            longitude: 72.865019,
            name:'Riwa Fort',
            id: 9,
        },
        {
            latitude: 19.000658,
            longitude: 72.860534,
            name:'Sewri Fort',
            id: 10,
        },
        {
            latitude: 19.046554,
            longitude: 72.877994,
            name:'Sion Hillock Fort',
            id: 11,
        },
        {
            latitude: 19.023695,
            longitude: 72.817320,
            name:'Worli Fort',
            id: 12,
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
                id = item.id;
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

                //for(var i=0; i< viewModel.marker.length; i++){
                   // if(viewModel.marker[i].position.lat()  === lat && viewModel.marker[i].position.lng() === lon)
                  //  {
                   //     console.log("listAnimate lat"+viewModel.marker[i].position.lat());
                   //     console.log("listAnimate lon"+viewModel.marker[i].position.lng());
                        google.maps.event.trigger(viewModel.marker[id], 'click');
                    //    break;
                    //}

               // }
    },

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
        var location = {lat: 19.137680, lng: 72.826172};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: location
        });
        var places = viewModel.placesshown();



        var infowindow = new google.maps.InfoWindow();
        //var marker = [];

        for(var i = 0; i < model.places.length;i++)
        {


                viewModel.marker[i] = new google.maps.Marker({
                position: {lat: model.places[i].latitude, lng: model.places[i].longitude},
                map: map,
                animation: google.maps.Animation.DROP,
            });


            viewModel.marker[i].addListener('click', (function(i){
                return function(){
                    if (viewModel.marker[i].getAnimation() !== null) {
          viewModel.marker[i].setAnimation(null);
        } else {
          viewModel.marker[i].setAnimation(google.maps.Animation.BOUNCE);
          infowindow.setContent(model.places[i].name);
          infowindow.open(map, viewModel.marker[i]);
          getWikiInfo(model.places[i]);
          setTimeout(function(){ viewModel.marker[i].setAnimation(null); }, 750);

        }
                }
            })(i));

        }

        var list_of_id = [];

        for(var i=0; i<places.length; i++){
            list_of_id[i] = places[i].id;
            //console.log("id list"+places[i].id);
        }

        for(var i=0; i<viewModel.marker.length;i++){
            if($.inArray(i,list_of_id) === -1)
            {
                viewModel.marker[i].setVisible(false);
            }
        }

//---------Code for setting marker visibility-------------------

       /*for(var i=0; i<model.places.length;i++)
        {
            //console.log("ID: " + viewModel.placesshown()[i].id);
            if(viewModel.placesshown()[i].id === i)
            {
                viewModel.marker[i].setVisible(true);
            }
            else
            {
                viewModel.marker[i].setVisible(false);
            }
        }*/

    },
    };

var getWikiInfo = function(place){
    console.log("Wiki function call"+place.name);
     wikiUrl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + place.name + '&format=json&callback=wikiCallback';

            $.ajax({
            url: wikiUrl,
            dataType:'jsonp',
            success: function(response) {
                var articleList = response;
                $('.wiki h3').text(articleList[0]);
                $('.wiki p').text(articleList[2][0]);
                $('.wiki b').text(articleList[3][0]);
                $('.wiki a').attr("href",articleList[3][0]);
                console.log(articleList);
                console.log(articleList[0]);
                console.log(articleList[2][0]);
                console.log(articleList[3][0]);
                /*for (var i = 0; i < articleList.length; i++) {
                    articleStr = articleList[i];
                    var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                    self.wikiText('<li><a href="' + url + '">' + articleStr + '</a></li>');

                    //$wikiContent.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
                    clearTimeout(wikiRequestTimeout);
                }
                */
            }

    });
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
