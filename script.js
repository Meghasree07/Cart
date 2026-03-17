document.getElementById('categoryFilter').addEventListener('change', function() {

    let selectedCategory = this.value;

    let products = document.querySelectorAll('.col-md-3');

    products.forEach(function(product){

        let productCategory = product.getAttribute('data-category');

        if(selectedCategory === "all" || productCategory === selectedCategory){
            product.style.display = ""; 
        } else {
            product.style.display = "none";
        }

    });

});

let cart = [];

let addButtons = document.querySelectorAll('.add-cart');

addButtons.forEach(function(button){
    button.addEventListener('click', function(){

        let name = button.parentElement.querySelector('h2').textContent;
        let price = parseInt(button.getAttribute('data-price'));

        cart.push({name, price});
        updateCart();

    });
});
document.getElementById('searchInput').addEventListener('keyup', function(){

    let searchValue = this.value.toLowerCase();
    let products = document.querySelectorAll('.col-md-3');

    products.forEach(function(product){

        let name = product.querySelector('h2').textContent.toLowerCase();

        if(name.includes(searchValue)){
            product.classList.remove('d-none');
        } else {
            product.classList.add('d-none');
        }

    });

});

function updateCart(){
    let cartList = document.getElementById('cart-list');
    let total = 0;

    cartList.innerHTML = "";

    cart.forEach(function(item, index){

        total += item.price;

        let li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";

        li.innerHTML = `
            ${item.name} - ₹${item.price}
            <button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button>
        `;

        cartList.appendChild(li);
    });

    document.getElementById('items').textContent = cart.length;
    document.getElementById('total').textContent = total;
}

function removeItem(index){
    cart.splice(index, 1);
    updateCart();
}