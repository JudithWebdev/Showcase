const arrayKleurVolgorde = ["wit", "zwart", "wit", "wit", "zwart", "wit", "zwart", "wit", "wit", "zwart", "wit", "zwart"];
const arrayLetterVolgorde = ["a", "é", "z", "e", "'", "r", "(", "t", "y", "è", "u", "!", "i", "ç", "o", "p", ")","$", "-", "<", "w", "s", "x", "d", "c", "f", "v", "b", "h", "n", "j", ",", ";", "l", ":", "m", "="];

class Piano {
    constructor(aantalToetsen) {
        this.aantalToetsen = aantalToetsen;
        this.toetsArrayInstanties = [];
    }

    tekenPiano (plaats) {
        let HTMLPianoDiv = document.createElement("div");
        HTMLPianoDiv.classList.add("piano");
        document.querySelector(plaats).appendChild(HTMLPianoDiv);

        let teller2=0;

        let voorlopigeArrayToetsen = [];

        for (let teller=0; teller<this.aantalToetsen; teller++) {
            if (teller2==12) {
                teller2= teller2-12;
            }
            
            let toets = new Toets ((arrayKleurVolgorde[teller2]), teller, (arrayLetterVolgorde[teller]));
            toets.tekenToets();
            teller2++;
            voorlopigeArrayToetsen.push(toets);

        }
        this.toetsArrayInstanties=(voorlopigeArrayToetsen);

    }


}


class Toets {
    constructor(kleur, noot, letter) {
        this.kleur=kleur;
        this.noot=noot;
        this.letter=letter;
    }
    tekenToets() {
       let newToetsDiv = document.createElement("div");
       newToetsDiv.setAttribute("data-note", this.noot);
       newToetsDiv.classList.add(this.kleur, "toets");

       let newParagraaf = document.createElement("p");
       newParagraaf.innerText=this.letter;
       newToetsDiv.appendChild(newParagraaf);

       let newAudio = document.createElement("audio");
       newAudio.src=`./notes/noot${this.noot}.mp3`;
       newAudio.id=this.noot;
       newToetsDiv.appendChild(newAudio);
   document.querySelector(".piano").appendChild(newToetsDiv);
   }
    }


let piano1 = new Piano(37);
piano1.tekenPiano('body');

console.log(piano1);


//SPEEL OP DE PIANO


const divToetsen = document.querySelectorAll('.toets');
const audioBestanden = document.querySelectorAll('audio');

for (const divToets of divToetsen) {
    divToets.addEventListener("click", function() {
        if (divToets.repeat) return;
        const aangeklikteToets = document.getElementById(divToets.dataset.note);
  speelNoot(aangeklikteToets);
    });
}



document.addEventListener('keydown', e => {
    if (e.repeat) return;
    const key = e.key;
    const arrayLettersIndex = arrayLetterVolgorde.indexOf(key);
    speelNoot(audioBestanden[arrayLettersIndex]);
});

function speelNoot(key) {
    key.parentElement.classList.add('actief');
key.play();
key.currentTime=0;

key.addEventListener('ended', () => {
    key.parentElement.classList.remove('actief');
});

} 

