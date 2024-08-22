const path = require('path');  

module.exports = {  
    // ... other configuration ...  
    resolve: {  
        fallback: {  
            "path": false,  
            "os": false,  
            "crypto": false,  
            "http": false,  
            "https": false,  
            "zlib": false,  
            "url": false  
        }  
    }  
};