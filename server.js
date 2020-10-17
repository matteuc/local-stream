const http = require("http");
const fs = require("fs");
const handlebars = require("handlebars");
const ngrok = require('ngrok');
const nStatic = require('node-static');

const PORT = 8080;

const fileServer = new nStatic.Server('./public');

const onRequest = (req, res) => {
    fileServer.serve(req, res);
}

ngrok.connect(PORT).then((url) => {
    const template = fs.readFileSync("./index.handlebars", "utf8");

    const pageBuilder = handlebars.compile(template);

    const pageText = pageBuilder({ url });

    fs.writeFileSync("./public/index.html", pageText)

    http.createServer(onRequest).listen(PORT, () => {

        console.log(`Stream your video at ${url} !.`);
    });

})
