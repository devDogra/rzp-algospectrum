import axios from "axios"; 

// var options = {
//   "key": "rzp_test_IVyiBdj0ItgECq", // Enter the Key ID generated from the Dashboard
//   "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
//   "currency": "INR",
//   "name": "Acme Corp",
//   "description": "Test Transaction",
//   "image": "https://example.com/your_logo",
//   "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
//   "handler": function (response){
//       alert(response.razorpay_payment_id);
//       alert(response.razorpay_order_id);
//       alert(response.razorpay_signature)
//   },
//   "prefill": {
//       "name": "Gaurav Kumar",
//       "email": "gaurav.kumar@example.com",
//       "contact": "9000090000"
//   },
//   "notes": {
//       "address": "Razorpay Corporate Office"
//   },
//   "theme": {
//       "color": "#3399cc"
//   }
// };
// var rzp1 = new Razorpay(options);
// rzp1.on('payment.failed', function (response){
//       alert(response.error.code);
//       alert(response.error.description);
//       alert(response.error.source);
//       alert(response.error.step);
//       alert(response.error.reason);
//       alert(response.error.metadata.order_id);
//       alert(response.error.metadata.payment_id);
// });
// document.getElementById('rzp-button1').onclick = function(e){
//   rzp1.open();
//   e.preventDefault();
// }

function App() {

  // const api = "https://api.razorpay.com/v1"; 
  const api = "http://localhost:3000"; 

  function placeOrder(e) {
    e.preventDefault();

    console.log("placing order")
    
    const amt = parseInt(document.getElementById("money").value); 
    
    axios.post(api + "/orders", { amount: amt }).then(res => {

      console.log(res); 
      console.log("order created, initiating trnsctn process")
      var options = {
        "key_id": "rzp_test_IVyiBdj0ItgECq", 
        "amount": `${amt}`, 
        "currency": "INR",
        "name": "Dev Aryan Dogra Corp",
        "description": "Test Transaction",
        "image": "https://st.depositphotos.com/2274151/4841/i/450/depositphotos_48410095-stock-photo-sample-blue-square-grungy-stamp.jpg",
        "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            alert(response.razorpay_payment_id);
            alert(response.razorpay_order_id);
            alert(response.razorpay_signature)

            // axios.post('/paymentResponse', response).then(r => {
            //   alert(r.msg); 
            // })
        },
        "prefill": {
            "name": "Buyer",
            "email": "buyer@example.com",
            "contact": "9000090000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
      };

      const rzp1 = new Razorpay(options);
      console.log(rzp1); 
      rzp1.open();

      // rzp1.on('payment.failed', function (response){
      //       alert(response.error.code);
      //       alert(response.error.description);
      //       alert(response.error.source);
      //       alert(response.error.step);
      //       alert(response.error.reason);
      //       alert(response.error.metadata.order_id);
      //       alert(response.error.metadata.payment_id);
      // });
      // document.getElementById('rzp-button1').onclick = function(e){
      // }
    })

    // var options = {
    //   "key": "rzp_test_IVyiBdj0ItgECq", // Enter the Key ID generated from the Dashboard
    //   "amount": `${amt}`, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    //   "currency": "INR",
    //   "name": "Acme Corp",
    //   "description": "Test Transaction",
    //   "image": "https://example.com/your_logo",
    //   "order_id": "order_IluGWxBm9U8zJ8", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    //   "handler": function (response){
    //       alert(response.razorpay_payment_id);
    //       alert(response.razorpay_order_id);
    //       alert(response.razorpay_signature)
    //   },
    //   "prefill": {
    //       "name": "Gaurav Kumar",
    //       "email": "gaurav.kumar@example.com",
    //       "contact": "9000090000"
    //   },
    //   "notes": {
    //       "address": "Razorpay Corporate Office"
    //   },
    //   "theme": {
    //       "color": "#3399cc"
    //   }
    // };

 
  }
  return (
    <>
      <div>Hello World</div>
      <input type="text" id="money"/>
      <button id="rzp-button1">Pay with Razorpay</button>
      <button onClick={placeOrder}>order</button>
    </>
  )
}

export default App
