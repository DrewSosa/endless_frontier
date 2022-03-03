
/*Asynchronicity means that if JavaScript has to wait for an operation to complete,
 it will execute the rest of the code while waiting.
*/
function download(url, callback) {
  setTimeout(() => {
      // script to download the picture here
      console.log(`Downloading ${url} ...`);

      // process the picture once it is completed
      callback(url);
  }, 1000);
}

function process(picture) {
  console.log(`Processing ${picture}`);
}

let url = 'https://wwww.javascripttutorial.net/pic.jpg';
// download(url, process);
download(url, function(picture) {
  console.log(`Processing ${picture}`)
});
// download(url, process);
