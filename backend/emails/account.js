const sgMail = require('@sendgrid/mail')

// Set up API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'saralukkai@gmail.com',
        subject: 'Thank you for joinging in',
        text: `Welcome, ${name}. et me know how you get along with the app`
    })
}

const sendCancelationEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'saralukkai@gmail.com',
        subject: 'Sorry to see you go',
        text: `Goodbye ${name}. Hope to see you back sometime soon`
    })
}

module.exports = {
    sendWelcomeEmail, sendCancelationEmail
}