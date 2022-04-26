// Focus div based on nav button click
const home = document.getElementById("homenav");
home.addEventListener("click", activateHome);
function activateHome() {
    document.getElementById("home").className = "active";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}

const single = document.getElementById("singlenav");
single.addEventListener("click", activateSingle);
function activateSingle() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "active";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "hidden";
}

const multi = document.getElementById("multinav");
multi.addEventListener("click", activateMulti);
function activateMulti() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "active";
    document.getElementById("guess").className = "hidden";
}

const guess = document.getElementById("guessnav");
guess.addEventListener("click", activateGuess);
function activateGuess() {
    document.getElementById("home").className = "hidden";
    document.getElementById("single").className = "hidden";
    document.getElementById("multi").className = "hidden";
    document.getElementById("guess").className = "active";
}

// Flip one coin and show coin image to match result when button clicked
const coin = document.getElementById("coin");
coin.addEventListener("click", flipCoin)
function flipCoin() {
    const request = 'http://localhost:5000/app/flip'
    fetch(request)
    .then(response => {return response.json()})
    .then(function (res) {
        console.log(res)
		document.getElementById("result").innerHTML = res.flip;
		document.getElementById("quarter").setAttribute("src", "./assets/img/" + res.flip+".png");
    })
}

// Flip multiple coins and show coin images in table as well as summary results
const coins = document.getElementById("submitButton")
coins.addEventListener("click", flipCoins)
async function flipCoins() {
    const endpoint = "app/flip/coins/"
	const url = document.baseURI+endpoint
    const number = document.getElementById("number").value
    try {
        const flips = await sendFlips({ url, number });
        const heads = flips.summary.heads || 0
        const tails = flips.summary.tails || 0
        document.getElementById("heads").innerHTML = "Heads: " + heads;
        document.getElementById("tails").innerHTML = "Tails: " + tails;
        const raw = flips.raw
        const ul = document.getElementById("resultList");
        const newUl = document.createElement("ul")
        for (const flip of raw) {
            let img = document.createElement("img")
            img.src = "./assets/img/" + flip + ".png"
            img.width = 25
            img.height = 25
            let li = document.createElement("li")
            li.appendChild(img)
            newUl.appendChild(li)
        }
        console.log(newUl)
        newUl.id = "resultList"
        ul.replaceWith(newUl)
    } catch (error) {
        console.log(error);
    }
}

// Create a data sender
async function sendFlips({ url, number }) {
    const numberJson = {"number": Number(number)};
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(numberJson),
      }
    const response = await fetch(url, options);
    return response.json()
}
    
// Enter number and press button to activate coin flip series

// Guess a flip by clicking either heads or tails button
