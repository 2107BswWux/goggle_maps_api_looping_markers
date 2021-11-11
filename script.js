// query selectors
const userSearch = document.querySelector('#userSearch');

// global variables
let map;
let markers =[];

// ====================================
// start of maps function
// ====================================
    function initMap(){
        let iceland = {lat:64.9631, lng:-19.0208};
        map = new google.maps.Map(document.getElementById('map'),{
            zoom: 5,
            center: iceland
        });
    };


// ====================================
// end of maps function
// ====================================


// ====================================
// start of acommodation object array
// ====================================
let acommodation = [
    {
        id: 101,
        name: 'this is a hotel',
        type: 'hotel',
        price: 157,
        minGuests: 1,
        maxGuests:2,
        minNights:1,
        maxNights:5,
        latitude: 65.60558712361096,
        longitude:-18.65329363247231
    },
    {
        id: 102,
        name: 'this is a hostel',
        type: 'hostel',
        price: 30,
        minGuests: 1,
        maxGuests:1,
        minNights:1,
        maxNights:10,
        latitude: 65.78625698912022,
        longitude:-21.98442118600065
    },
    {
        id: 103,
        name: 'this is a motel',
        type: 'motel',
        price: 90,
        minGuests: 2,
        maxGuests:4,
        minNights:3,
        maxNights:10,
        latitude: 65.06074936401986,
        longitude:-16.69548393975031
    },
    {
        id: 102,
        name: 'this is a house',
        type: 'hostel',
        price: 240,
        minGuests: 1,
        maxGuests:4,
        minNights:2,
        maxNights:15,
        latitude: 64.07384853513256,
        longitude:-21.485987309390673
    },
];
// ====================================
// end of acommodation object array
// ====================================

// ====================================
// start of user input form
// ====================================

function filterOptions(event){
    event.preventDefault();
    console.log('clicked');

    let msday = 1000 * 3600 * 24;

    let checkInDate = new Date($('#checkInDate').val());
    let checkOutDate = new Date($('#checkOutDate').val());
    console.log(checkInDate);
    console.log(checkOutDate);

    let dateDifference = checkOutDate.getTime() - checkInDate.getTime();
    let numberOfDays = dateDifference/msday;
    console.log(numberOfDays);

    let numberOfPeople = $('#numberOfPeople').val();
    console.log(numberOfPeople);
    displayOptions(numberOfDays,numberOfPeople);
}
// ====================================
// end of user input form
// ====================================

// ====================================
// start of user input display options
// ====================================
    function displayOptions(nights,guests){
        reloadMarkers();
        console.log(nights);
        console.log(guests);
        $('#acommodationCardContainer').empty();
        for (let i =0; i<acommodation.length; i++){
            if( ((nights <= acommodation[i].maxNights) && (nights >= acommodation[i].minNights)) 
            && ((guests <= acommodation[i].maxGuests) && (guests >= acommodation[i].minGuests)) ){
                generateCard(i);
                let location = {lat: acommodation[i].latitude, lng:acommodation[i].longitude};
                console.log(location);

                let marker = new google.maps.Marker({
                    position: location,
                    map:map
                });
                markers.push(marker);
            }
        }
    }
    console.log(markers);
// ====================================
// end of user input display options
// ====================================

// ====================================
// start of reload markers
// ====================================
    function reloadMarkers(){
        // loop through our array and set the map to null value
        for(let i =0; i<markers.length; i++){
            markers[i].setMap(null);
        }
        markers=[];
    }

// ====================================
// end of reload markers
// ====================================






// ====================================
// start of generate card function
// ====================================
    function generateCard(x){
      $('#acommodationCardContainer').append(
          `
          <div class="card" style="width: 18rem;">
          <img class="card-img-top" src="..." alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">${acommodation[x].name}</h5>
            <p class="card-text">price per night is $${acommodation[x].price}</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
          </div>
        </div>
          `
      )
    }

// ====================================
//  end of of generate card function
// ====================================






// eventlisteners

userSearch.addEventListener('click',filterOptions);