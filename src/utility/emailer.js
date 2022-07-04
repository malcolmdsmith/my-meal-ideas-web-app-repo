import emailjs from "emailjs-com";
import { getCurrentUser } from "../services/authService";

emailjs.init("user_U2Xe84x6ztNh4npbBKsk2");

export function SendEmail(recipeTitle) {
  const user = getCurrentUser();

  const templateParams = {
    to_name: "Malcolm",
    from_name: user.username,
    message: "New recipe added '" + recipeTitle + "'",
  };

  emailjs.send("service_aa7pljl", "template_bteud9w", templateParams).then(
    function (response) {
      console.info("Email sent successfully");
    },
    function (error) {
      console.info("Email failed...", error);
    }
  );
}
