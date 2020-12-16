// All DOM elements
// All Screens
const menu = document.getElementById('menu');
const main = document.getElementById('main');
const message = document.getElementById('message');
// *********  Menu  ************
// Start Button
const startButton = document.getElementById('start');
// Settings
let difficulty = document.querySelectorAll('input[name="difficulty"]');
let type = document.querySelectorAll('input[name="type"]');
// Info
const infoDifficulty = document.getElementById('info-difficulty');
const infoType = document.getElementById('info-type');
const infoTime = document.getElementById('info-time');
const infoBonus = document.getElementById('info-bonus');
// *********  Main  ************
const mainDifficulty = document.getElementById('main-diffuculty');
const mainSmall = document.getElementById('main-small');
const mainScore = document.getElementById('score');
const mainTime = document.getElementById('time');
const element = document.getElementById('element');
const input = document.getElementById('input');
const restartButtons = document.querySelectorAll('.restart');// will select restart button of main and message both
const homeButtons = document.querySelectorAll('.home');// will select home button of main and message both
// *********  Message  ************
const messageDifficulty = document.getElementById('message-difficulty');
const messageScore = document.getElementById('message-score');
// Arrays and Variables
// Array for different properties for different difficulty levels
const gameDatabase = [{difficulty:"Easy", word : { time:15,bonus:5 }, sentence : { time:25,bonus:10 }},{difficulty:"Medium", word : { time:12,bonus:3 }, sentence : { time:20,bonus:5 }},{difficulty:"Hard",word : { time:8,bonus:2 }, sentence : { time:15,bonus:3 }}];
// Array for words
const words = [,'ability'	,'able'	,'about'	,'above'	,'accept'	,'according'	,'account'	,'across'	,'act'	,'action'	,'activity'	,'actually'	,'add'	,'address'	,'analysis'	,'and'	,'animal'	,'another'	,'answer'	,'any'	,'anyone'	,'anything'	,'appear'	,'apply'	,'approach'	,'area'	,'argue'	,'arm'	,'around'	,'arrive'	,'art'	,'article'	,'artist'	,'as'	,'ask'	,'assume'	,'at'	,'attack'	,'attention'	,'attorney'	,'audience'	,'author'	,'authority'	,'available'	,'avoid'	,'away'	,'baby'	,'back'	,'bad'	,'bag'	,'ball'	,'bank'	,'bar'	,'base'	,'be'	,'beat'	,'beautiful'	,'because'	,'become'	,'bed'	,'before'	,'begin'	,'behavior'	,'behind'	,'believe'	,'benefit'	,'best'	,'better'	,'between'	,'beyond'	,'big'	,'bill'	,'billion'	,'bit'	,'black'	,'blood'	,'blue'	,'board'	,'body'	,'book'	,'build'	,'building'	,'business'	,'but'	,'buy'	,'by'	,'call'	,'camera'	,'campaign'	,'can'	,'cancer'	,'candidate'	,'challenge'	,'chance'	,'change'	,'character'	,'charge'	,'check'	,'child'	,'choice'	,'choose'	,'church'	,'citizen'	,'city'	,'civil'	,'claim'	,'class'	,'clear'	,'clearly'	,'close'	,'coach'	,'cold'	,'collection'	,'college'	,'color'	,'come'	,'continue'	,'control'	,'cost'	,'could'	,'country'	,'couple'	,'course'	,'court'	,'cover'	,'create'	,'crime'	,'cultural'	,'culture'	,'cup'	,'current'	,'customer'	,'cut'	,'dark'	,'data'	,'daughter'	,'day'	,'dead'	,'deal'	,'death'	,'debate'	,'decade'	,'decide'	,'decision'	,'deep'	,'defense'	,'degree'	,'Democrat'	,'democratic'	,'describe'	,'design'	,'despite'	,'detail'	,'determine'	,'develop'	,'doctor'	,'dog'	,'door'	,'down'	,'draw'	,'dream'	,'drive'	,'drop'	,'drug'	,'during'	,'each'	,'early'	,'east'	,'easy'	,'eat'	,'economic'	,'enter'	,'entire'	,'environment'	,'environmental'	,'especially'	,'establish'	,'even'	,'evening'	,'event'	,'ever'	,'every'	,'everybody'	,'everyone'	,'everything'	,'evidence'	,'exactly'	,'example'	,'executive'	,'exist'	,'expect', 'firm'	,'first'	,'fish'	,'five'	,'floor'	,'fly'	,'focus'	,'follow'	,'food'	,'foot'	,'for'	,'force'	,'foreign'	,'forget'	,'form'	,'former'	,'forward'	,'four'	,'free'	,'friend'	,'from'	,'front'	,'full'	,'fund'	,'future'	,'game'	,'garden'	,'gas'	,'general'	,'generation'	,'get'	,'girl'	,'give'	,'glass'	,'go'	,'goal'	,'good'	,'government'	,'great'	,'green'	,'ground'	,'group'	,'grow'	,'growth'	,'guess'	,'gun'	,'guy'	,'hair'	,'half'	,'hand'	,'hang'	,'happen'	,'happy'	,'hard'	,'have'	,'he'	,'head'	,'health'	,'hear'	,'heart'	,'heat'	,'heavy'	,'help'	,'her'	,'here'	,'herself'	,'high'	,'him'	,'himself'	,'his'	,'history'	,'hit'	,'hold'	,'home'	,'hope'	,'hospital'	,'hot'	,'hotel'	,'hour'	,'house'	,'how'	,'however'	,'huge'	,'human'	,'hundred'	,'husband'	,'I'	,'idea'	,'identify'	,'if'	,'image'	,'imagine'	,'impact'	,'important'	,'improve'	,'in'	,'include'	,'including'	,'increase'	,'indeed'	,'indicate'	,'individual'	,'industry'	,'information'	,'inside'	,'instead'	,'institution'	,'interest'	,'interesting'	,'international'	,'interview'	,'into'	,'investment'	,'involve'	,'issue'	,'it'	,'item'	,'its'	,'itself'	,'job'	,'join'	,'just'	,'keep'	,'key'	,'kid'	,'kill'	,'kind'	,'kitchen'	,'know'	,'knowledge'	,'land'	,'language'	,'large'	,'last'	,'late'	,'later'	,'laugh'	,'law'	,'lawyer'	,'lay'	,'lead'	,'leader'	,'learn'	,'least'	,'leave'	,'left'	,'leg'	,'legal'	,'less'	,'let'	,'letter'	,'currentData'	,'lie'	,'life'	,'light'	,'like'	,'likely'	,'line'	,'list'	,'listen'	,'little'	,'live'	,'local'		,'meet'	,'meeting'	,'member'	,'memory'	,'mention'	,'message'	,'method'	,'middle'	,'might'	,'military'	,'million'	,'mind'	,'minute'	,'miss'	,'mission'	,'model'	,'modern'	,'moment'	,'money'	,'month'	,'more'	,'morning'	,'most'	,'mother'	,'mouth'	,'move'	,'movement'	,'myself'	,'name' , 'nation'	,'national'	,'natural'	,'nature'	,'near'	,'nearly'	,'necessary'	,'need'	,'network'	,'never'	,'new'	,'news'	,'newspaper'	,'next'	,'nice'	,'night'	,'no'	,'none'	,'nor'	,'north'	,'not'	,'note'	,'nothing'	,'notice'	,'now'	,'not'	,'number'	,'occur'	,'of'	,'off'	,'offer'	,'office'	,'officer'	,'official'	,'often'	,'oh'	,'oil'	,'ok'	,'old'	,'on'		,'opportunity'	,'option'	,'or'	,'order'	,'organization'	,'other'	,'others'	,'our'	,'out'	,'outside'	,'over'	,'own'	,'owner'	,'page'	,'pain'	,'painting'	,'paper'	,'parent'	,'part'	,'participant'	,'particular'	,'particularly'	,'partner'	,'party'	,'pass'	,'past'	,'patient'	,'pattern'	,'pay'	,'peace'	,'people'	,'per'	,'perform'	,'performance'	,'perhaps', 'picture'	,'piece'	,'place'	,'plan'	,'plant'	,'play'	,'player'	,'PM'	,'point'	,'police'	,'policy'	,'political'	,'politics'	,'poor'	,'popular'	,'population'	,'position'	,'positive'	,'possible'	,'power'	,'practice'	,'prepare'	,'present'	,'president'	,'pressure'	,'pretty'	,'prevent'	,'price'	,'private'	,'probably'	,'problem'	,'process'	,'produce'	,'product'	,'production'	,'professional'	,'professor'	,'program'	,'project'	,'property'	,'protect'	,'prove'	,'provide'	,'public'	,'pull'	,'purpose'	,'push'	,'put'	,'quality'	,'question'	,'quickly'	,'quite'	,'race'	,'radio'	,'raise'	,'range'	,'rate'	,'rather'	,'reach'	,'read'	,'ready'	,'real'	,'reality'	,'realize'	,'really'	,'reason'	,'receive'	,'recent'	,'recently'	,'rich'	,'right'	,'rise'	,'risk'	,'road'	,'rock'	,'role'	,'room'	,'rule'	,'run'	,'safe'	,'same'	,'save'	,'say'	,'scene'	,'school'	,'science'	,'scientist'	,'score'	,'sea'	,'season'	,'seat'	,'second'	,'section'	,'security'	,'see'	,'seek'	,'seem'	,'sell'	,'send'	,'senior'	,'sense'	,'series'	,'serious'	,'serve'	,'service'	,'set'	,'seven'	,'several' ,'shake'	,'share'	,'she'	,'shoot'	,'short'	,'shot'	,'should'	,'shoulder'	,'show'	,'side'	,'sign'	,'significant'	,'similar'	,'simple'	,'simply' ,'social'	,'society'	,'soldier'	,'some'	,'somebody'	,'someone'	,'something'	,'sometimes'	,'son'	,'song'	,'soon'	,'sort'	,'sound'	,'source'	,'south'	,'southern'	,'space'	,'speak'	,'special'	,'specific'	,'speech'	,'spend'	,'sport'	,'spring'	,'staff'	,'stage'	,'stand'	,'standard'	,'star'	,'start'	,'state'	,'statement'	,'station'	,'stay'	,'step'	,'still'	,'stock'	,'stop'	,'store'	,'story'	,'strategy'	,'street'	,'strong'	,'structure'	,'student'	,'study'	,'stuff'	,'style'	,'subject'	,'success'	,'successful'	,'such'	,'suddenly'	,'suffer'	,'suggest'	,'summer'	,'support'	,'sure'	,'surface'	,'system'	,'table'	,'take'	,'talk'		,'their'	,'them'	,'themselves'	,'then'	,'theory'	,'there'	,'these'	,'they'	,'thing'	,'think'	,'thir', 'this'	,'those'	,'though'	,'thought'	,'thousand'	,'threat'	,'three'	,'through'	,'throughout'	,'throw'	,'thus'	,'time'	,'to'	,'today'	,'together'	,'up'	,'upon'	,'us'	,'use'	,'usually'	,'value'	,'various'	,'very'	,'victim'	,'view'	,'violence'	,'visit'	,'voice'	,'vote'	,'wait'	,'walk'	,'wall'	,'want'	,'war'	,'watch'	,'water'	,'way'	,'we'	,'weapon'	,'wear'	,'week'	,'weight'	,'well'	,'west'	,'western'	,'what'	,'whatever'	,'when'	,'where'	,'whether'	,'which'	,'while'	,'white'	,'who'	,'whole'	,'whom'	,'whose'	,'why'	,'wide'	,'wife'	,'will'	,'win'	,'wind'	,'window'	,'wish'	,'with'	,'within'	,'without'	,'woman'	,'wonder'	,'word'	,'work'	,'worker'	,'world'	,'worry'	,'would'	,'write'	,'writer'	,'wrong'	,'yard'	,'yeah'	,'year'	,'yes'	,'yet'	,'you'	,'young'	,'your'	,'yourself'];
// Array for sentennces
const sentences = ["He loves to play basketball.","He goes to school.","Does he go to school?","She writes an e-mail to her best friend.","He thinks he is very handsome.","It usually rains every day here.","It smells very delicious in the kitchen.","We generally sing songs all together.","We go to a gallery every Sunday.","Does he write an email?","The sun rises at the east.","She goes to work by car.","It doesn't rain here in the summer.","We cook every day.","We go to the gym club together.","You have a big house.","Do we know each other?","They sleep in the afternoon.","When do they usually talk to each other?","The children are at home.","The earth goes round the sun.","George brushes his teeth twice a day.","He gets up early every day.","They speak English in USA.","I like reading detective stories.","I like geography and science.","She doesn't study German on Monday.","Does she live in Paris?","He doesn't teach math.","Cats hate water.","Every child likes an icecream.","My mother never lies.","The Earth is spherical.","She doesn't use a computer.","It snows a lot in winter in Russia.","We live in Texas.","You go to holiday every summer.","Do you like spaghetti?","My daughter does the laundry.","My brother takes out the trash.","The course starts next Sunday.","She swims every morning.","I don't wash the dishes.","We see them every week.","I don't like tea.","When does the train usually leave?","She always forgets her purse.","You don't have children.","They don't go to school tomorrow.","She wants to be a dentist.","Cows eat grass.","My cat runs very fast.","She has a beehive full of bees.","My son lives in London.","They don't have any money.","She plays basketball.","He catches the train every morning.","My sister works at the theater.","Michael doesn't work.","How often do you see George?","She doesn't see Peter every day.","My boyfriend loves this song.","My father doesn't speak good English.","He goes to football every day.","California is not in the United Kingdom.","Julie talks very fast.","My brother's dog barks a lot.","Does he play tennis?","The train leaves every morning","I love my new pets.","We drink coffee every morning.","My Dad never works on the weekends.","I do love my new pets.","Mary brushes her teeth twice a day.","He drives to work.","Mary enjoys cooking.","She likes bananas.","You do not listen to me.","I run four miles every morning.","They speak English at work.","The train does not leave at 12 AM.","I have no money at the moment.","Do they talk a lot ?","Does she drink coffee?","You run to the party.","You have some schoolwork to do.","Do you eat ice cream.","The train leaves in ten minutes.","California is in America.","Penguins live in the Antarctica.","Nurses work in clinics and hospitals.","Alex works for 7 hours every day.","I do not like meat.","They go to a gallery every Saturday."];
// Game Variables
let gameTime,gameBonus,gameDifficulty,gameType;
let gameScore = 0,currentTime;
let elementBody = '';

// ALL FUNCTIONS
// 1 - Function to assign values to game variables
function setGameProperties() {
    gameDifficulty = document.querySelector('input[name="difficulty"]:checked').value;
    gameType  = document.querySelector('input[name="type"]:checked').value;
    gameDatabase.forEach(levelData => {
        if (levelData.difficulty === gameDifficulty) {
            gameTime = (gameType === 'Words') ? levelData.word.time : levelData.sentence.time;
            gameBonus = (gameType === 'Words') ? levelData.word.bonus : levelData.sentence.bonus;
        }
    });
    currentTime = gameTime;
    elementBody = generateRandomElement();    
}

// 2 - Function to update menu DOM
function updateMenuDOM() {
    // assigning values to game variables
    setGameProperties();
    // Display game data on DOM (at menu info)
    infoDifficulty.innerText = gameDifficulty;
    infoType.innerText = gameType;
    infoTime.innerText = gameTime + "s";
    infoBonus.innerText = "+" + gameBonus;
}

// 3 - Function to start game
function startGame() {
    // hide menu
    menu.classList.remove('show');
    // show main screen of game
    main.classList.add('show')
    // update Main DOM
    updateMainDOM();
    // updateTime
    setInterval(updateTime,1000);
}

// 4 - Function to update main DOM
function updateMainDOM() {
    // update DOM innerTexts
    mainDifficulty.innerText = gameDifficulty;
    mainTime.innerText = currentTime;
    mainSmall.innerText = (gameType === 'Words') ? 'Type the word given below' : 'Type the sentence given below';
    element.innerText = elementBody;
    // through focus to input area
    input.focus();
}

// 4 - Function to generate random Word or sentence
function generateRandomElement() {
    return (gameType === 'Words') ? words[Math.floor(Math.random() * words.length)] : sentences[Math.floor(Math.random() * sentences.length)];
}
// 4 - Function to update time 
function updateTime() {
    currentTime-- ;
    if(currentTime > 0) {
        mainTime.innerText = currentTime;
    } else {
        gameOver();
    }
}

// 5 - Function to display game over message and score
function gameOver() {
    messageDifficulty.innerText = gameDifficulty;
    messageScore.innerText = gameScore;
    main.classList.remove('show');
    message.classList.add('show');
}
// 6 - Function to move game forward on correct answer
function moveForwardOnCorrect(e) {
    const inputEntered = input.value;
    if(inputEntered === elementBody) {
        e.target.value = '';
        elementBody = generateRandomElement();
        element.innerText = elementBody;
        gameScore++;
        mainScore.innerText = gameScore;
        currentTime += gameBonus;
    }   
}

// 7 - Function to restart Game
function restartGame() {
    // reset variables
    currentTime = gameTime;
    gameScore = 0;
    elementBody = generateRandomElement();
    // display on DOM
    mainScore.innerText = gameScore;
    updateMainDOM();
    // switch between screen message and
    message.classList.remove('show');
    main.classList.add('show');
    // through focus to input area and clear it
    input.value = '';
    input.focus();
}

// 8 - Function to goto Menu/Home
function gotoHome() {
    location.reload();
}


// ALL EVENT LISTENERS
// 1 - Event listener to updateMenuDOM on changing difficulty
difficulty.forEach(radio => radio.addEventListener('click',updateMenuDOM));
// 2 - Event listener to updateMenuDOM on changing type
type.forEach(radio => radio.addEventListener('click',updateMenuDOM));
// 3 - Event listener to start game on clicking start button
startButton.addEventListener('click',startGame);
// 4 - Event Listener to move forward on correct answer
input.addEventListener('input',moveForwardOnCorrect);
// 5 - Event Listener to restart Game
restartButtons.forEach(button => button.addEventListener('click',restartGame));
// 5 - Event Listener to goto Menu/Home
homeButtons.forEach(button => button.addEventListener('click',gotoHome));

// INIT FUNCTIONS
updateMenuDOM();

