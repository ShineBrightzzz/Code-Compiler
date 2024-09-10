const { exec } = require('child_process');
const fs = require('fs');
const util = require('util');

// Promisify fs and exec functions
const execPromise = util.promisify(exec);
const writeFilePromise = util.promisify(fs.writeFile);
const readFilePromise = util.promisify(fs.readFile);

async function CppRunner(code, input) {
    const fileName = "program.cpp";
    
    try {
        // Save the C++ code to a file
        await saveFile(fileName, code);
        
        // Save the input to a file
        await writeFilePromise("inputb.txt", input);
        
        // Compile the C++ program
        try{
            await execPromise('g++ program.cpp -o program.exe');

        }catch(err){
            return err.stderr;
        }
        
        // Run the compiled program with input redirection
        await execPromise('cmd /c "program.exe < inputb.txt > outputb.txt"');
        
        // Read and return the output from the output file
        
        const output = await readFilePromise("outputb.txt", 'utf8');
        return output;
    } catch (error) {
        console.error(`Error: ${error.message}`);
    }
}

const saveFile = async (name, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(name, data || null, function (err) {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                console.log("file saved");
                resolve();
            }
        });
    });
};

module.exports = CppRunner;
