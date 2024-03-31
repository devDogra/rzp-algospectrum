const express = require('express'); 
const Razorpay = require('razorpay'); 
const cors = require('cors'); 
const { v4: uuid } = require('uuid'); 

const app = express();
app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded()); 

var rzp = new Razorpay({
    key_id: 'rzp_test_IVyiBdj0ItgECq',
    key_secret: 'wFGR0gEpSqwZ4YetTCmiWehX',
});


function createOrder(amount) {
    var orderDetails = {
      amount,  
      currency: "INR",
      receipt: "order_receipt_" + Math.floor(Math.random() * 10)
    };
    
    return rzp.orders.create(orderDetails)
}

app.post('/orders', (req, res) => {
    console.log('POST /orders')
    createOrder(req.body.amount).then(order => {
        res.send(order); 
    }).catch(console.log)
    // res.send("HU"); 
})

// app.get('/orders', (req, res) => {
//     rzp.orders.all().then(res => {
//         res.send(res);  
//     })
// })
app.get('/orders', (req, res) => {
    rzp.orders.all().then(order => {
        res.send(order); 
    }).catch(x => res.send("BU")); 
})

app.post('/paymentResponse', (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    console.log('receiving pymt response at server...'); 
    console.log('now verifying authenticity of payment response so we know that the payment was ACTUALLY completed and this response is not fake shit....'); 

    res.send({ msg: "verified"})

    // var { validatePaymentVerification, validateWebhookSignature } = require('./dist/utils/razorpay-utils');

    // validatePaymentVerification({"order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, signature, secret);


})


app.listen(3000, () => console.log("http://localhost:3000")); 


