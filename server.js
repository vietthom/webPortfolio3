const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.static('public'));
app.use(express.json());


app.get('/', (req, res) => {
    res.send(__dirname + '/public/index.html');
})

app.post('/', (req, res) => {
    console.log(req.body);
    
    const transporter = nodemailer.createTransport({
        service:  'outlook',
        port: 587,
        logger: true,
        debug: true,
        secure: false,
        auth: {
            user: 'vietthom@outlook.com', 
            pass: 'Mino_1234*', 
        },
        tls:{
            rejectUnauthorized: true,
        },
    });
    const mailOptions = {
        from: req.body.email,
        to: 'vietthom@outlook.com', 
        subject: `Message from ${req.body.email}: ${req.body.subject}`, 
        text: req.body.message
    }
    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent' + info.response);
            res.send('success');
        }
    })
});

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})