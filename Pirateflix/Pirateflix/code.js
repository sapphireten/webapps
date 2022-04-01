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
    value++
    document.getElementById('tickets').value = value
}

var $counter = $('#tickets');

var $button2 = $('#play')
$button2.click(function (){
    $counter.val(parseInt($counter.val()) + 1);
});