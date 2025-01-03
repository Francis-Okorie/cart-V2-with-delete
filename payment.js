function payWithPaystack() {
    const sumTotalValue = document.querySelector(".sum-total");
    
    const result = sumTotalValue.textContent.replace("$", "");  
    let payTotal = Number(result);  
    console.log(payTotal);
    

    let handler = PaystackPop.setup({
      key: 'pk_test_dc90725d6f7e919e386a70d02e603020973f6421', // Replace with your public key
      email: document.querySelector(".inputelement").value,
      amount: (payTotal*1500)*100,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function(){
        alert('Window closed.');
      },
      callback: function(response){
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
      }
    });
  
    handler.openIframe();
  }