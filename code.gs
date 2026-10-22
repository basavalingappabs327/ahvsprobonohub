function doGet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();
  var data = [];
  
  // ಮೊದಲ ಸಾಲು ಹೆಡರ್ (title, url) ಆಗಿರುವುದರಿಂದ i = 1 ರಿಂದ ಪ್ರಾರಂಭಿಸುತ್ತೇವೆ
  for (var i = 1; i < rows.length; i++) {
    var title = rows[i][0];
    var url = rows[i][1];
    
    // ಖಾಲಿ ಸಾಲುಗಳಿದ್ದರೆ ತಪ್ಪಿಸಲು
    if (title && url) {
      data.push({
        title: title,
        url: url
      });
    }
  }
  
  return ContentService.createTextOutput(JSON.stringify(data))
                       .setMimeType(ContentService.MimeType.JSON);
}