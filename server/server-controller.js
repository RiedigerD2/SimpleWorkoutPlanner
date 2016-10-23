var fs = require('fs');

module.exports.getEvent = function(reg,res){
    var event = fs.readFileSync('app/content/menu.json','utf8');
    res.setHeader('Content-Type','application/json');
    console.log(event)
    res.send(event);
}

module.exports.getMaxId = function(reg,res){
    var files = fs.readdirSync('app/data/event/');
    console.log(files);
    
    var numbers=[];
    for(var i =0 ; i<files.length;i++){
        numbers.push(parseInt(files[i].match(/^(\d*)/i)[0]));
    }
    numbers.sort(function(a,b){return b-a;})
    res.setHeader('Content-Type','application/json');
    res.send({maxid: numbers[0]});
}



module.exports.saveEvent = function(reg,res){
    var event = reg.body;
    fs.writeFileSync('app/data/event/'+reg.params.id+'.json',JSON.stringify(event));
    
    res.send(event);
}

module.exports.getAll = function(reg,res){
    var path='app/data/event';
    var files = [];
    try{
        console.log("path");
        files= fs.readdirSync(path)
    }catch (e) {
        console.log("error");
        res.send('[]');
        res.end();
    }
    var results = '[';
    for( var idx=0;idx< files.length;idx++){
        if(files[idx].indexOf(".json")==files[idx].length-5){
            results += fs.readFileSync(path + "/"+files[idx])+","
        }
    }
    
    results = results.substr(0,results.length-1);
    results+=']';
    res.setHeader('Content-Type','application/json');
    res.send(results);
    res.end();
    
}


module.exports.getProfile = function(reg,res){
    var event = fs.readFileSync('app/data/users/'+reg.params.userName+'.json','utf8');
    res.setHeader('Content-Type','application/json');
    res.send(event);
}

module.exports.saveProfile = function(reg,res){
    var event = reg.body;
    fs.writeFileSync('app/data/users/'+reg.params.userName+'.json',JSON.stringify(event));
    
    res.send(event);
}

