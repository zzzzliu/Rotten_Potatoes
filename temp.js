var nodemailer = require("nodemailer");

// configure SMTP
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "rotten.potatoes.movie.review",
        pass: "rottenPotatoesAdmin!"
    }
});

rand=Math.floor((Math.random() * 100) + 54);
link="http://localhost/verify?id="+rand;
mailOptions={
    to : "liu.hongz@husky.neu.edu",
    subject : "Please confirm your Email account",
    html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
};
console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }
});