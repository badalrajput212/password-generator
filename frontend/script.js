const API_BASE = "http://localhost:9090/api/password";

async function generatePassword() {
    const data = {
        length: parseInt(document.getElementById("length").value),
        upper: document.getElementById("upper").checked,
        lower: document.getElementById("lower").checked,
        numbers: document.getElementById("numbers").checked,
        symbols: document.getElementById("symbols").checked
    };

    try {
        const response = await fetch(`${API_BASE}/generate`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        const password = result.value;

        document.getElementById("result").value = password;
        checkStrength(password);

    } catch (error) {
        alert("Server error");
        console.error(error);
    }
}
function checkStrength(password) {

    const upper = document.getElementById("upper").checked;
    const lower = document.getElementById("lower").checked;
    const numbers = document.getElementById("numbers").checked;
    const symbols = document.getElementById("symbols").checked;

    // ✅ count kitne options selected hain
    let count = 0;
    if (upper) count++;
    if (lower) count++;
    if (numbers) count++;
    if (symbols) count++;

    let strength = "";

    if (count === 4) strength = "Very Strong";
    else if (count === 3) strength = "Strong";
    else if (count === 2) strength = "Medium";
    else if (count === 1) strength = "Easy";
    else strength = "Very Weak";

    const el = document.getElementById("strength");
    el.innerText = "Strength: " + strength;

    // 🎨 color
    if (strength === "Very Strong") el.style.color = "green";
    else if (strength === "Strong") el.style.color = "blue";
    else if (strength === "Medium") el.style.color = "orange";
    else el.style.color = "red";
}
function copyPassword() {
    const input = document.getElementById("result");

    if (!input.value) {
        alert("No password!");
        return;
    }

    navigator.clipboard.writeText(input.value)
        .then(() => alert("Copied ✅"));
}
// 🔥 Background Image Slideshow
const images = [
    "images/img1.jpg",
    "images/img2.jpg",
    "images/img3.jpg",
    "images/img4.jpg",
    "images/img5.jpg",
    "images/img6.jpg",
    "images/img7.jpg",
    "images/img8.jpg",
    //"images/img9.jpg",
    "images/img10.jpg"
];

let index = 0;

function changeBackground() {
    document.body.style.backgroundImage = `url('${images[index]}')`;
    index = (index + 1) % images.length;
}

// first load
changeBackground();

// auto change every 4 seconds
setInterval(changeBackground, 4000); 