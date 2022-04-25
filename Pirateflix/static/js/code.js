const nav = document.getElementById('toolbar');
            window.addEventListener('scroll', () => {
                if(window.scrollY >= 100){
                    nav.classList.add('nav_gold')
                } 
                else{
                    nav.classList.remove('nav_gold')
                }
            })

            
function incrementValue(){
    var value = parseInt(document.getElementById('tickets').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    document.getElementById('tickets').value = value
}

                var val = document.getElementById('tickets');
                var playBtn = document.getElementById('btn btn-primary');
                var play = document.getElementById('play-btn');
                var eventHandler = function(event){
                    var value = parseInt(val.innerText || val.innerHTML);
                    if(this.id === 'playBtn') {value++;}
                    else if(this.id === 'play') {value--;}
                    val.innerHTML = value;
                    if(value <=0){
                        play.disabled = true;
                    }
                    else {
                        play.disabled = false;
                    }
                };





function decrementValue(){
    var value = parseInt(document.getElementById('tickets').value, 10);
    const playBtn = document.getElementById('play-btn');
    let headBtn = document.getElementById('head_button');

    value = isNaN(value) ? 0 : value
    value--;
    document.getElementById('tickets').value = value

    var a = 0;

    if(document.getElementById('tickets').value < 1){
        document.getElementById('head_button').disabled = (a=0);
        playBtn.disabled = true;
        headBtn.disabled = true;
        document.getElementById('head_button').disabled;
    }
    else{
        document.getElementById('head_button').disabled = false;
        document.getElementById('play-btn').disabled = false;
        headBtn.disabled = false;
        playBtn.disabled = false;
    }
}

function cantPlay(){

                let value = parseInt(document.getElementById('tickets').value)
    var a = value
    document.getElementById('tickets').innerHTML = a
    let playBtn = document.getElementById('play-btn')

    if(a < 1){
        document.getElementById('play-btn').disabled = !a;
    } else {
        playBtn.disabled = false;
    }
}

var x = document.getElementById("myVideo");

function playVid(){
    x.play()
}

