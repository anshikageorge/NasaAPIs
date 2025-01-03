// script.js

const apiKey = "NYbIiYGQapTGLzra43hXuzXNeCIInYNgYsKeQROs"; // Replace with your NASA API key
const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");
const resultsSection = document.getElementById("results");

searchButton.addEventListener("click", () => {
  const query = searchBar.value.trim();
  if (query) {
    fetchData(query);
  } else {
    alert("Please enter a valid query!");
  }
});

async function fetchData(query) {
  const apiUrl = `https://images-api.nasa.gov/search?q=${query}`;
  resultsSection.innerHTML = "<p>Loading...</p>";

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayResults(data.collection.items);
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsSection.innerHTML = "<p>Error fetching data. Please try again.</p>";
  }
}

function displayResults(items) {
  resultsSection.innerHTML = ""; // Clear previous results
  if (items.length === 0) {
    resultsSection.innerHTML = "<p>No results found.</p>";
    return;
  }

  items.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    const title = item.data[0]?.title || "No Title Available";
    const description = item.data[0]?.description || "No Description Available";
    const imageUrl = item.links?.[0]?.href || "https://via.placeholder.com/300";

    card.innerHTML = `
      <img src="${imageUrl}" alt="${title}" />
      <h3>${title}</h3>
      <p>${description}</p>
    `;

    resultsSection.appendChild(card);
  });
}
