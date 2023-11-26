const loadData = async () => {
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    showData(data.data.tools);
  } catch (err) {
    console.log(err);
  }
};

const showData = (tools) => {
  const contentSection = document.getElementById("content-container");
  const fewTools = tools.slice(0, 6);
  fewTools.forEach((tools) => {
    console.log(tools);
    const postDiv = document.createElement("div");

    postDiv.classList.add("p-5", "border", "rounded-lg");
    postDiv.innerHTML = `
        <img class="h-72 w-96 rounded-lg" src="${tools?.image}" alt="${tools.name}">
        <h3 class="text-xl font-bold my-5 uppercase">Features</h3>
        <li class="list-decimal">${tools.features[0]}</li>
        <li class="list-decimal">${tools.features[1]}</li>
        <li class="list-decimal">${tools.features[2]}</li>
        <hr class="my-5">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-xl font-bold">${tools.name}</h3>
                <p class="flex items-center my-3"><span class="material-symbols-outlined mr-2">
                calendar_month
                </span>${tools.published_in}</p>
            </div>
            <div>
                <span class="material-symbols-outlined text-green-700">
                arrow_forward
                </span>
            </div>
        </div>
    `;
    
    contentSection.appendChild(postDiv);
  });
};

loadData();
