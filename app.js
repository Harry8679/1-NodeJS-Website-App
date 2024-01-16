const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 4000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    console.log('__dirname', __dirname);
    res.render('index', { title: 'Welcome' });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/contact/send', (req, res) => {
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'emarhdureal@gmail.com',
            pass: 'Davidvilla7'
        }
    });

    let mailOptions = {
        from: 'Ebang Mezui <emarhdureal@gmail.com>',
        to: 'rudolph.ebang@gmail.com',
        subject: 'Website submission',
        text: 'You have a submission with the folowing details... Name: ' +req.body.name + ' Email: ' + req.body.email + ' Message: ' + req.body.message,
        html: '<p>You have a submission with the folowing details...'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.redirect('/');
        } else {
            console.log('Message Sent: ' + info.response);
        }
    });

});

app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});