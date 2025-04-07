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
    console.log("response in of email in emailservices : ",data);
    return data;
};

export const sendWhatsappMessage = async ( phoneNumber,customerName, orderId, totalPrice,status, paymentStatus, trackingLink, ) => {
    try {
        const response = await fetch('http://localhost:8080/api/send-whatsappMessage', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                phoneNumber ,
                customerName: customerName || "",
                orderId: orderId || "",
                totalPrice: totalPrice || "",
                // status: status || "Pending",
                paymentStatus: paymentStatus || "Paid",  
                trackingLink: trackingLink || "",
                storeName: ' FashionVista', 
                supportEmail: 'support@fashionvista.com',
                phoneNumberSupport: "+92 123 456 7890",
            })


        });
        const data = await response.json();
        console.log("response in of whatsapp message in  emailservices : ",data);
        return data;

} catch (error) {
        console.error("Error sending order confirmation email:", error);
        return { success: false, message: "Error sending order confirmation message" };
        
    }
}