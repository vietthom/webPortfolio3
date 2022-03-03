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
        host: 'smtp-mail.gmail.com',
        port: 587,
        auth: {
            user: 'thomle0418@gmail.com', 
            pass: 'Mino_1234*'
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: 'thomle0418@gmail.com', 
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
})

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})