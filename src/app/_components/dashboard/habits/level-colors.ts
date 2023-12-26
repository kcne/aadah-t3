export function getLevelProgressColor(level:number){
    switch(true){
        case (level<5):
            return 'red';
        case (level>5 && level<10):
            return 'orange';
        case (level>10 && level<15):
            return 'amber';
        case (level>15 && level<20):
            return 'lime';
        case (level>20 && level<25):
            return 'green';
        case (level>25 && level<30):
            return 'emerald';
        case (level>30 && level<35):
            return 'teal';
        case (level>35 && level<40):
            return 'cyan';
        case (level>40 && level<45):
            return 'sky';
        case (level>45 && level<50):
            return 'blue';
        default:
            return 'yellow';
    }
}