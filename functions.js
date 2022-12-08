const createCard = (data, parent, arr) => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = data.id;

    const age = document.createElement("div");
    age.className = "age";
    age.innerHTML = data.age || 0;

    const rate = document.createElement("div");
    rate.className = "rate"
    rate.innerHTML = "<span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>"

    const pic = document.createElement("div");
    pic.className = "pic";
    pic.style.backgroundImage = `url(${data.img_link || "http://pm1.narvii.com/7124/01a9db03cb0dc8a015170db3aedd0e2f67a21a48r1-1080-1080v2_uhq.jpg"})`;

    const name = document.createElement("div");
    name.className = "name"
    name.innerText = data.name

    card.append(pic, age, rate, name);
    card.addEventListener("click", function(){
        showPopup(arr, "card");
    });
    parent.append(card)
}

let showPopup = (list, type, content) => {
    let el = list.filter(el => el.dataset.type === type)[0];
    el.classList.add("active");
    el.parentElement.classList.add("active");
}

const addCat = (e, api, popupList, store) => {
    e.preventDefault();
    let body = {}
    for (let i = 0; i < e.target.elements.length; i++) {
        let el = e.target.elements[i];
        if (el.name) {
            if (el.type === "checkbox") {
                body[el.name] = el.checked;
            } else if (el.value) {
                body[el.name] = el.value;
            }
        }
    }
    console.log(body)
    api.addCat(body)
        .then(res => res.json())
        .then(data => {
            console.log(data.message);
            if (data.message === "ok") {
                createCard(body, document.querySelector(".container"));
                store.push(body);
                localStorage.setItem("cats", JSON.stringify(store));
                e.target.reset();
                document.querySelector("popup-wrapper").classList.remove("active");
            }
            showPopup(popupList, "info", data.message )
        })
}
