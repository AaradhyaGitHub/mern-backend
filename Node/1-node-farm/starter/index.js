const fs = require("fs");

//reading from a file and returning it
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
console.log(textIn);

//writing to a file
const textOut = `This is what we know about the avovado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut);
console.log("Text was written to Output.txt");

{
  /* 
        Sync vs Async Code: 

        Sync: 
            - Each line waits for the previous line 
            - Each line blocks rest of the code 
            - Sync code = Blocking code 

        Async: 
            - Offload work to the background 
            - We wait for that background work to finish (in backround)
            - A registered call back function is called to handle the result
            - The rest of the code can still be executing as we defer code in the back
    */
}



