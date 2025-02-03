const mode=document.getElementById("mode");
const load=document.getElementById("onload");
mode.onclick=function(){
    const wasDarkmode = localStorage.getItem('mode') === 'true';
    localStorage.setItem('mode', !wasDarkmode);
    document.body.classList.toggle("dark-mode",!wasDarkmode);
    if(document.body.classList.contains("dark-mode")){
        mode.src="../images/sun.png";
    }else{
        mode.src="../images/moon.png ";
    }
}

load.onload=function(){
    document.body.classList.toggle('dark-mode', localStorage.getItem('mode') === 'true');

}