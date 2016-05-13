app.directive('insertSeller', [function(){

  return {
    controller: ['$scope','Seller' ,'$interval', function($scope, Seller, $interval) {

      //list of possbile sellers
      //we only specify the name and image, rest of our sellers can be autogenerated
      var sellers = [
        {
          name: "Maria",
          img: "imgs/sellers/bild2.png"
        },
        {
          name: "Anna",
          img: "imgs/sellers/bild4.png"
        },
        {
          name: "Evangelina",
          img: "imgs/sellers/bild3.png"
        },
        {
          name: "Katte",
          img: "imgs/sellers/bild5.png"
        },
        {
          name: "Fatima",
          img: "imgs/sellers/bild1.png"
        },
        {
          name: "Lina",
          img: "imgs/sellers/bild8.png"
        },
        {
          name: "Jacob",
          img: "imgs/sellers/bild7.png"
        },
        {
          name: "Mark",
          img: "imgs/sellers/bild6.png"
        }
      ];

      //function that creates and return a seller object (uses seller mongoose model as template)
      function createSellerObject(name, position, phone, email, about, img){

        //creates the object that will be returend
        var seller = {};

        //specifies default values
        if(!name){ name = 'John Doe'; }
        if(!position){ position = 'Mäklare'; }
        if(!phone){ phone = 123456789; }
        if(!email){ email = name + '@maklare.se'; }
        if(!about){ about = "Jag heter " +name+ " och jag är fastighetsmäklare på DYHR & RUMSON. Jag är högskoleutbildad, ansvarsförsäkrad och registrerad hos FMI. Kontakta mig så tar vi tillsammans fram det upplägg som fungerar bäst för just dig och din bostad!"; }
        if(!img){ img = "imgs/sellers/bild2.png"; }

        //uses the info above the build the seller object
        seller = {
          "name": name,
          "position": position,
          "phone": phone,
          "email": email,
          "about": about,
          "img": img
        }

        //return our completed object
        return seller;

      };

      //generetaes a random phonenumber with a specified length (optional)
      function randomPhoneNumber(numberLength){

        //set default length of our phonenumber to 6
        if(!numberLength){ numberLength = 6; }

        //create the variable that will later be our complete number, sets it to a string
        //to make it easier to add numbers to it
        var number = '';

        //loop through the numberLength
        for (var i = 0; i < numberLength; i++) {
          
          //and add a random number (between 1 and 9) to our number variable
          number += Math.floor(Math.random() * 9) + 1;
        }

        //return our number string, divided by 1 (to convert it back to a Number)
        return number / 1;
      };
      
      //Get sellers from DB
      Seller.get(function(x){
        //if the db already contans sellers, return
        if(x.length){
          return;
        }
        //else create som sellers!
        else{
          //loops through all sellers in our sellers array
          for (var i = 0; i < sellers.length; i++) {
            Seller.create([
              createSellerObject(
                sellers[i].name,
                false,
                randomPhoneNumber(9),
                false,
                false,
                sellers[i].img 
                )
            ]);
          }
        }
      });
    }]
  };
}]);