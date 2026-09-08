const API_URL =
    "https://script.google.com/macros/s/AKfycbwbimrQ3PRnSyp2RlaJ1uxJT9OZQeDr42KZpmk9Va6Y78MDgRGwlj1jdkh1rH9pVP5vLA/exec";
    



const blessingForm = document.getElementById("blessingForm");
const result = document.getElementById("result");
const blessingText = document.getElementById("blessingText");
const againButton = document.getElementById("againButton");
const languageSelect = document.getElementById("language");


// ========================================
// Generate Bappa Blessing
// ========================================

blessingForm.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Get user's information

    const name =
        document.getElementById("name").value.trim();

    const wish =
        document.getElementById("wish").value.trim();

    const mood =
        document.getElementById("mood").value;

    const category =
        document.getElementById("category").value;

    const language =
        languageSelect.value;


    // Show result card

    result.classList.remove("hidden");


    // Language-specific loading message

    if (language === "mr") {

        blessingText.innerText =
            "🪔 बाप्पा तुमच्यासाठी एक खास आशीर्वाद तयार करत आहेत...";

    } else {

        blessingText.innerText =
            "🪔 Bappa is preparing a special blessing for you...";

    }


    try {

        const response = await fetch(API_URL, {

            method: "POST",

            headers: {

                "Content-Type":
                    "text/plain;charset=utf-8"

            },

            body: JSON.stringify({

                name: name,

                wish: wish,

                mood: mood,

                category: category,

                language: language

            })

        });


        const data =
            await response.json();


       

// Debug information
console.log("Language selected:", language);
console.log("Language received by backend:", data.languageReceived);

        // Check backend response

        if (!data.success) {

            throw new Error(
                data.error ||
                "Something went wrong."
            );

        }


        // Display AI blessing

        blessingText.innerText =
            data.blessing;


        // Restart blessing animation

        blessingText.style.animation = "none";

        void blessingText.offsetWidth;

        blessingText.style.animation =
            "blessingAppear 0.8s ease";


        // Scroll to blessing

        result.scrollIntoView({

            behavior: "smooth"

        });


    } catch (error) {

        console.error(error);


        blessingText.innerText =
            "Error: " + error.message;

    }

});


// ========================================
// Generate Again
// ========================================

againButton.addEventListener(
    "click",
    function () {

        blessingForm.dispatchEvent(
            new Event("submit")
        );

    }
);