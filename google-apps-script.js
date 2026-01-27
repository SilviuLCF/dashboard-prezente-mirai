// Google Apps Script - Copiaza tot codul in script.google.com
// Acest script primeste PDF-ul ca base64 si trimite email-uri cu attachment

function doPost(e) {
  try {
    Logger.log('Request primit!');
    
    // Parse request data
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      Logger.log('Eroare parsing JSON: ' + parseError);
      return createResponse(false, 'Invalid JSON data');
    }
    
    Logger.log('Data parsed successfully');
    
    // Extract data
    const recipients = data.recipients; // Array of {email, name}
    const subject = data.subject;
    const message = data.message;
    const pdfBase64 = data.pdfBase64;
    const pdfFilename = data.pdfFilename;
    
    Logger.log('Recipients count: ' + recipients.length);
    Logger.log('PDF filename: ' + pdfFilename);
    
    // Convert base64 to blob
    let pdfBlob;
    try {
      pdfBlob = Utilities.newBlob(
        Utilities.base64Decode(pdfBase64),
        'application/pdf',
        pdfFilename
      );
      Logger.log('PDF blob created successfully');
    } catch (blobError) {
      Logger.log('Eroare creare PDF blob: ' + blobError);
      return createResponse(false, 'Failed to create PDF: ' + blobError.toString());
    }
    
    // Send email to each recipient
    const results = [];
    
    recipients.forEach(function(recipient, index) {
      try {
        Logger.log('Trimit email catre: ' + recipient.email);
        
        MailApp.sendEmail({
          to: recipient.email,
          subject: subject,
          body: message,
          attachments: [pdfBlob],
          name: 'Mirai Dojo Aikido Aikikai'
        });
        
        Logger.log('Email trimis cu succes catre: ' + recipient.email);
        
        results.push({
          email: recipient.email,
          success: true
        });
        
      } catch (error) {
        Logger.log('Eroare trimitere email catre ' + recipient.email + ': ' + error);
        
        results.push({
          email: recipient.email,
          success: false,
          error: error.toString()
        });
      }
    });
    
    Logger.log('Toate email-urile au fost procesate');
    
    // Return results
    return createResponse(true, 'Emails sent', results);
    
  } catch (error) {
    Logger.log('Eroare generala: ' + error);
    return createResponse(false, error.toString());
  }
}

// Helper function to create consistent responses
function createResponse(success, message, results) {
  const response = {
    success: success,
    message: message || ''
  };
  
  if (results) {
    response.results = results;
  }
  
  return ContentService.createTextOutput(
    JSON.stringify(response)
  ).setMimeType(ContentService.MimeType.JSON);
}

// Test function (optional)
function testEmail() {
  const testData = {
    recipients: [
      { email: 'test@example.com', name: 'Test User' }
    ],
    subject: 'Test Email',
    message: 'This is a test email from Google Apps Script',
    pdfBase64: '', // Add test PDF base64 here
    pdfFilename: 'test.pdf'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  Logger.log(doPost(e).getContent());
}
