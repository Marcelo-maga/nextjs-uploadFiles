import formidable from "formidable";

async function upload(req, res, next) {
  const form = new formidable.IncomingForm({
    keepExtensions: true,
    uploadDir: './temp'
  })

   form.parse(req, (err, fields, files) => {
    if(err) {
      console.log(err)
    }
    console.log('The Upload is complete')
    next()
  })
}

export default upload