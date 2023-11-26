const loadData = async() => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    showData(data.data.tools);
}

const showData = tools => {
    const contentSection = document.getElementById("content-container");
    const fewTools = tools.slice(0, 6);
    fewTools.forEach(tools => {
        console.log(tools)
    });
}

loadData();