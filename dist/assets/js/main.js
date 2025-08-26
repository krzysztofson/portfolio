// reCAPTCHA v3 Form submission
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const submitBtn = document.getElementById("submit-btn");

  console.log("Form loaded, initializing reCAPTCHA v3...");

  if (form && submitBtn) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Disable submit button to prevent multiple submissions
      submitBtn.disabled = true;
      submitBtn.textContent = "Verifying...";

      console.log("Starting reCAPTCHA v3 verification...");

      // Execute reCAPTCHA v3
      grecaptcha.ready(function () {
        console.log("reCAPTCHA ready, executing...");

        grecaptcha
          .execute("6Lf44bIrAAAAAIJrQpMVCfwYoi7r91MrWke92-zw", {
            action: "submit_contact_form",
          })
          .then(function (token) {
            console.log(
              "reCAPTCHA token received:",
              token.substring(0, 20) + "..."
            );

            // Add the token to the form
            let tokenInput = form.querySelector('input[name="g-recaptcha-response"]');
            if (!tokenInput) {
              tokenInput = document.createElement("input");
              tokenInput.type = "hidden";
              tokenInput.name = "g-recaptcha-response";
              form.appendChild(tokenInput);
            }
            tokenInput.value = token;

            // Submit the form
            console.log("Submitting form...");
            form.submit();
          })
          .catch(function (error) {
            console.error("reCAPTCHA error:", error);
            alert("reCAPTCHA verification failed. Please try again.");

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = "Send";
          });
      });
    });
  }
});
