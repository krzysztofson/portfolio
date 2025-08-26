// reCAPTCHA v3 Form submission with better error handling
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitBtn = document.getElementById("submit-btn");

  console.log("Form loaded, checking reCAPTCHA...");

  // Check if reCAPTCHA loaded properly
  if (typeof grecaptcha === "undefined") {
    console.error("reCAPTCHA not loaded!");
    return;
  }

  if (form && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Disable submit button to prevent multiple submissions
      submitBtn.disabled = true;
      submitBtn.textContent = "Verifying...";

      console.log("Starting reCAPTCHA verification...");

      // Execute reCAPTCHA v3
      grecaptcha.ready(function () {
        console.log("reCAPTCHA ready, executing...");

        grecaptcha
          .execute("6Lf44bIrAAAAAIJrQpMVCfwYoi7r91MrWke92-zw", {
            action: "contact_form",
          })
          .then(function (token) {
            console.log(
              "reCAPTCHA token received:",
              token.substring(0, 20) + "..."
            );

            // Add the token to the form
            const tokenInput = document.createElement("input");
            tokenInput.type = "hidden";
            tokenInput.name = "g-recaptcha-response";
            tokenInput.value = token;
            form.appendChild(tokenInput);

            // Submit the form
            console.log("Submitting form...");
            form.submit();
          })
          .catch(function (error) {
            console.error("reCAPTCHA error:", error);
            alert("reCAPTCHA verification failed: " + error.message);

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = "Send";
          });
      });
    });
  }
});
