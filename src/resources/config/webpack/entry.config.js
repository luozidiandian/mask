/**
 * Created by wangtingshun on 2017/4/24.
 */
let path = require('path');
let dirVars = require('./base/dir-structure.config.js');
let pageArr = require('./base/page-entries.config.js');
let configEntry = {};

pageArr.forEach((page) => {
    configEntry[page] =path.resolve(dirVars.entriesDir, page+'/page' );
    console.log(path.resolve(dirVars.entriesDir, page+'/page' ));
});

module.exports = configEntry;


