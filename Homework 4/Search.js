/*Funkcija za prebaruvanje na odreden hotel */
const searchAcc = () =>{
    let filter = document.getElementById('searchBar').value.toUpperCase();

    let ul = document.getElementById('myAccs');

    let li = ul.getElementsByTagName('li');

    for(var i=0 ;i<li.length ;i++){
        let a = li[i].getElementsByTagName('a')[0];

        let textValue = a.textContent || a.innerHTML;

        if(textValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = '';
        }
        else{
            li[i].style.display = 'none';
        }
    }

}

function getNearestFive(){
    let x = document.getElementById("xCord").value;
    let y= document.getElementById("yCord").value;
    $(document).ready(function() {
        $.ajax({
            url: "http://localhost:8080/hotels/nearest?x="+x+"&y="+y
        }).then(function(nearest) {
            /*Se vmetnuva vrednosta na pette najbliski hoteli,so ime na hotelot i koordinati*/
            document.getElementById("product1Name").innerHTML=nearest[0].name;

            document.getElementById("product1Cords").innerHTML=nearest[0].coordinates;

            document.getElementById("product2Name").innerHTML=nearest[1].name;

            document.getElementById("product2Cords").innerHTML=nearest[1].coordinates;

            document.getElementById("product3Name").innerHTML=nearest[2].name;

            document.getElementById("product3Cords").innerHTML=nearest[2].coordinates;

            document.getElementById("product4Name").innerHTML=nearest[3].name;

            document.getElementById("product4Cords").innerHTML=nearest[3].coordinates;

            document.getElementById("product5Name").innerHTML=nearest[4].name;

            document.getElementById("product5Cords").innerHTML=nearest[4].coordinates;

            document.getElementById("nearestProduct").style.display="block";
        });
    });
}

/*Se cuvaat site hoteli */

let products = [
    {
        name: 'Hotel Pela',
        coordinates: '41.0764625 20.8034074'
    },
    {
        name: 'Hotel Belvedere',
        coordinates: '41.0788322 20.8023400'
    },
    {
        name: 'Hotel na MVR',
        coordinates: '41.0769862 20.8030131'
    },
    {
        name: 'Hotel Garden',
        coordinates: '41.1056053 20.8082706'
    },
    {
        name: 'Hotel Riviera',
        coordinates: '41.1121098 20.8016881'
    },
    {
        name: 'Hotel Siti Palas',
        coordinates: '41.1099144 20.8046742',

    },
    {
        name: 'Hotel Mizo',
        coordinates: '41.1192679 20.7845353'
    },
    {
        name: 'Hotel Tino',
        coordinates: '41.1089237 20.8058802'
    },
    {
        name: 'Hotel & Spa Tino Sveti Stefan',
        coordinates: '41.0760694 20.8035432'
    },
    {
        name: 'Hotel International',
        coordinates: '41.1070136 20.8152723'
    },
    {
        name: 'Hotel Villa Jordan',
        coordinates: '41.0900379 20.7990804'
    },
    {
        name: 'Hotel Veronica',
        coordinates: '41.1170005 20.8088839'
    },
    {
        name: 'Hotel Manastri Sveti Stefan',
        coordinates: '41.0737427 20.8042065'
    },
    {
        name: 'Hotel Montenegrin Inn',
        coordinates: '41.1181085 20.7997644'
    },
    {
        name: 'Hotel Flamengo',
        coordinates: '41.1218586 20.7943777'
    },
    {
        name: 'Hotel Sky Corner',
        coordinates: '41.1174368 20.8014938'
    },
    {
        name: 'Hotel Village',
        coordinates: '41.1222239 20.8091091'
    },
    {
        name: 'Hotel Diplomat',
        coordinates: '41.1074220 20.8095668'
    },
    {
        name: 'Hotel Green Space',
        coordinates: '41.1250537 20.7712139'
    },
    {
        name: 'Hotel Daljan',
        coordinates: '41.1222715 20.7740558'
    },
    {
        name: 'Hotel Sileks',
        coordinates: '41.0746758 20.8027351'
    },
    {
        name: 'Hotel Beton',
        coordinates: '41.0754796 20.8028050'
    },
    {
        name: 'Hotel Slavija Spektar',
        coordinates: '41.0789051 20.8007902'
    },
    {
        name: 'Hotel Ineks Gorica',
        coordinates: '41.0846970 20.7972458'
    },
    {
        name: 'Hotel Aleksandrija',
        coordinates: '41.1122203 20.7980025'
    },
    {
        name: 'Hotel Kocarev',
        coordinates: '41.1471777 20.7599981'
    },
    {
        name: 'Hotel Park',
        coordinates: '41.0900379 20.7990804'
    },

]


//funckcija za sekoja rastojanie ako se klikna like button
let carts = document.querySelectorAll('.addToLiked');
for( let i=0; i<carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
    })
}

// broj na liked rastojanie
function cartNumbers(product){

    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers+1);
    }else {
        localStorage.setItem('cartNumbers', 1);

    }

    setItems(product);
}

//set rastojanie vo localStorage
function setItems(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems)

    if(cartItems != null){
        if(cartItems[product.name] == undefined){
            cartItems = {
                ...cartItems,
                [product.name]: product
            }
        }
    }else {
        cartItems = {
            [product.name]: product
        }
    }

    localStorage.setItem("productsInCart", JSON.stringify(cartItems));

}
/*Se prikazuvaat hotelite vo liked accommodation*/
function displayAcc(){
    let accItems = localStorage.getItem("productsInCart");
    accItems = JSON.parse(accItems);

    let accContainer = document.querySelector(".accommodations");

     if(accItems && accContainer){
        Object.values(accItems).map(item =>{
           accContainer.innerHTML += `
           <div class="accommodations" style="margin-top: 15px">
               <span>${item.name}</span>
               <span>${item.coordinates}</span>        
           </div>
           `
        });
        console.log(accContainer);
    }
}

displayAcc();

//---------------- add acc --------------------

//funkcija za dodavanje new accommodation vo add.html
function addAcc(){
    let accName = document.getElementById("accName").value;
    let accCoordinates = document.getElementById("accCoordinates").value;

    document.getElementById("acc-container").innerHTML += `
    <li class="acc">
                <a href = "#"> ${accName} </a> 
                <button class="addToLiked">Like</button>                
                <p>Coordinates: ${accCoordinates}</p>
    </li>`

    localStorage.setItem("accName", JSON.stringify(accName +","+ accCoordinates));

}

//funkcija za display na new accommodation vo search.html
function addAccOnSearch(){

    let accItems = localStorage.getItem("accName");
    accItems = JSON.parse(accItems);

    if(accItems != null) {
        let accInfo = accItems.split(",");

        let name = accInfo[0];
        let coordinates = accInfo[1];

        document.getElementById("accContainer").innerHTML += `
         <li class="acc">
                <a href = "#">${name}</a>
                <button class="addToLiked">Like</button>
                <p>Coordinates: ${coordinates}</p>
         </li>
        `
    }
}

addAccOnSearch();
