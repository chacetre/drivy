'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4

var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 2,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

function Update ()
{
 for ( var i = 0 ; i < rentals.length ; i++)
	{
	var day = RecupDate(rentals[i].id);
	var id = rentals[i].carId;
	var distance = rentals[i].distance;
	
	var priceDay;
	var priceKm = 0;
	
			for ( var j =0; j < cars.length ; j++)
			{
				if ( cars[j].id == id )
				{
					   priceDay = cars[j].pricePerDay;
					   priceKm = cars[j].pricePerKm;
				}
			}		
		rentals[i].price = distance * priceKm +  day* priceDay ;	
	}
}

function ReductionPrice()
{
	for ( var i = 0 ; i < rentals.length ; i++)
	{
		var day = RecupDate(rentals[i].id);
		
		if ( day > 1 && day <= 4)
		{
		 rentals[i].price = rentals[i].price - (rentals[i].price*0.1)
		}
		if ( day > 4 && day <= 10)
		{
		 rentals[i].price = rentals[i].price - (rentals[i].price*0.3)
		}
		
		if (  day > 10)
		{
		 rentals[i].price = rentals[i].price - (rentals[i].price*0.5)
		}		
	
	}

}

function GiveCommission()
{
	for ( var i = 0 ; i < rentals.length ; i++)
	{
		var day = RecupDate(rentals[i].id);		
		var commission = Math.round(rentals[i].price * 0.3);
				
		rentals[i].commission.insurance = Math.round(commission *0.5);
		rentals[i].commission.assistance = day;
		rentals[i].commission.drivy = commission - rentals[i].commission.insurance -rentals[i].commission.assistance;
		
	}
		
}

function Accident()
{
	for ( var i = 0 ; i < rentals.length ; i++)
	{
		var day = RecupDate(rentals[i].id);		
		
		if (rentals[i].options.deductibleReduction ==  true )		
		{
			rentals[i].price += 4*day ;
		}
		
	}
}

function Paid()
{
	for ( var i = 0 ; i < actors.length ; i++)
	{
	var price = 0;
	var commission = 0;
	var insurance = 0;
	var assistance = 0 ;
	var deductibleReduction = true ; 
	var day = RecupDate(actors[i].rentalId);
	
		for ( var j = 0 ; j < rentals.length ; j++)
		{
			if ( actors[i].rentalId == rentals[j].id ) 
			{
				price = rentals[j].price;
				commission =  rentals[j].commission.insurance +   rentals[j].commission.drivy +  rentals[j].commission.assistance;		
				insurance =  rentals[j].commission.insurance;
				assistance = rentals[j].commission.assistance;
				deductibleReduction = rentals[j].options.deductibleReduction;
				
			}	
			
			for ( var x = 0 ; x < 5 ; x++)
			{
				if ( actors[i].payment[x].who == "driver")
				{
					actors[i].payment[x].amount = price ; 
				}
		
				if ( actors[i].payment[x].who == "owner")
				{
					actors[i].payment[x].amount = price - commission;
				}
		
				if ( actors[i].payment[x].who == "insurance")
				{
					actors[i].payment[x].amount = insurance;
				}
		
				if ( actors[i].payment[x].who == "assistance")
				{
					actors[i].payment[x].amount = assistance;
				}		
				
				if ( actors[i].payment[x].who == "drivy")
				{
						if ( deductibleReduction == true )
						{
							actors[i].payment[x].amount = 150 + 4 *day + commission - insurance - assistance ;
						}
						else 
						{
							actors[i].payment[x].amount = 800 + commission - insurance - assistance ;
						}
					
				}							
			}			
			
		}
		
	}

}

function UpdateRentalData()
{
		for ( var i = 0 ; i < rentalModifications.length ; i++)
		{
			var rental = FindRental( rentalModifications[i].rentalId);
			for ( var modif in rentalModifications[i] )
			{
				if ( modif != "rentalId" )
				{
					rental[modif] = rentalModifications[i][modif];
				}
			}
					
		}

}

function FindRental ( id )
{
	var tmp = rentals.length;
	for ( var i = 0 ; i < tmp ; i++)
	{
			if ( id == rentals[i].id)
			{
			return rentals[i];
			}
	}
	return ;
}

function RecupDate(id)
{
	var day = 0 ;
	var rental = FindRental(id);
	var returnDate = new Date (rental.returnDate);
	var startDate = new Date(rental.pickupDate);
	day = 1+ (returnDate - startDate )/(24*3600*1000) ;
	return day ; 
}


Update();
ReductionPrice();
Accident();
GiveCommission();
Paid();
UpdateRentalData();

console.log(cars);
console.log(rentals);
console.log(actors);
console.log(rentalModifications);
