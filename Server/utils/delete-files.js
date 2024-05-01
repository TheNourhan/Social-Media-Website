const fs = require('fs').promises;

const delete_files = async (filenames) => {
    try {
        for (const filename of filenames) {
            // Check if the file exists before attempting to delete it
            try {
                if(!filename.startsWith('default')){
                    await fs.access(`./uploads/${filename}`);
                    // File exists, so delete it
                    await fs.unlink(`./uploads/${filename}`);
                    console.log(`Deleted file: ${filename}`);
                }
            } catch (error) {
                if (error.code === 'ENOENT') {
                    console.log(`File not found: ${filename}`);
                } else {
                    throw error;
                }
            }
        }
    } catch (error) {
        console.error('Error deleting files:', error);
    }
};

module.exports = delete_files;