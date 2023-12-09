const menu = document.getElementById('menu');
const close = document.getElementById('close');
const menuList = document.querySelector('.menu');
const overlay = document.querySelector('.overlay');
const cartIcon = document.querySelector('.icon-cart');
const cartBox = document.querySelector('.cart-box');
const cartBody = document.querySelector('.cart-body');
const thumb = document.querySelectorAll('.thumb');
const mainImage = document.querySelector('.main-image');
const arrowLeft = document.querySelector('.left');
const arrowRight = document.querySelector('.right');
const lightboxMainImage = document.querySelector('.lightbox-main-image');
const lightboxThumb = document.querySelectorAll('.lightbox-thumb');
const lightboxLeft = document.querySelector('.lightbox-left');
const lightboxRight = document.querySelector('.lightbox-right');
const lightboxClose = document.querySelector('.lightbox-close');
const lightbox = document.querySelector('.lightbox');
const lightboxOverlay = document.querySelector('.lightbox-overlay');
const plus = document.querySelector('.plus');
const minus = document.querySelector('.minus');
const qty = document.querySelector('.qty');
const qtyBadge = document.querySelector('.qty-badge');
const addCart = document.querySelector('.addCart');
const container = document.querySelector('.container');
var i = 0;

const pics = [
    'images/image-product-1.jpg',
    'images/image-product-2.jpg',
    'images/image-product-3.jpg',
    'images/image-product-4.jpg'
];

menu.addEventListener('click', () => {
    menuList.style.display = 'block';
    overlay.style.display = 'block';
});

container.addEventListener('click', () => {
    cartBox.style.display = 'none';
});

close.addEventListener('click', () => {
    menuList.style.display = 'none';
    overlay.style.display = 'none';
});

cartIcon.addEventListener('click', () => {
    if(cartBox.style.display == 'block') {
        cartBox.style.display = 'none';
    } else {
        cartBox.style.display = 'block';
    }
});

thumb.forEach((item, i) => {
    item.addEventListener('click', () => {
        mainImage.src = pics[i];
        for(var z = 0; z < thumb.length; z++) {
            thumb[z].parentElement.classList.remove('active');
        }
        item.parentElement.classList.add('active')
    });
});

arrowLeft.addEventListener('click', () => {
    if(i <= 0) {
        i = 3;
    } else {
        i--;
    }
    mainImage.src = pics[i];
});

arrowRight.addEventListener('click', () => {
    if(i < 3) {
        i++;
    } else {
        i = 0;
    }
    mainImage.src = pics[i];
});

lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
    lightboxOverlay.style.display = 'none';
});

mainImage.addEventListener('click', () => {
    lightbox.style.display = 'block';
    lightboxOverlay.style.display = 'block';
});

lightboxThumb.forEach((item, i) => {
    item.addEventListener('click', () => {
        lightboxMainImage.src = pics[i];
        for(var z = 0; z < lightboxThumb.length; z++) {
            lightboxThumb[z].parentElement.classList.remove('active');
        }
        item.parentElement.classList.add('active')
    });
});

lightboxLeft.addEventListener('click', () => {
    if(i <= 0) {
        i = 3;
    } else {
        i--;
    }
    for(var z = 0; z < lightboxThumb.length; z++) {
        lightboxThumb[z].parentElement.classList.remove('active');
    }
    lightboxMainImage.src = pics[i];
    lightboxThumb[i].parentElement.classList.add('active');
});

lightboxRight.addEventListener('click', () => {
    if(i < 3) {
        i++;
    } else {
        i = 0;
    }
    for(var z = 0; z < lightboxThumb.length; z++) {
        lightboxThumb[z].parentElement.classList.remove('active');
    }
    lightboxMainImage.src = pics[i];
    lightboxThumb[i].parentElement.classList.add('active');
});

plus.addEventListener('click', () => {
    qty.innerHTML = Number(qty.innerHTML) + 1
});

minus.addEventListener('click', () => {
    if(Number(qty.innerHTML) > 0) {
        qty.innerHTML = Number(qty.innerHTML) - 1
    }
});

function cartDelete() {
    cartBody.innerHTML = `
        <div class="cart-empty"><p>Your cart is empty</p></div>
    `;
    qtyBadge.style.display = 'none';
    qty.innerHTML = 0;
    localStorage.removeItem('cart');
};

addCart.addEventListener('click', () => {
    if(!Number(qty.innerHTML) == 0) {
        var data = {name: 'Fall Limited Edition Sneakers', price: 125.00, qty: Number(qty.innerHTML)};
        localStorage.setItem('cart', JSON.stringify(data));
        var val = JSON.parse(localStorage.getItem('cart'));
        cartBody.innerHTML = `
            <div class="row">
                <img src="images/image-product-1-thumbnail.jpg" alt="">
                <div class="text">
                <p>${val.name}</p>
                <p>$${val.price} x ${val.qty} <span class="bold">$${Number(val.price)*Number(val.qty)}</span></p>
                </div>
                <div class="icon">
                <img src="images/icon-delete.svg" onclick='cartDelete()' alt="">
                </div>
            </div>
            <button id="primary-button" class="cart">Checkout</button>
        `;
        qtyBadge.innerHTML = val.qty;
        qtyBadge.style.display = 'inline';
    }
});

window.addEventListener('load', () => {
    if(localStorage.getItem('cart')) {
        var val = JSON.parse(localStorage.getItem('cart'));
        cartBody.innerHTML = `
            <div class="row">
                <img src="images/image-product-1-thumbnail.jpg" alt="">
                <div class="text">
                <p>${val.name}</p>
                <p>$${val.price} x ${val.qty} <span class="bold">&nbsp;&nbsp;&nbsp;&nbsp;$${Number(val.price)*Number(val.qty)}</span></p>
                </div>
                <div class="icon">
                <img src="images/icon-delete.svg" onclick='cartDelete()' alt="">
                </div>
            </div>
            <button id="primary-button" class="cart">Checkout</button>
        `;
        qtyBadge.innerHTML = val.qty;
        qtyBadge.style.display = 'inline';
        qty.innerHTML = val.qty;
    }
});