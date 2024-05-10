// function add(a,b){
//     return a+b

// }
// var add=(a,b)=>{
//      return(a+b)

//  }
// var a=function (){
//       return "hello"
//   };
 

// function  palidromn(a){
//     let name=a
//     var string=""
//     for (let i =a.length ;i--;){
//          string=string+a[i]
//         //  console.log(string)
//      }
//      if (name === string){
//          console.log("palidromn")
//      }
//      else {
//          console.log("not palidromn")
//      }
// }
// palidromn("madam")



function count(para,number){
    let a=number
    var string=""
    for (let i=para.length;i++;){
        if (a<=i.length){
            string=string+para[i]
            console.log(string)
        }
        
    }

}
count("I had never seen a house on fire before, so, one ",16)