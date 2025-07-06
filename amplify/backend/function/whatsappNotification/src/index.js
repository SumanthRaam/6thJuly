const twilio = require('twilio');

exports.handler = async (event) => {
    console.log('Event received:', JSON.stringify(event, null, 2));
    
    try {
        // Extract contribution data from the event
        const contribution = event.detail.newImage;
        
        if (!contribution) {
            console.log('No contribution data found in event');
            return { statusCode: 400, body: 'No contribution data found' };
        }
        
        const { name, phoneNumber, amount } = contribution;
        
        // Initialize Twilio client
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const fromNumber = process.env.TWILIO_FROM_NUMBER;
        
        if (!accountSid || !authToken || !fromNumber) {
            console.error('Missing Twilio credentials');
            return { statusCode: 500, body: 'Missing Twilio credentials' };
        }
        
        const client = twilio(accountSid, authToken);
        
        // Format phone number for WhatsApp (add country code if needed)
        let formattedPhone = phoneNumber;
        if (!phoneNumber.startsWith('+')) {
            // Assuming Indian numbers, add +91
            formattedPhone = `+91${phoneNumber}`;
        }
        
        // Create WhatsApp message
        const message = `🕉️ Thank you ${name} for your contribution of ₹${amount.toLocaleString()} to Ganesh Utsav! 🙏\n\nYour contribution has been recorded successfully. May Lord Ganesha bless you and your family.\n\nJai Ganesh! 🎉`;
        
        // Send WhatsApp message
        const result = await client.messages.create({
            from: `whatsapp:${fromNumber}`,
            to: `whatsapp:${formattedPhone}`,
            body: message
        });
        
        console.log('WhatsApp message sent successfully:', result.sid);
        
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'WhatsApp notification sent successfully',
                messageSid: result.sid
            })
        };
        
    } catch (error) {
        console.error('Error sending WhatsApp notification:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Failed to send WhatsApp notification',
                details: error.message
            })
        };
    }
}; 