import nextConnect from 'next-connect'
import sendEmail from '../../utils/sendEmail'
import upload from '../../utils/upload'
import fs from 'fs'

const apiRoute = nextConnect({
    onError(error, req, res) {
        console.log(error)
    },
    onNoMatch(req, res) {
        console.log(req, res)
    }
})

apiRoute.use(upload)

apiRoute.post(async (req, res) => {
    const files =  fs.readdirSync('./temp')

    const Cv = files[0]
    
    const emailOptions = {
        subject: `YourFile`,
        text: "",
        attachments: [
            {
                filename: 'file.pdf',
                path: `./temp/${Cv}`
            }
        ],
        to: process.env.EMAIL,
        from: process.env.EMAIL
    }

    sendEmail.sendMail(emailOptions).then(() => {
        console.log('The email has been sent')
        fs.unlinkSync(`./temp/${Cv}`)
    })
})

export default apiRoute

export const config = {
    api: {
        bodyParser: false
    },
}