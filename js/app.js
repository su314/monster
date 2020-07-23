new Vue({
    el: '#app', 
    data: {
        playerHealth:100,
        monsterHealth:100,
        isStarted:false,
        turns:[]
    },
    methods:{
        start:function(){
            this.isStarted=true;
            this.playerHealth=100;
            this.monsterHealth=100;
            this.turns=[];
        },
        attack:function(){
            this.playerAttack(3,10);
             
            if(this.win()){
                return;
            }
            this.monsterAttack(5,12);
            this.win();
        },
        specialattack:function(){
            this.playerAttack(10,20);
            if(this.win()){
                return;
            }
            this.monsterAttack(5,12);
            this.win();
        },
        heal:function(){
            if(this.playerHealth<=90){
            this.playerHealth+=10;
            this.turns.unshift({
                isPlayer:true,
                text:'Player healed for'+10
            });
            }
            else{
             this.playerHealth=100;
            }
            this.monsterAttack(5,12);
        },
        giveup:function(){
            this.isStarted=false;
        },
        damage:function(min,max){
            return Math.max(Math.floor(Math.random()*max)+1,min);
        },
        monsterAttack:function(min,max){
            let damage=this.damage(min,max);
            this.playerHealth-=damage;
            this.turns.unshift({
                isPlayer:true,
                text:'Monster hits Player for'+damage
            });
        },
        playerAttack:function(min,max){
            let damage=this.damage(min,max);
            this.monsterHealth-=damage;
            this.turns.unshift({
                isPlayer:false,
                text:'Player hits Monster for'+damage
            });
        },
        win:function(){
            if(this.monsterHealth<=0){
                if(confirm('You won ! new Game?')){
                    this.start();
                }
                else{
                    this.isStarted=false;
                }
                alert('You OWN');
                this.isStarted=false;
                return;
            }
            else if(this.playerHealth<=0){
                alert('MONSTER OWN');
                this.isStarted=false;
            }
        }
    } ,
});