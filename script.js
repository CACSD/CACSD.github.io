var submit = document.querySelector(".submit");
var out1 = document.querySelector(".out1");
var out2 = document.querySelector(".out2");
var out3 = document.querySelector(".out3");
var out4 = document.querySelector(".out4");
var out5 = document.querySelector(".out5");

function reply(){
    var radios1 = document.getElementsByName("question1");
    for(var i = 0; i < radios1.length; i++){
        if(radios1[i].checked){
            if(radios1[i].value == "1982"){
                out1.innerHTML = "Correct";
            }
            else{
                out1.innerHTML = "Wrong";
            }
            break;
        }
    }
    var radios2 = document.getElementsByName("question2");
    for(var i = 0; i < radios2.length; i++){
        if(radios2[i].checked){
            if(radios2[i].value == "Dave Mustaine"){
                out2.innerHTML = "Correct";
            }
            else{
                out2.innerHTML = "Wrong";
            }
            break;
        }
    }
    var radios3 = document.getElementsByName("question3");
    for(var i = 0; i < radios3.length; i++){
        if(radios3[i].checked){
            if(radios3[i].value == "Billy Idol"){
                out3.innerHTML = "Correct";
            }
            else{
                out3.innerHTML = "Wrong";
            }
            break;
        }
    }
    var radios4 = document.getElementsByName("question4");
    for(var i = 0; i < radios4.length; i++){
        if(radios4[i].checked){
            if(radios4[i].value == "Journey"){
                out4.innerHTML = "Correct";
            }
            else{
                out4.innerHTML = "Wrong";
            }
            break;
        }
    }
    var radios5 = document.getElementsByName("question5");
    for(var i = 0; i < radios5.length; i++){
        if(radios5[i].checked){
            if(radios5[i].value == "Alice in Chains"){
                out5.innerHTML = "Correct";
            }
            else{
                out5.innerHTML = "Wrong";
            }
            break;
        }
    }
}
submit.addEventListener("click", reply);
