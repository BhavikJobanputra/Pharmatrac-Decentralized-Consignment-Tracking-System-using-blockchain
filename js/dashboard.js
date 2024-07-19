const navBar = document.querySelector("nav"),
  menuBtns = document.querySelectorAll(".menu-icon"),
  overlay = document.querySelector(".overlay");
menuBtns.forEach((menuBtn) => {
  menuBtn.addEventListener("click", () => {
    navBar.classList.toggle("open");
  });
});
overlay.addEventListener("click", () => {
  navBar.classList.remove("open");
});
let itemCount = 0;

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

function addItem(event) {
  event.preventDefault();

  // Get form values
  const customerName = document.getElementById("customerName").value;
  const startAddress = document.getElementById("startAddress").value;
  const deliveryAddress = document.getElementById("deliveryAddress").value;
  const fragile = document.getElementById("fragile").checked ? 'Yes' : 'No';
  const payment = document.getElementById("payment").checked ? 'Yes' : 'No';
  const receivedDate = new Date(document.getElementById("receivedDate").value);
  const estimatedDate = new Date(receivedDate);
  estimatedDate.setDate(receivedDate.getDate() + 30);
  const estimatedDateStr = estimatedDate.toISOString().split('T')[0];

  // Create new item element with generated order ID
  itemCount++;
  const orderId = ('0' + itemCount).slice(-2);
  const newItem = document.createElement("div");
  newItem.classList.add("item");
  newItem.setAttribute('data-order-id', orderId);
  newItem.setAttribute('onclick', `showItemDetails(${orderId})`);
  newItem.innerHTML = `
             <p><b>Order ID:</b> ${orderId}</p>
             <p><b>Customer Name:</b> ${customerName}</p>
             <p><b>Starting Address:</b> ${startAddress}</p>
             <p><b>Delivery Address:</b> ${deliveryAddress}</p>
         `;

  // Store item details in a dataset attribute
  newItem.dataset.details = JSON.stringify({
    customerName,
    startAddress,
    deliveryAddress,
    fragile,
    payment,
    receivedDate: receivedDate.toISOString().split('T')[0],
    estimatedDate: estimatedDateStr
  });

  // Add new item to the main display
  document.getElementById("mainDisplay").appendChild(newItem);

  // Close the form
  closeForm();
}

function showItemDetails(orderId) {
  const item = document.querySelector(`.item[data-order-id="${orderId}"]`);
  const details = JSON.parse(item.dataset.details);

  // Populate item details content
  document.getElementById("itemDetailsContent").innerHTML = `
             <p><b>Order ID:</b> ${orderId}</p>
             <p><b>Customer Name:</b> ${details.customerName}</p>
             <p><b>Starting Address:</b> ${details.startAddress}</p>
             <p><b>Delivery Address:</b> ${details.deliveryAddress}</p>
             <p><b>Fragile:</b> ${details.fragile}</p>
             <p><b>Payment:</b> ${details.payment}</p>
             <p><b>Package Received Date:</b> ${details.receivedDate}</p>
             <p><b>Estimated Delivery Date:</b> ${details.estimatedDate}</p>
         `;

  // Display item details popup
  document.getElementById("itemPopup").style.display = "block";
}

function closeItemPopup() {
  document.getElementById("itemPopup").style.display = "none";
}

// Event listener to update estimated delivery date on received date change
document.getElementById("receivedDate").addEventListener("change", function () {
  const receivedDate = new Date(this.value);
  const estimatedDate = new Date(receivedDate);
  estimatedDate.setDate(receivedDate.getDate() + 30);
  document.getElementById("estimatedDate").innerText = estimatedDate.toISOString().split('T')[0];
}); 
document.getElementById('updateButton').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'block';
  document.getElementById('popupForm').style.display = 'block';
});

document.getElementById('overlay').addEventListener('click', function() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('popupForm').style.display = 'none';
});

document.getElementById('confirmButton').addEventListener('click', function() {
  const selectedStatus = document.querySelector('input[name="status"]:checked');
  if (selectedStatus) {
      const progress = selectedStatus.value;
      document.getElementById('progressBarFill').style.width = progress + '%';
      alert('Status confirmed: ' + selectedStatus.value + '%');
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('popupForm').style.display = 'none';
  } else {
      alert('Please select a status');
  }
});

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}


function closeItemPopup() {
  document.getElementById("itemPopup").style.display = "none";
}
