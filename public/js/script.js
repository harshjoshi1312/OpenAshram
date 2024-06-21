// const { options } = require("joi");

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//rating
//toggle for text
let text = document.getElementById("flexSwitchCheckDefault");
let textInfo = document.getElementsByClassName("text-info");
text.addEventListener("click", () => {
  for (info of textInfo) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});

let text1 = document.getElementById("textgst");
let textInfo1 = document.getElementsByClassName("text-info");
text1.addEventListener("click", () => {
  for (info of textInfo1) {
    if (info.style.display != "inline") {
      info.style.display = "inline";
    } else {
      info.style.display = "none";
    }
  }
});

//for icons
const clickableDivs = document.querySelectorAll(".filter");
clickableDivs.forEach(function (div) {
  div.addEventListener("click", function () {
    const icons = div.innerText;
    document.querySelector(".icons").value = icons;
    document.getElementById("myForm").submit();
  });
});
