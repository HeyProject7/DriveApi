const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { google } = require('googleapis');
const { file } = require('googleapis/build/src/apis/file');
const upload = multer();

// Function To Upload 
const uploadFilesToDrive = require('../controller/uploadFilesToDrive');

router.route('/')
    .post(upload.any(), async(req, res) => {
        try {
            const { body, files } = req;
            for (var f = 0; f < files.length; f++) {
                await uploadFilesToDrive(files[f]);
            }

            res.sendFile(path.join(__dirname, "..", "views", "done.html"));
        } catch (error) {
            res.redirect('/404-page');
        }
    })

module.exports = router;