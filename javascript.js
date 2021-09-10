// navbar
function myFunction() {
var x = document.getElementById("nav");
if (x.className === "navbar") {
x.className += " responsive";
} else {
x.className = "navbar";
 }
 } 

// registration modal
var modal = document.getElementById('id01');
 0
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

// login
const baseURL = "https://shielded-retreat-30625.herokuapp.com/patron_login";
const accesstoken = window.localStorage.getItem("jwt-token");

function login(){
	const username = document.querySelector("#auth_username").value;
	const password = document.querySelector("#auth_password").value;
	const body = {
		username: username,
		password: password,
	};
	fetch(url, {
		method: "PATCH",
		body: JSON.stringify(body),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((res) => res.json()).then((data) => {
			console.log(data);
			if (data['description'] == 'Invalid Credentials') {
				alert('Error, login credentials invalid!')
			}
			else {
				myStorage = window.localStorage
				console.log(data['access_token'])
				myStorage.setItem('jwt-token', data['access_token'])
				window.location.href = './bookings.html'
			}
		});
}

function submitForm(event) {
	event.preventDefault();
	login(baseURL);
}

form.addEventListener("submit", submitForm);

const form = document.querySelector("#form");

form.addEventListener("submit", submitForm);

function submitForm(event) {
    event.preventDefault();
    window.location.href = './index.html'
}

// registration
const baseURL1 = "https://shielded-retreat-30625.herokuapp.com/patron_registration"; 

function patron_registration () {
	const fname = document.querySelector("#full_name").value;
	const email= document.querySelector("#email_address").value;
	const contact = document.querySelector("#contact_number").value;
	const address = document.querySelector("#address").value;
	const banking_details = document.querySelector("#banking_details").value;
	const username= document.querySelector("#username").value;
	const password = document.querySelector("#password").value;
	fetch(baseURL1, {
		method: "POST",
		body: JSON.stringify({
			full_name: fname,
			email_address: email,
			contact_number: contact,
			address: address,
			banking_details: banking_details,
			username: username,
			password: password
		}),
		headers: {
			"Content-type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			localStorage.setItem("patrons", JSON.stringify(data));
		});
}

function admin_registration() {
	const fname = document.querySelector("#full_name").value;
	const username = document.querySelector("#username").value;
	const password = document.querySelector("#password").value;

	fetch("https://shielded-retreat-30625.herokuapp.com/admin_registration", { 
		method: "POST",
		body: JSON.stringify({
			full_name: fname,
			username: username,
			password: password,
		}),
		headers: {
			"Content-type": "application/json; charset=UTF-8",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
		});
}

var seat = 2;

var List = [];
List.weekend = [];
List.week = [];

var advancedTime = [
  {
    'weekend': [
      { time: "12:30", available: true, seats: 150 },
      { time: "13:30", available: true, seats: 80 },
      { time: "13:45", available: true, seats: 50 },
      { time: "19:30", available: true, seats: 70 },
      { time: "20:00", available: true, seats: 70 },
      { time: "20:15", available: false, seats: 0 },
      { time: "20:30", available: false, seats: 0 },
      { time: "20:45", available: false, seats: 0 },
      { time: "21:00", available: false, seats: 0 },
      { time: "21:15", available: true, seats: 150 },
      { time: "21:30", available: true, seats: 150 }
    ],
    'week': [
      { time: "19:30", available: true, seats: 40 },
      { time: "20:00", available: true, seats: 50 },
      { time: "20:15", available: false, seats: 0 },
      { time: "20:30", available: false, seats: 0 },
      { time: "20:45", available: false, seats: 0 },
      { time: "21:00", available: false, seats: 0 },
      { time: "21:15", available: true, seats: 100 },
      { time: "21:30", available: true, seats: 150 },
      { time: "21:45", available: false, seats: 0 },
      { time: "22:00", available: false, seats: 0 },
    ]
  }
]

var filterList = function(seatNumber){
  List = [];
  List.weekend = [];
  List.week = [];
  
  for(var i=0; i<advancedTime[0].weekend.length; i++) {
    if( (advancedTime[0].weekend[i].seats - seatNumber) >= 0) {
      List.weekend.push(advancedTime[0].weekend[i]);
    }
  }

  for(var i=0; i<advancedTime[0].week.length; i++) {
    if( (advancedTime[0].week[i].seats - seatNumber) >= 0) {
      List.week.push(advancedTime[0].week[i]);
    }
  }

  $('#datetimepicker').datetimepicker({allowTimes: advancedListAvailable()});
    
}

var advancedListAvailable = function(dayIndex) {

  var selectedSeat = $('#number').html(); 
  var timeList = [];
  
  if(dayIndex == null || dayIndex == undefined ) {
     dayIndex = new Date().getDay(); 
  }

  if(dayIndex == 0 || dayIndex >= 5) {
    
    if(List.weekend.length > 0) {

      for(var i=0; i<List.weekend.length; i++) {    

        if(List.weekend[i].available == true) { 
          timeList.push(List.weekend[i].time); 
        }

      }
      
      $('#datetimepicker').datetimepicker({allowTimes: timeList}); 
    } else {

      $('#datetimepicker').datetimepicker({disabledWeekDays: [dayIndex]});

    }
    
  } else { 
    
    if(List.week.length > 0) {
      for(var i=0; i<List.week.length; i++) {

        if(List.week[i].available == true) { 
          timeList.push(List.week[i].time); 
        }

      }

      $('#datetimepicker').datetimepicker({allowTimes: timeList});
    
    } else {

      $('#datetimepicker').datetimepicker({disabledWeekDays: [dayIndex]});

    }
  }
  
}

var maxDays = function() {
  var initial = new Date(); 
  var addDays = 5; 
  return initial.setDate(initial.getDate() + addDays); 
} 

var options = {
  format: 'd/m/Y H:i',
  value: Date.now(),
  minDate: 0,
  maxDate: maxDays(),
  step: 15,
  closeOnWithoutClick: true,
  todayButton: false,
  lang: 'fr',
  onSelectDate: function(ct) {
    advancedListAvailable(ct.getDay());
  }
}

$(document).ready(function() {
  
  $(".infos span").html(seat); 

  $("#minus").addClass("disabled"); 

  $('#datetimepicker').datetimepicker(options);

  filterList(seat); 

  $("#minus").click(function(e) {    
    e.preventDefault();
    
    if(seat !== 2) { 
      
      $(".infos span").fadeOut("fast", function() { 
        if(seat > 3) {
          seat--; 
          filterList(seat); 
        } else if(seat === 3) {
          seat--;
          filterList(seat);
          $("#minus").addClass("disabled"); 
        }

        $(".infos span").html(seat).fadeIn(400); 
      });   
      
    }
    
  });

  $("#plus").click(function(e) {
    e.preventDefault();
    
    $(".infos span").fadeOut("fast", function() {
      
      if(seat >= 2) {
        $("#minus").removeClass("disabled");
      }
      
      seat++; 
      filterList(seat); 
      
      $(this).html(seat).fadeIn(400); 
      
    });
   
  });
  
});