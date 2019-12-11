const fs=require('fs')
const XlsxStreamReader = require("xlsx-stream-reader");
var workBookReader = new XlsxStreamReader();



workBookReader.on('worksheet', function (workSheetReader) {
    if (workSheetReader.id > 1){
        // we only want first sheet
        workSheetReader.skip();
        return; 
    }
    // print worksheet name
    console.log(workSheetReader.name);
 
    var headings=[]      // This is to collect headings of columns !!
    var maxColIndex=-1;
    var dictHeadings=[];


    // if we do not listen for rows we will only get end event
    // and have infor about the sheet like row count
    workSheetReader.on('row', function (row) {
        
        if (row.attributes.r == 1){
            for(var i=0;i<row.values.length;i++){
                if(row.values[i]!="")
                    headings.push(row.values[i])
                else break;

            }
            maxColIndex=headings.length;
            var setHeadings= new Set(headings);
            console.log("HEadings are : ",headings)
            setHeadings.forEach((elementSet)=>{
                var indexes=[]
                var i=0;
                headings.forEach((elementArray)=>{
                        if(elementSet==elementArray)  indexes.push(i)
                    i++;
                })

                console.log(elementSet,indexes)
                  //  dictHeadings.push(new Object(elementSet,indexes))
                    
                
            })

            console.log(dictHeadings)

            // do something with row 1 like save as column names
        }else{

            // second param to forEach colNum is very important as
            // null columns are not defined in the array, ie sparse array
            row.values.forEach(function(rowVal, colNum){
                // do something with row values
              //  console.log(rowVal,colNum)
            });
        }
    });
    workSheetReader.on('end', function () {
        console.log(workSheetReader.rowCount);
    });
 
    // call process after registering handlers
    workSheetReader.process();
});
workBookReader.on('end', function () {
    // end of workbook reached
    console.log("End")
});
 
fs.createReadStream("abc.xlsx").pipe(workBookReader);
 


/*
//            To get Data Small Chunks of data !!
const xlsx =require('xlsx')
var wb=xlsx.readFile('abc.xlsx',{sheetRows:100000,cellDates:true})
var ws =wb.Sheets["Sheet1"]

var data= xlsx.utils.sheet_to_json(ws)

console.log(data)

//console.log(ws)
*/