var cloudinary = require("cloudinary");

cloudinary.config({ 
    cloud_name: 'gsgowtham', 
    api_key: '', 
    api_secret: '' 
  });

const uploadToCloud = (fileName, callback) => {
  console.log("Uploading " + fileName)
 cloudinary.v2.uploader.upload_large("./tmp/"+fileName, {resource_type: "video" , public_id: fileName.split('.')[0], format: "webm", timeout : 120000 },function(error, result) {
  console.log(result,error)
        if(result){
        callback(result.url, result.public_id)
      }else{
     callback('')
      }
    });
}

module.exports = {
  uploadToCloud : uploadToCloud
}

