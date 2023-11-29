const loadData = async (dataLimit) => {
  loader(true);
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    showData(data.data.tools, dataLimit);

  } catch (err) {
    console.log(err);
  }
};
// date sorting
const sortDate = (tools, dataLimit) => {
  const contentSection = document.getElementById("content-container");
  contentSection.innerHTML = "";
  const showAll = document.getElementById("show-all");
  const arr = tools.map((tool) => {
    return { ...tool, published_in: new Date(tool.published_in) };
  });
  // console.log(arr)
  const sortAsc = arr.sort((a, b) => Number(a.published_in) - b.published_in);
  console.log(sortAsc);
  // if (dataLimit && sortAsc.length > 6) {
  //   sortAsc = sortAsc.slice(0, 6);
  //   showAll.classList.remove("hidden");
  // } else {
  //   showAll.classList.add("hidden");
  // }
  sortAsc.forEach((sortAsce) => {
    // console.log(tools);
    // date formatting
    const date = sortAsce.published_in;
    // console.log(date)
    const day = date.getDate();
    // console.log(day); // 23
    const month = date.getMonth();
    // console.log(month + 1); // 23
    const year = date.getFullYear();
    // console.log(year); // 23

    const format1 = month + "/" + day + "/" + year;
    // [month, day, year] = date.split(" ");
    // const newDate = [day, month, year];
    // const newFormat = newDate.join("/");

    const postDiv = document.createElement("div");

    postDiv.classList.add("p-5", "border", "rounded-lg");
    postDiv.innerHTML = `
        <img class="h-72 w-96 rounded-lg" src="${
          sortAsce.image ? sortAsce.image : "no picture found"
        }" alt="${sortAsce.name}">
        <h3 class="text-xl font-bold my-5 uppercase">Features</h3>
        <li class="list-decimal">${sortAsce.features[0]}</li>
        <li class="list-decimal">${sortAsce.features[1]}</li>
        <li class="list-decimal">${
          sortAsce.features[2] ? sortAsce.features[2] : "Text generation"
        }</li>
        <hr class="my-5">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-xl font-bold">${sortAsce.name}</h3>
                <p class="flex items-center my-3"><span class="material-symbols-outlined mr-2">
                calendar_month
                </span>${format1}</p>
            </div>
            <div>
                <span onclick="handleModal('${
                  sortAsce.id
                }')" class="material-symbols-outlined text-green-700 cursor-pointer">
                arrow_forward
                </span>
            </div>
        </div>
    `;
    contentSection.appendChild(postDiv);
    loader(false);
  });
};



const showData = (tools, dataLimit) => {
  // console.log(tools);
  
  const contentSection = document.getElementById("content-container");
  contentSection.innerHTML = "";
  const showAll = document.getElementById("show-all");

  document.getElementById("sort-date").addEventListener("click", function(){
    sortDate(tools, dataLimit)
  })

  if (dataLimit && tools.length > 6) {
    tools = tools.slice(0, 6);
    showAll.classList.remove("hidden");
  } else {
    showAll.classList.add("hidden");
  }
  tools.forEach((tool) => {
    // console.log(tools);
    // date formatting
    const date = tool.published_in;
    [month, day, year] = date.split("/");
    const newDate = [day, month, year];
    const newFormat = newDate.join("/");

    const postDiv = document.createElement("div");

    postDiv.classList.add("p-5", "border", "rounded-lg");
    postDiv.innerHTML = `
        <img class="h-72 w-96 rounded-lg" src="${
          tool.image ? tool.image : "no picture found"
        }" alt="${tool.name}">
        <h3 class="text-xl font-bold my-5 uppercase">Features</h3>
        <li class="list-decimal">${tool.features[0]}</li>
        <li class="list-decimal">${tool.features[1]}</li>
        <li class="list-decimal">${
          tool.features[2] ? tool.features[2] : "Text generation"
        }</li>
        <hr class="my-5">
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-xl font-bold">${tool.name}</h3>
                <p class="flex items-center my-3"><span class="material-symbols-outlined mr-2">
                calendar_month
                </span>${newFormat}</p>
            </div>
            <div>
                <span onclick="handleModal('${
                  tool.id
                }')" class="material-symbols-outlined text-green-700 cursor-pointer">
                arrow_forward
                </span>
            </div>
        </div>
    `;
    contentSection.appendChild(postDiv);
    loader(false);
  });
};

const handleModal = async (id) => {
  loader(true);
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  showModal(data.data);
};

const showModal = (infos) => {
  // console.log(infos);
  // pricing split
  const contactUs = infos.pricing[2].price.split(" ")
    ? infos.pricing[2].price.split(" ")
    : " ";
  const plan = infos.pricing[2].plan.split(" ");
  // console.log(contactUs[0]+ " " + contactUs[1])

  const divModal = document.getElementById("show-modal");
  divModal.innerHTML = "";
  divModal.classList.remove("hidden");
  const gridDiv = document.createElement("div");
  gridDiv.classList.add(
    "grid",
    "grid-cols-1",
    "gap-10",
    "md:grid-cols-2",
    "bg-white",
    "rounded",
    "shadow-lg",
    "md:p-10",
    "w-9/12",
    "relative"
  );
  gridDiv.innerHTML = `
        <div class=" absolute top-0 right-0">
        <span id="close-modal" class="material-symbols-outlined text-red-700 cursor-pointer bg-red-100 rounded text-4xl font-bold">
        close
        </span>
      </div>
    <div class="md:p-10 border-2 border-pink-400 rounded-lg bg-pink-100/50">
    
        <h3 class="text-3xl font-bold">${infos.description}</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 my-5 gap-10 text-xl font-medium">
            <div class="text-center bg-white p-5 rounded-lg text-green-500">
                <h3>${infos.pricing[0].price}</h3>
                <h3>${infos.pricing[0].plan}</h3>
            </div>
            <div class="text-center bg-white p-5 rounded-lg text-amber-500">
                <h3>${infos.pricing[1].price}</h3>
                <h3>${infos.pricing[1].plan}</h3>
            </div>
            <div class="text-center bg-white p-5 rounded-lg text-pink-500">
                <h3>${contactUs ? contactUs[0] + " " + contactUs[1] : " "}</h3>
                <h3>${plan[0]}</h3>
            </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
                <h3 class="text-2xl font-medium my-3">Features</h3>
                <li>${
                  infos.features[1].feature_name
                    ? infos.features[1].feature_name
                    : "no data found"
                }</li>
                <li>${
                  infos.features[2].feature_name
                    ? infos.features[2].feature_name
                    : "no data found"
                }</li>
                <li>${
                  infos.features[3].feature_name
                    ? infos.features[3].feature_name
                    : "no data found"
                }</li>
            </div>
            <div>
                <h3 class="text-2xl font-medium my-3">Integrations</h3>
                <li>${
                  infos.integrations ? infos.integrations[0] : "no data found"
                }</li>
                <li>${
                  infos.integrations[1]
                    ? infos.integrations[1]
                    : "no data found"
                }</li>
                <li>${
                  infos.integrations[2]
                    ? infos.integrations[2]
                    : "no data found"
                }</li>
            </div>
        </div>
    </div>
    <div class="text-center p-10 border rounded-lg">
      <img class=" rounded-lg" src="${
        infos.image_link[0] ? infos.image_link[0] : "no picture found"
      }" alt="">
      <h3 class="text-4xl font-bold my-2">${
        infos.input_output_examples[0].input
          ? infos.input_output_examples[0].input
          : "no data found"
      }</h3>
      <p class="text-xl">${
        infos.input_output_examples[0].output
          ? infos.input_output_examples[0].output
          : "no data found"
      }</p>
    </div>
    `;
  divModal.appendChild(gridDiv);

  document.getElementById("close-modal").addEventListener("click", function () {
    const modal = document.getElementById("show-modal");
    modal.classList.add("hidden");
  });
  loader(false);
};

document.getElementById("btn-show-all").addEventListener("click", function () {
  loader(true);
  loadData();
});

const loader = (isLoading) => {
  const loaderSection = document.getElementById("loader");
  if (isLoading) {
    loaderSection.classList.remove("hidden");
  } else {
    loaderSection.classList.add("hidden");
  }
};

loadData(6);
