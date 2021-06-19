function huffman() {
  let textToCheck = document.getElementById("textToCheck").value;
  let kolejnoscWystapien = [];
  let i, j;
  let tablicaZnakow = [];
  let nowaTablicaZnakow = [];

  //definicja klasy "Litera", odpowiadającej za obiekty liter i wezlow
  class Litera {
    constructor(znak, ilosc, kod) {
      this.znak = znak;
      this.ilosc = ilosc;
      this.kod = kod;
    }
  }

  //tworzenie liter
  for (i = 0; i < textToCheck.length; i++) {
    if (!kolejnoscWystapien.includes(textToCheck[i])) {
      kolejnoscWystapien.push(textToCheck[i]);
    }
  }
  for (i = 0; i < kolejnoscWystapien.length; i++) {             //sprawdzanie jakie znaki występują w tekscie
    let count = 0;
    let position = textToCheck.indexOf(kolejnoscWystapien[i]);
    while (position !== -1) {                                   //zliczanie wystapien znaku
      count++
      position = textToCheck.indexOf(kolejnoscWystapien[i], position + 1)
    }
    if (count > 0) {                                            //stworzenie obiektow litera
      tablicaZnakow[i] = new Litera(kolejnoscWystapien[i], count, null);
      tablicaZnakow = tablicaZnakow.filter(item => item);
    }
  }

  //tworzenie wezlow
  tablicaZnakow.sort(compareNumbers);

  while (tablicaZnakow.length > 1) {

    tablicaZnakow[0].kod = "0";                                 //przypisanie 0 lewej krawedzi
    tablicaZnakow[1].kod = "1";                                 //przypisanie 1 prawej krawedzi

    let temp = new Litera(tablicaZnakow[0].znak + tablicaZnakow[1].znak, tablicaZnakow[0].ilosc + tablicaZnakow[1].ilosc, null);//nowy wezel

    nowaTablicaZnakow.push(tablicaZnakow.shift());              //przeniesienie obektu litera (to tez wezly)  o najmniejszej ilosci do nowej tablicy
    nowaTablicaZnakow.push(tablicaZnakow.shift());              //przeniesienie obektu litera (to tez wezly)  o najmniejszej ilosci do nowej tablicy
    tablicaZnakow.length = tablicaZnakow.push(temp);            //aktualizacja dlugosci tablicy
    tablicaZnakow.sort(compareNumbers);                         //sortowanie
  }

  nowaTablicaZnakow = nowaTablicaZnakow.concat(tablicaZnakow);  //połączenie tablic obiektów
  nowaTablicaZnakow.sort(compareNumbers);                       //sortowanie nowej tablicy obiektów

  //tworzenie kodów wezłów i liter
  for (j = 0; j < nowaTablicaZnakow.length - 1; j++) {          //petla po tablicy z literami i wezlami
    for (i = j + 1; i < nowaTablicaZnakow.length - 1; i++) {      //sprawdzanie wystepowania danej litery w wezle
      if (nowaTablicaZnakow[j].znak == '\.') {                  //warunek sprawdzajacy kropke, jest to znak specjalny
        if (nowaTablicaZnakow[i].znak.match(/\./g, '\.')) {
          nowaTablicaZnakow[j].kod += nowaTablicaZnakow[i].kod;
        }
      }
      else {
        if (nowaTablicaZnakow[i].znak.match(nowaTablicaZnakow[j].znak)) {
          nowaTablicaZnakow[j].kod += nowaTablicaZnakow[i].kod;   //tworzenie kodu liter i wezlow
        }
      }
    }
  }

  //odwrócenie zapisanego kodu
  for (i = 0; i < nowaTablicaZnakow.length - 1; i++) {
    nowaTablicaZnakow[i].kod = nowaTablicaZnakow[i].kod.split('').reverse().join("");
  }
  //wypisanie zakodowanego tekstu
  textToCheck.split('');
  let zakodowanyTekst = [];

  for (i = 0; i < textToCheck.length; i++) {
    j = 0;
    while (textToCheck[i] != nowaTablicaZnakow[j].znak) {
      j++;
    }
    zakodowanyTekst[i] = nowaTablicaZnakow[j].kod;
  }

  zakodowanyTekst = zakodowanyTekst.join("");

  document.getElementById("results").value = zakodowanyTekst;

  //wypisanie kodowania
  document.getElementById("code").value = WypisanieKodu(nowaTablicaZnakow, textToCheck);

  document.getElementById("entropia").value = (EntropiaSrednia(nowaTablicaZnakow, textToCheck));

}

//funkcja porownujaca
function compareNumbers(a, b) { return a.ilosc - b.ilosc; }

//funkcja wypisujaca kodowanie
function WypisanieKodu(nowaTablicaZnakow, textToCheck) {

  let tablica = [];

  for (i = 0; i < nowaTablicaZnakow.length; i++) {
    if (nowaTablicaZnakow[i].znak.length == 1) {
      tablica[i] = nowaTablicaZnakow[i].znak;
      if (tablica[i] == ' ') { tablica[i] = "spacja"; }
      if (tablica[i] == '\n') { tablica[i] = "enter"; }
      tablica[i] += " => " + nowaTablicaZnakow[i].kod + " \tp = " + (nowaTablicaZnakow[i].ilosc / textToCheck.length * 100).toFixed(2) + "%";
      tablica = tablica.filter(item => item);
    }
  }
  tablica = tablica.join("\n");
  return tablica;
}
//Wyczyść tekst
function Wyczysc() {
  document.getElementById("textToCheck").value = "";
  huffman();
}

function EntropiaSrednia(nowaTablicaZnakow, textToCheck) {
  let entropia = 0;
  let srednia = 0;
  let temp;

  for (let i = 0; i < nowaTablicaZnakow.length; i++) {

    if (nowaTablicaZnakow[i].znak.length == 1) {
      temp = nowaTablicaZnakow[i].ilosc / textToCheck.length;
      entropia = entropia + temp * Math.log2(1 / temp);
      srednia = srednia + nowaTablicaZnakow[i].ilosc / textToCheck.length * nowaTablicaZnakow[i].kod.length;
    }
  }
  temp = "Entrpia = "+entropia+'\n'+"Srednia ="+srednia;
  return temp;
}