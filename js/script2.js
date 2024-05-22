    document.getElementById('productForm').addEventListener('submit', function(event) {
    event.preventDefault();/*Bu kısım, form gönderildiğinde sayfanın yenilenmesini durdurur. Böylece bilgileri  kaybetmeyiz.*/
    
    const name = document.getElementById('productName').value;/*Burada, formdaki ürün adı, fiyat, miktar ve*/
    const price = parseFloat(document.getElementById('productPrice').value);   /*vergi oranı bilgilerini alıyoruz.*/
    const quantity = parseInt(document.getElementById('productQuantity').value);
    const taxRate = parseFloat(document.getElementById('taxRate').value);

    // Ürün kartını ekle
    const productCards = document.getElementById('productCards');/*Bu kısım, sayfada ürünü göstermek için bir kart */
    const card = document.createElement('div');                  /*oluşturur ve bunu ürün kartları listesine ekler.*/
    card.className = 'col-md-4 col-lg-4 product-card';
    card.innerHTML = `
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h3 class="card-title ms-0">${name}</h3>
                <h4 class="card-text">$${price}</h4>
                <h4 class="card-text">Quantity: ${quantity}</h4>
                <h4 class="card-text">Tax Rate: ${taxRate}%</h4>
            </div>
        </div>
    `;
    productCards.appendChild(card);

    // Sepet tablosuna ekle
    const cartTableBody = document.getElementById('cartTableBody');/*Bu kısım, sepet tablosuna yeni bir satır ekler. */
    const totalPrice = (price * quantity) * (1 + taxRate / 100);/*Satırda ürün adı, fiyat, miktar, toplam fiyat ve kaldırma butonu bulunur.*/
    const row = document.createElement('tr');
    row.className = 'tr mb-4';
    row.innerHTML = `
               
        <td><h3 class="item-name ms-3 me-3">${name}</h3></td>
        <td class="uk-text-truncate item-price"><h3 class="price me-4">$${price}</h3></td>
        <td><input type="number" class="num" value="${quantity}" min="1"></td>
        <td class="uk-text-truncate total-price"><h3>$${totalPrice.toFixed(2)}</h3></td>
        <td><button class="uk-button uk-button-danger remove-btn ms-3 " type="button">Remove</button></td>
    `;
    cartTableBody.appendChild(row);

    // Kartı ve satırı eşle
    row.cardElement = card;

    // Remove butonuna tıklama olayı ekle
    row.querySelector('.remove-btn').addEventListener('click', function() {
        row.remove();
        card.remove();
        calculateGrandTotal();
    });

    // Miktar değiştiğinde fiyatı güncelle
    row.querySelector('.num').addEventListener('input', function() {
        updateTotalPrice(row, price, taxRate);
        calculateGrandTotal();
    });

    // Grand Total hesapla
    calculateGrandTotal();
});

function updateTotalPrice(row, price, taxRate) {
    const quantity = parseInt(row.querySelector('.num').value);
    const totalPrice = (price * quantity) * (1 + taxRate / 100);
    row.querySelector('.total-price h3').textContent = `$${totalPrice.toFixed(2)}`;
}

function calculateGrandTotal() {
    let grandTotal = 0;
    document.querySelectorAll('.total-price h3').forEach(function(priceElement) {
        grandTotal += parseFloat(priceElement.textContent.replace('$', ''));
    });
    document.querySelector('.grand-total h3').textContent = `$${grandTotal.toFixed(2)}`;
}