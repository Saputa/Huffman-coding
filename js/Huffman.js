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
  for (i = 0; i < kolejnoscWystapien.length; i++) {
    let count = 0;
    let position = textToCheck.indexOf(kolejnoscWystapien[i]);
    while (position !== -1) {
      count++
      position = textToCheck.indexOf(kolejnoscWystapien[i], position + 1)
    }
    if (count > 0) {
      tablicaZnakow[i] = new Litera(kolejnoscWystapien[i], count, null);
      tablicaZnakow = tablicaZnakow.filter(item => item);
    }
  }

  //tworzenie wezlow
  tablicaZnakow.sort(compareNumbers);

  while (tablicaZnakow.length > 1) {

    tablicaZnakow[0].kod = "0";
    tablicaZnakow[1].kod = "1";

    let temp = new Litera(tablicaZnakow[0].znak + tablicaZnakow[1].znak, tablicaZnakow[0].ilosc + tablicaZnakow[1].ilosc, null);

    nowaTablicaZnakow.push(tablicaZnakow.shift());
    nowaTablicaZnakow.push(tablicaZnakow.shift());
    tablicaZnakow.length = tablicaZnakow.push(temp);
    tablicaZnakow.sort(compareNumbers);
  }
  nowaTablicaZnakow = nowaTablicaZnakow.concat(tablicaZnakow);
  nowaTablicaZnakow.sort(compareNumbers);

  //tworzenie kodów wezłów i liter
  for (j = 0; j < nowaTablicaZnakow.length - 1; j++) {
    for (i = j+1; i < nowaTablicaZnakow.length - 1; i++) {
      if (nowaTablicaZnakow[j].znak == '\.') {
        if (nowaTablicaZnakow[i].znak.match(/\./g, '\.')) {
          nowaTablicaZnakow[j].kod += nowaTablicaZnakow[i].kod;
        }
      }
      else {
        if (nowaTablicaZnakow[i].znak.match(nowaTablicaZnakow[j].znak)) {
          nowaTablicaZnakow[j].kod += nowaTablicaZnakow[i].kod;
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

  console.log(nowaTablicaZnakow);
}

//funkcja porownujaca
function compareNumbers(a, b) { return a.ilosc - b.ilosc; }

//funkcja wypisujaca kodowanie
function WypisanieKodu(nowaTablicaZnakow, textToCheck) {

  let tablica = [];

  for (i = 0; i < nowaTablicaZnakow.length; i++) {
    if (nowaTablicaZnakow[i].znak.length == 1) {
      if (nowaTablicaZnakow[i].znak == ' ') { nowaTablicaZnakow[i].znak = "spacja"; }
      if (nowaTablicaZnakow[i].znak == '\n') { nowaTablicaZnakow[i].znak = "enter"; }
      tablica[i] = nowaTablicaZnakow[i].znak + " => " + nowaTablicaZnakow[i].kod + " \tp = " + (nowaTablicaZnakow[i].ilosc/textToCheck.length*100).toFixed(2) +"%";
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
