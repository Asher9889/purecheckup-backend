const SCHEDULE_SURGERY_RESPONSE = {
    SUCCESS: {
        statusCode: 200,
        message: 'Your surgery consultation request has been received successfully! Our medical team will review your details and contact you shortly to discuss the next steps.',
    },
    VALIDATION_ERROR: {
        statusCode: 400,
        message: 'Please provide all required information for the surgery consultation.'
    },  
    SERVER_ERROR: { 
        statusCode: 500,
        message: 'We encountered an error while processing your request. Please try again later.'
    }
};

export {
    SCHEDULE_SURGERY_RESPONSE
};