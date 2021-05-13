console.clear();
const fs = require('fs');

const dir = './files';

const fileList = [];
// const totalFiles = 0;
let totalSize = 0;
let bar = 0;
let delay = 1000;

const progressBar = (proc) => {
  console.log(proc + '  %');

  let bar = '';
  for (let index = 0; index < proc; index++) {
    bar += '#';
  }
  const cuuretDalay = (delay += 1000);
  console.log(cuuretDalay);
  setTimeout(() => {
    // console.clear();
    console.log(bar);
    console.log(proc + '  %');
  }, cuuretDalay);
};

const progress = () => {
  console.log(' START!!!!');
  fs.readdir(dir, (err, files) => {
    console.log(files);
    totalFiles = files.length;

    files.forEach((file, index) => {
      console.log('  =====>>>>', index);

      fs.stat(`${dir}/${file}`, (err, fileData) => {
        console.log(fileData);

        fileList.push({ name: file, size: fileData.size });

        // чтение файлов  ==>САМОЕ СЛОЖНОЕ ТУТ !!!!
        if (fileList.length === files.length) {
          // ЗДЕСЬ
          console.log(' fileList = ', fileList);
          console.log('Информация по файликам вся есть!!!!');
          console.log('--------------------');
          totalSize = fileList.reduce((acc, el) => acc + el.size, 0);
          console.log('totalSize = ', totalSize);

          fileList.forEach((fileObj) => {
            fs.readFile(`${dir}/${fileObj.name}`, (err, _) => {
              const currentPrc = Math.round((100 * fileObj.size) / totalSize);
              bar += currentPrc;
              // console.log(bar + ' %');
              progressBar(bar);
            });
          });
        }
      });
    });
  });
};

progress();
