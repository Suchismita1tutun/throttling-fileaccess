const FileHandler = require('./FileHandler')
let Promise = require('bluebird')
let files = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt', 'file6.txt', 'file7.txt', 'file8.txt', 'file9.txt', 'file10.txt', 'file11.txt', 'file12.txt'];

async function writeFile(fileHandler, content) {
    await fileHandler.writeFile(content);
    console.log(`content written in file ${fileHandler.getFileName()}`)
};

async function writetoAllFiles() {
    let content = await new FileHandler('log').readFile();
    // code to run all the promises in parallel
    // await Promise.all(files.map(item => {
    //     let fileHandler = new FileHandler(item);
    //     let fileContent = 'Filename: ' + item + '\n' + content;
    //     let promise = writeFile(fileHandler, fileContent);
    //     return promise;
    // }));
  
    // code to implement throttling
    await Promise.map(files, item => {
        let fileHandler = new FileHandler(item);
        let fileContent = 'Filename: ' + item + '\n' + content;
        let promise = writeFile(fileHandler, fileContent);
        return promise;
    }, { concurrency: 2 })
    console.log('All files has been created');
}

async function write() {
    await writetoAllFiles();
    // perform further operations
}

write();
