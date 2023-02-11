/**
 *
 * This reads the 'built in' tumblr feed and returns what is read as a string that contains XML.
 * example call http://localhost:5001/daily-dilettante/us-central1/readTumblr?tag=article
 * If you provide a tag=... query parameter, this will be used to filter the reading, based on that tag
 * Clearly, you will have to coordinate your posting to go with your tagging, but as tumblr posts can contain many tags,
 * this should not be a headache
 * If you provide no query parameter (or one not called tag) you get them all
 */
'use strict';
const logger = require("firebase-functions/lib/logger");
const functions = require('firebase-functions');
// const rp = require('request-promise');

// example:
// call:
// const updateUserRole = functions.httpsCallable("updateUserRole");
// updateUserRole({user: this.user, "role": role})

// definition
// exports.updateUserRole = functions.https.onCall((data, context) => {
// data access inside it:   switch (data.role) {

exports.readTumblr = functions.https.onCall((data, _context) => {
    logger.debug(`[readTumblr] Call made with data [${JSON.stringify(data)}]`);

    let url = "https://dailydilettante.tumblr.com/api/read/xml"

    if (data.blogType) {
        url += `?tagged=${data.blogType}`;
    }

    logger.debug("Preparing to read the tumblr feed [" + url + "]")

    const https = require('https');

    return https.get(url, (resp) => {
        let data = '';
        // The process is to listen to all the chunks and record them
        resp.on('data', (chunk) => {
            console.log(`got a chunk of type ${typeof chunk}`);
            data += chunk;
        });
        // This means tha there is no more to come
        resp.on('end', () => {
            console.log(`All data got from the url [${data}]`);
            let response = {
                code: 200,
                message: `'${data}'`
            };
            console.log(`going to send back [${JSON.stringify(response)}]`);

            return response;
        });
    }).on("error", (err) => {
        console.log("Error: " + err.message);
        throw new functions.https.HttpsError("internal", err.message);
    });

    // // logger.debug(`Requested tag: ${inputRequest.query.tag}`)
    //
    // if (inputRequest.query.tag) {
    //     url += `?tagged=${inputRequest.query.tag}`
    // }
    // // This is the vital statement
    // // It tells the requesting browser that I do not care who is calling this function
    // outputResponse.set('Access-Control-Allow-Origin', '*');
    // // really, this is fast enough so that caching is dispensable, and you probably want the latest,anyway
    // // you may still find that tumblr's feed is only refreshed every now and again
    // outputResponse.set('Cache-Control', 'no-store');
    // outputResponse.set('Cache-Control', 'max-age=0');
    //
    // // logger.info("-------------------------------------------------------------------------")
    // logger.debug("Preparing to read the tumblr feed:" + url + ":")
    //
    // // xml is the default language of this feed, so adding the xml on the end is not really vital
    // rp({uri: url})
    //     .then(result => {
    //         logger.debug('Response received');
    //         // logger.debug('here is response: ' + result);
    //         outputResponse.status(200).type("text/xml").send(result)
    //     })
    //     .catch(err => {
    //         logger.debug(err)
    //         outputResponse.status(500).send(err)
    //     })
})
