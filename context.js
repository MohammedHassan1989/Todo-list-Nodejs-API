var context = function () {

    const initData = () => {
        const contextFolder = './business/context/';
        const fs = require('fs');

        let data = [];

        fs.readdirSync(contextFolder).forEach(file => {
            var index = file.indexOf('-')
            filename = file.substring(0, index);
            filePath = './business/context/' + file;
            data.push({ name: filename, source: filePath })

        });
        return (data)

    }




    
    var dbContext = this;
    var contextList = initData();
    contextList.forEach((_context) => {
        dbContext[_context.name] = require(_context.source)();
    })

}

module.exports = new context;