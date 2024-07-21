document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.querySelector(".menu-icon");
  const nav = document.querySelector("nav");
  const overlay = document.querySelector(".overlay");

  menuIcon.addEventListener("click", () => {
      nav.classList.toggle("open");
  });

  overlay.addEventListener("click", () => {
      nav.classList.remove("open");
  });
});

// Show and hide form popup
function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}

// Show and hide item detail popup
function openItemPopup() {
  document.getElementById("itemPopup").style.display = "block";
}

function closeItemPopup() {
  document.getElementById("itemPopup").style.display = "none";
}

// Show and hide progress update popup
function openPopupForm() {
  document.getElementById("popupForm").style.display = "block";
  document.getElementById("overlay").style.display = "block";
}

function closePopupForm() {
  document.getElementById("popupForm").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

// Function to add item
function addItem(event) {
  event.preventDefault();

  const customerName = document.getElementById("customerName").value;
  const startAddress = document.getElementById("startAddress").value;
  const deliveryAddress = document.getElementById("deliveryAddress").value;
  const fragile = document.getElementById("fragile").checked ? "Yes" : "No";
  const payment = document.getElementById("payment").checked ? "Done" : "Pending";
  const receivedDate = document.getElementById("receivedDate").value;

  const item = {
      customerName,
      startAddress,
      deliveryAddress,
      fragile,
      payment,
      receivedDate,
  };

  const mainDisplay = document.getElementById("mainDisplay");
  const div = document.createElement("div");
  div.classList.add("item");
  div.innerHTML = `
      <h3>${customerName}</h3>
      <p><strong>Starting Address:</strong> ${startAddress}</p>
      <p><strong>Delivery Address:</strong> ${deliveryAddress}</p>
      <p><strong>Fragile:</strong> ${fragile}</p>
      <p><strong>Payment:</strong> ${payment}</p>
      <p><strong>Package Received Date:</strong> ${receivedDate}</p>
      <button class="item-details-btn" onclick='viewItemDetails(${JSON.stringify(item)})'>View Details</button>
  `;
  mainDisplay.appendChild(div);

  closeForm();

  // Create a new progress bar for the added item
  const progressBarContainer = document.getElementById("progressBarContainer");
  const progressBar = document.createElement("div");
  progressBar.classList.add("progress-bar");
  progressBar.innerHTML = `
      <h3>${customerName}</h3>
      <div class="progress" id="progress-${customerName.replace(/\s/g, "-")}"></div>
      <button class="update-btn" onclick='openPopupForm()'>Update Progress</button>
  `;
  progressBarContainer.appendChild(progressBar);
}

// Function to view item details
function viewItemDetails(item) {
  const itemDetailsContent = document.getElementById("itemDetailsContent");
  itemDetailsContent.innerHTML = `
      <p><strong>Customer Name:</strong> ${item.customerName}</p>
      <p><strong>Starting Address:</strong> ${item.startAddress}</p>
      <p><strong>Delivery Address:</strong> ${item.deliveryAddress}</p>
      <p><strong>Fragile:</strong> ${item.fragile}</p>
      <p><strong>Payment:</strong> ${item.payment}</p>
      <p><strong>Package Received Date:</strong> ${item.receivedDate}</p>
  `;
  openItemPopup();
}

// Function to update the progress bar
function updateProgressBar() {
  const customerName = document.getElementById("customerName").value;
  const progressBar = document.getElementById(`progress-${customerName.replace(/\s/g, "-")}`);

  // You can add your logic here to calculate the new width based on the progress
  progressBar.style.width = "50%"; // Example: Set to 50%
  closePopupForm();
}
