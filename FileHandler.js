const fs = require('fs');


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
class FileHandler {
    constructor(filename) {
        this.filename = filename;
    }
    
    readFile() {
        return new Promise((resolve, reject) => {
            fs.readFile(`files/${this.filename}`, (err, data) => {
                if (err)
                    reject(err);
                else
                    resolve(data);
            });

        })

    }
    getFileName() {
        return this.filename;
    }

    writeFile(content) {
        let timeout = getRandomInt(8) * 1000;
        return new Promise((resolve, reject) => {
            let that = this;
            setTimeout(function () {
                if (!fs.existsSync(__dirname + `/files/${that.filename}`)) {
                    fs.createWriteStream(__dirname + `/files/${this.filename}`);
                }
                fs.writeFile(__dirname + `/files/${that.filename}`, content, (err) => {
                    if (err)
                        reject(err);
                    else
                        resolve();
                });
            }, 1000);
        })

    }
}

module.exports = FileHandler