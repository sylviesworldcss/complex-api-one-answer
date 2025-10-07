// pseudo code:
// I want the first api to to run the data of the open brewery DB
// I need the name of brewery, state, city, country to be displayed
// Then I want the website urls to populate in the qr generator and display the speciifc qr codes(continued on next line)
// with the above info.
// QR code is an img url not a traditional(is this true?) api key? so figure that out

//Call
const userInput = document.querySelector("#brewery");
const descriptionDiv = document.querySelector(".description");
const getBeerBtn = document.querySelector("button");
getBeerBtn.addEventListener("click", getBeer);

//API's Used and Query Params
const url = "https://api.openbrewerydb.org/v1/breweries"; //base url
const apiParam = "?by_state="; //query param we're using
const urlTwo = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&";
const apiParamTwo = "data=";

//Function
async function getBeer() {
  const userInputValue = userInput.value; //when the function runs we are entering the user input
  const apiReqUrl = url + apiParam + userInputValue;
  const options = {
    method: "GET", //passing method as a get request cause we getting info
  };
  try {
    const response = await fetch(apiReqUrl, options);
    const result = await response.json(); //taking the response processing so it's ready to use in javascript
    descriptionDiv.innerText = "";
    result.forEach((brewery) => {
      const { name, website_url, city, state, country } = brewery;
      const apiReqUrlTwo = urlTwo + apiParamTwo + website_url;
      const qrImg = document.createElement("img"); // creating elements in javascript to hold and organize the data, to explicitly specify the namespace URI for the element. https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
      const breweryCard = document.createElement("div");
      const breweryName = document.createElement("h2");
      const breweryLocation = document.createElement("p");
      const breweryWebsite = document.createElement("a");
      qrImg.src = apiReqUrlTwo;
      breweryName.innerText = name;
      breweryLocation.innerText = `${city}, ${state}, ${country}`;
      breweryWebsite.href = website_url;
      breweryWebsite.target = "_blank";

      //Appending The Cards
      breweryCard.appendChild(qrImg);
      breweryCard.appendChild(breweryName);
      breweryCard.appendChild(breweryLocation);
      breweryCard.appendChild(breweryWebsite);
      descriptionDiv.appendChild(breweryCard);
      //   fetch(apiReqUrlTwo)
      //     .then((res) => res.json())
      //     .then((apiParamTwo) => {
      //       console.log(apiParamTwo);
      //       document.querySelector("img").src = apiParamTwo.urlTwo;
      //     })
      //     .catch((error) => {
      //       console.error(error); // console.log(error) also works
      //     });
    }); // it's saying take result and for each element from result of that and do something in line 30

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

//SOURCES
//Worked on with Maureen Zitouni RC 2025B and used weather app I worked on with Ryan Hernandez-French RC Alum as template, google gemini debugging aid
//referenced @Leon Noel Lecture, @mdn @dcode https://www.youtube.com/watch?v=X6MFUagtKiQ
