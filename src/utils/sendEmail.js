import { google } from 'googleapis'
import nodemailer from 'nodemailer'

const OAuth2 = google.auth.OAuth2

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    'https://developers.google.com/oauthplayground/' 
)

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN
})

const accessToken = new Promise( async (resolve, reject) => {
    oauth2Client.getAccessToken((error, token) => {
        resolve(token)
    })
})

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.PASS,
        accessToken,

        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN
    }
})

export default transporter