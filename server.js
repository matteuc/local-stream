import { createServer } from "http";
import { readFileSync, writeFileSync } from "fs";
import Handlebars from "handlebars";
import ngrok from 'ngrok';
import nodeStatic from 'node-static';

const PORT = 8080;

const fileServer = new nodeStatic.Server('./public');

const onRequest = (req, res) => {
    fileServer.serve(req, res);
}

ngrok.connect(PORT).then((url) => {
    const template = readFileSync("./index.handlebars", "utf8");

    const pageBuilder = Handlebars.compile(template);

    const pageText = pageBuilder({ url });

    writeFileSync("./public/index.html", pageText)

    createServer(onRequest).listen(PORT, () => {

        console.log(`Stream your video at ${url} !.`);
    });

})
