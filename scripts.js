var data = [
    { id: 1, name: "Deluxe Suite", facilities: ["TV", "WiFi" , "Bathtub"], price: 80 }, 
    { id: 2, name: "Twin room", facilities: ["WiFi", "Shower"], price: 30 }
];

$(function() {

    function renderRoom(room) {
        return `
            <tr>
                <td>${room.name}</td>
                <td>${room.facilities.join(', ')}</td>
                <td>&euro; <span>${room.price}</span></td>
                <td>
                    <select data-price="${room.price}" data-id="${room.id}">${[...Array(10)].map((i, k) => '<option>' + k + '</option>').join('')}</select>
                </td>
            </tr>
        `;
    }
    
    let pricesMap = {};

	let body = document.querySelector('tbody');
	let renderedRoom = '';

	data.forEach(function(el){
		renderedRoom += renderRoom(el);
		
		pricesMap[el.id] = {
			price: el.price,
			qtd: 0
		}
	});

	let bodyPage = document.querySelector( 'body' );
	let buttonTotal = document.querySelector( 'button' );

	bodyPage.addEventListener('change', function(e){
		if ( event.target.nodeName === 'SELECT' ) {
			pricesMap[e.target.getAttribute('data-id')].qtd = e.target.value;

			total = 0;

			for ( prop in pricesMap ) {
				if ( pricesMap[prop].qtd > 0 ) {
					total += pricesMap[prop].price * pricesMap[prop].qtd;
				}
			}

			buttonTotal.innerHTML = `Book for <span>&euro; ${total}</span>`;
		}
	});

	body.innerHTML = renderedRoom;
});