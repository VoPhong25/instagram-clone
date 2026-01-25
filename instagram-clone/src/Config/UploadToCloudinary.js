export const uploadToCloudinary=async (image)=>{
    if(image){
        const data=new FormData();
        data.append("file", image)
        data.append("upload_preset", "instagram")
        data.append("cloud_name","drujq14xa")

        const res=await fetch("https://api.cloudinary.com/v1_1/drujq14xa/image/upload", {
            method:"POST",
            body:data,
        })
        const fileData=await res.json();
        console.log("fileData: ", fileData)
        return fileData.url.toString();
    }
}

//CLOUDINARY_URL=cloudinary://<337118844217554>:<Bc65MBpoe8CsHg19ZoYQFUQtxm8>@drujq14xa