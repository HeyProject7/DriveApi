const buffer = require('buffer');
const { google } = require('googleapis');
const stream = require('stream');
const path = require('path');

const KEYFILEPATH = path.join(__dirname, "..", "middleware", "credentials.json");
const SCOPES = ['https://googleapis.com/auth/drive'];

const auth = new google.auth.GoogleAuth({
    KeyFile: KEYFILEPATH,
    scopes: SCOPES
});

const uploadFilesToDrive = async(fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer)
    const { data } = await google.drive({
        version: "v3",
        auth: auth
    }).files.create({
        media: {
            mimeType: fileObject.mimeType,
            body: bufferStream
        },
        requestBody: {
            name: fileObject.name,
            parents: ["1JCmsgR5dQ-R3YS834Gb_33qOze5p-V4b"]
        },
        fields: "id,name"
    })
    console.log(`Uploaded ${data.name} With Id ${data.id}`)
}
module.exports = uploadFilesToDrive;