function sendMail(event){
    event.preventDefault(); // stop page reload
    let params = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
        
    };

    emailjs.send("service_xvq8ogg", "template_ova583j", params)
      .then(function(response) {
          alert("Email sent successfully!");
      }, function(error) {
          alert("Failed to send email: " + JSON.stringify(error));
      });
}

