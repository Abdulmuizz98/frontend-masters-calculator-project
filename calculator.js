let buffer = "";
let previousOperator = "";
const operators = ["+","-","*","/"];

const screen = document.querySelector(".calc-screen");
const totalScreen = document.querySelector(".total-screen");


document.querySelector(".buttons").addEventListener('click', function(event){
  const press = event.target.innerText; 
  if(isNaN(parseInt(press))){
      handleOperator(press);
  }
  else{
    handleNumber(press);
  }
  if(screen.innerText.length >=10){ reduceScreenFont();}
  console.log(screen.innerText.length);
 });

 function handleNumber(num){
    if(buffer == ""){
    screen.innerText = num;
    buffer = num;
    }else{
      screen.innerText += num;
      buffer += num; 
      if(previousOperator !== ""){
        totalScreen.innerText = resolveTotal();
      }
    }
 }

 function handleOperator(opr)
 {
  if(buffer === "")
  {
    return;
  }
  else
  {
      switch(opr){
        case "DEL":
            buffer = buffer.substr(0, buffer.length - 1)
            screen.innerText = buffer;  
            if(previousOperator !== ""){
              totalScreen.innerText = resolveTotal();
            }      
            break;   

        case "=":
            totalScreen.innerText = resolveTotal();
            break;

        case "C":
            screen.innerText = "";
            totalScreen.innerText = "";
            buffer = "";
            previousOperator = "";
            break;
            
        default:
          if(previousIsFunction())
          {
            buffer = buffer.substr(0, buffer.length - 1);
            buffer += opr;
            screen.innerText = buffer;     
          }else{
            screen.innerText += opr;
            buffer+= opr;
            previousOperator = opr;
          }
          break;
    }
  }
}
function previousIsFunction()
{
  if(operators.includes(buffer[buffer.length-1]))
  {
      return true;
  }
  return false;
}
function resolveTotal(){
  let res = "";
  const copyBuffer = buffer.replace(/x/g,'*');
  if(operators.includes(copyBuffer[copyBuffer.length-1]))
  {
      if (isOneOperator(copyBuffer))
      {
        res = undefined;
      }else{
        res = eval(copyBuffer.substr(0, copyBuffer.length -1));
      }
  }else if(isZeroOperator(copyBuffer)){
      res = undefined;
  }else{
    res = eval(copyBuffer);
  }
  return res == undefined ? "" : res;
}

function isOneOperator(text){
  let count = 0;
  let i = 0;
  while (i < text.length){
    if(operators.includes(text[i]))
    {
      count++;
    }
    if(count >= 2) break;
    i++;
  }
  return count === 1;
}
function isZeroOperator(text){
  let count = 0;
  let i = 0;
  while (i < text.length){
    if(operators.includes(text[i]))
    {
      count++;
    }
    if(count >= 1) break;
    i++;
  }
  return count === 0;
}
//onclick
//color
function reduceScreenFont()
{
  //  if(totalScreen.innerText.length >= 10)
   {
     screen.style.fontSize = "150%";
   }
}