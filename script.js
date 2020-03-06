let turn,pos;
init();

document.querySelector('#dice-0').addEventListener('click',dice_0);
function dice_0(){
    if (turn==0){
        let no=  Math.floor(Math.random()*6)+1;
        let diceDOM = document.querySelector('#dice-0');
        diceDOM.src = 'dice-'+no+'.png';
        position(no);
        if (turn !=0){
            document.querySelector('#turn-0').style.visibility='hidden';
            document.querySelector('#turn-1').style.visibility='initial';  
        }    
    }
}

document.querySelector('#dice-1').addEventListener('click',dice_1);
function dice_1(){
    if (turn==1){ 
        let no = Math.floor(Math.random()*6)+1;
        let diceDOM = document.querySelector('#dice-1');
        diceDOM.src = 'dice-'+no+'.png';
        position(no);
        if(turn !=1){
            document.querySelector('#turn-1').style.visibility='hidden';
            document.querySelector('#turn-0').style.visibility='initial';
        }
    }
}

function position(no){
    let loss = 'false'; 
    let winner_position;
    if (pos[turn]===0 ){
        if(no==1 || no==6){
            if(turn ===0){
                document.querySelector('#i-1').style.backgroundImage = "url('player-0.png')" ;
                pos[0] =1;
                loss = same_place();
            } else{
                document.querySelector('#i-1').style.backgroundImage= "url('player-1.png')";
                pos[1] =1;
                loss = same_place();
            }
        }   
    }
    else {
        let position  = pos[turn] + no;
        winner_position = winner(position ,no);
        if(winner_position==0 || winner_position==1){
            position = check_snake_ladder(position);
            if(turn ===0){
                document.querySelector('#i-'+pos[0]).style.backgroundImage = "initial";
                document.querySelector('#i-'+position).style.backgroundImage = "url('player-0.png')" ;
                pos[0] = position;
                loss = same_place();
            } else{
                document.querySelector('#i-'+pos[1]).style.backgroundImage = "initial";
                document.querySelector('#i-'+position).style.backgroundImage= "url('player-1.png')";
                pos[1]= position;
                loss = same_place();
            }
        }
    }
   

    if ((no === 6 || loss===true) && winner_position!=2) {
        turn ===0 ? turn=0 : turn=1;
    }
    else{
        turn ===0 ? turn=1 : turn=0;
    }
    console.log('no=',no,' turn=',turn,' pos',pos[turn]);
}

function winner(position , no){
    if(position===36 && no!=6){
        document.querySelector('#turn-0').style.display='none';
        document.querySelector('#turn-1').style.display='none';
        document.querySelector('#dice-0').style.display='none';
        document.querySelector('#dice-1').style.display='none';
        document.querySelector('#player-'+turn).textContent = 'WINNER';
        document.querySelector('#player-'+turn).classList.add('winner');
        turn ===0 ? turn=1 :turn=0;
        document.querySelector('#player-'+turn).textContent = 'LOSS';
        document.querySelector('#player-'+turn).classList.add('winner');
        turn ===0 ? turn=1 :turn=0;
        return 0;
    }
    else if(position  < 36){
        return 1;
    }
    else{
        return 2;
    }
}

function check_snake_ladder(position){
    if (position == 3)
        position=11;
    if (position == 19)
        position = 31;
    if (position == 34)
        position  =13;
    if (position ==21)
        position = 7;
    return position;

}

function same_place(){
    if (pos[0] === pos[1]){
        turn === 0 ? pos[1]=0 : pos[0]=0;
        return true;
    }
    return false;
}



function init(){
    turn=0;
    pos = [0,0];
    document.querySelector('#turn-0').style.display='block';
    document.querySelector('#turn-1').style.display='block';
    document.querySelector('#turn-0').style.visibility='initial';
    document.querySelector('#turn-1').style.visibility='hidden';
    document.querySelector('#player-0').classList.remove('winner');
    document.querySelector('#player-1').classList.remove('winner');
}

document.querySelector('.new-btn').addEventListener('click',function(){
    console.log('turn=',turn,' pos',pos[turn])
    document.querySelector('#player-0').textContent = 'PLAYER 1';
    document.querySelector('#player-1').textContent = 'PLAYER 2';
    document.querySelector('#dice-0').style.display = "inline";
    document.querySelector('#dice-1').style.display = "inline";
    document.querySelector('#dice-0').src = 'dice-1.png';
    document.querySelector('#dice-1').src = 'dice-1.png';
    if (pos[0]!=0){
        document.querySelector('#i-'+pos[0]).style.backgroundImage = "initial";
    }
    if (pos[1]!=0){
        document.querySelector('#i-'+pos[1]).style.backgroundImage = "initial";
    }
    init();
});

