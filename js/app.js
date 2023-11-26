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
    `;
    tools.features.forEach((feature) => {
      const li = document.createElement("li");
      li.classList.add("list-decimal");
      li.innerText = feature ? feature : "no data found";
      postDiv.appendChild(li);
    });
    contentSection.appendChild(postDiv);

    const lowerContent = document.getElementById("lower-content");
    lowerContent.innerHTML = `
        <h3>${tools.name}</h3>
    `;
  });
};

loadData();
