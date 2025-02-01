import nodemailer from 'nodemailer'

const sendEmail = async (sendto ) => {
    try {
        console.log(sendto)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'farhansahabzada3@gmail.com',
                pass: process.env.GOOGLE_APP_PASSWORD
            }
        });

        var mailOptions = {
            from: 'farhansahabzada3@gmail.com',
            to: sendto,
            subject: 'Thank You For Registering Our Seeker Program',
            text: `Dear User,
Thank you for registering with our department. We have received your request, and our team will review it. 
You can expect a response within 2 to 3 weeks.

Best regards,  
[Saylani Welfare Trust]`

        };

        const email = await transporter.sendMail(mailOptions)
        console.log("emai send", email.response)
    } catch (error) {
        console.log("error when sending the email", error)
    }
}
export default sendEmail;