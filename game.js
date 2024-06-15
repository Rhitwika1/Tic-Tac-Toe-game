let boxes = document.querySelectorAll(".boxes");
let currPlayer="X";
let message=document.querySelector(".messagebox");
let rstbtn=document.querySelector("#reset")
let arr=Array(9).fill(null);

function displaywinner (winner) {
    message.classList.remove("hide");
    message.innerText=`Congratulations! Winner is ${winner}`;
    disablebtn();
}


function  disablebtn(){
    boxes.forEach(box => {
        box.disabled = true;
    });
}

function checkWinner(){
    if(
        (arr[0] !==null && arr[0] === arr[1] && arr[1] === arr[2])||
        (arr[3] !==null && arr[3] === arr[4] && arr[4] === arr[5])||
        (arr[6] !==null && arr[6] === arr[7] && arr[7] === arr[8])||
        (arr[0] !==null && arr[0] === arr[3] && arr[3] === arr[6])||
        (arr[1] !==null && arr[1] === arr[4] && arr[4] === arr[7])||
        (arr[2] !==null && arr[2] === arr[5] && arr[5] === arr[8])||
        (arr[0] !==null && arr[0] === arr[4] && arr[4] === arr[8])||
        (arr[2] !==null && arr[2] === arr[4] && arr[4] === arr[6])
    )
    {
        displaywinner(currPlayer);
        
    }else if (arr.every(item => item !== null)) {
        // Check for tie
        message.classList.remove("hide");
        message.innerText = "It's a tie!";
    }
}


boxes.forEach(box => {
    box.addEventListener("click", () => {
        arr[box.id]=currPlayer;
        if(arr[box.id]!==null){
            box.disabled = true;
        }
        box.innerText=currPlayer;
        checkWinner();
        currPlayer==="X"?currPlayer="O":currPlayer="X";
        console.log(arr);
    });
});

rstbtn.addEventListener("click",()=>{
    currPlayer="X";
    boxes.forEach(box => {
        box.innerText="";
        box.disabled=false;
    });
    arr.fill(null);
    message.classList.add("hide");

})