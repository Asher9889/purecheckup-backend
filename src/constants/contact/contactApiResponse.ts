const SCHEDULE_SURGERY_RESPONSE = {
    SUCCESS: {
        statusCode: 200,
        message: 'Our advisor will get in touch within 24 hours to guide you through the best health coverage options.',
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

const TALK_TO_INSURANCE_ADVISOR_RESPONSE = {
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

const QUICK_EMI_CHECK_RESPONSE = {
    SUCCESS: {
        statusCode: 200,
        message: 'Our advisor will get in touch within 24 hours to guide you through the best help to secure your EMI.',
    },
    VALIDATION_ERROR: {
        statusCode: 400,
        message: 'Please provide all required information for the EMI check.'
    },  
    SERVER_ERROR: { 
        statusCode: 500,
        message: 'We encountered an error while processing your request. Please try again later.'
    }
};

const REQUEST_CALLBACK_RESPONSE = {
    SUCCESS: {
        statusCode: 200,
        message: 'Your request for callback has been received successfully! Our medical team will review your details and contact you shortly to discuss the next steps.',
    },
    VALIDATION_ERROR: {
        statusCode: 400,
        message: 'Please provide all required information for the request for callback.'
    },  
    SERVER_ERROR: { 
        statusCode: 500,
        message: 'We encountered an error while processing your request. Please try again later.'
    }
};

export {
    SCHEDULE_SURGERY_RESPONSE,
    TALK_TO_INSURANCE_ADVISOR_RESPONSE,
    QUICK_EMI_CHECK_RESPONSE,
    REQUEST_CALLBACK_RESPONSE
};