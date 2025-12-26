let btNcompani = document.querySelector(".compani")

let btNlocalGame = document.querySelector(".localGame")

let btNonlineGame = document.querySelector(".onlineGame")

let btNload = document.querySelector(".load")

let btNinform = document.querySelector(".inform")


let text = document.querySelector(".text")


btNcompani.onclick = () => textBlock()
btNonlineGame.onclick = () => textBlock()
btNload.onclick = () => textBlock()
btNinform.onclick = () => textBlock()



function textBlock() {
 text.style.display = "block"
}



//тут перехід на наступну сторінку
btNlocalGame.onclick = () => {
 window.location.href = "../page2/page2_2.html"
}