export const sendOrderEmail = async (email, customerName, orderId, totalPrice,status, paymentStatus, trackingLink, phoneNumber) => {
    const response = await fetch('http://localhost:8080/api/send-orderEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email: email ,
            customerName: customerName || "",
            orderId: orderId || "",
            totalPrice: totalPrice || "",
            status: status || "Pending",
            paymentStatus: paymentStatus || "Paid",  
            trackingLink: trackingLink || "",
            storeName: 'FashionVista', 
            supportEmail: 'support@fashionvista.com',
            phoneNumber: phoneNumber || ""
        })
    }); 

    const data = await response.json();
    console.log("response in emailservices : ",data);
    return data;
};
