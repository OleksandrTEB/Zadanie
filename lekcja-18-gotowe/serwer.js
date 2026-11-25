// serwer.js
// ODPOWIEDZIALNOSC: konfiguracja aplikacji i podlaczenie pozostalych czesci.
// Lekcja 18: dochodzi obsluga sesji uzytkownika.

import express from "express";
// Biblioteka obslugujaca sesje. Zainstalowana poleceniem:
// npm install express-session
import session from "express-session";
import trasyOferty from "./trasy/oferta.js";
import trasySesji from "./trasy/sesja.js";

const app = express();
const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static("public"));

// ---------------------------------------------------------------------------
// OBSLUGA SESJI
// Ta linia musi stac PRZED podlaczeniem tras, bo trasy korzystaja z sesji.
// Od tego miejsca kazde zadanie ma do dyspozycji obiekt zadanie.session
// ---------------------------------------------------------------------------
app.use(session({
  // Tajny klucz, ktorym serwer podpisuje identyfikator sesji.
  // Dzieki podpisowi uzytkownik nie moze sobie samemu wymyslic cudzego numeru.
  // W prawdziwej aplikacji ten klucz trzyma sie poza kodem. Wrocimy do tego.
  secret: "tajny-klucz-okienka-zmien-mnie",

  // false oznacza: nie zapisuj sesji ponownie, jesli nic sie w niej nie zmienilo.
  // Oszczedza niepotrzebna prace serwera.
  resave: false,

  // false oznacza: nie twórz sesji dla kogos, kto niczego w niej nie zapisal.
  // Dzieki temu zwykly gosc przegladajacy oferte nie zasmieca pamieci serwera.
  saveUninitialized: false,

  cookie: {
    // Czas zycia ciasteczka z numerem sesji, w milisekundach.
    // 1000 ms razy 60 sekund razy 60 minut, czyli jedna godzina.
    maxAge: 1000 * 60 * 60,

    // true oznacza: skrypt w przegladarce NIE MOZE odczytac tego ciasteczka.
    // Zabezpieczenie przed kradzieza sesji przez wstrzyknięty skrypt.
    httpOnly: true
  }
}));

app.use("/", trasyOferty);
app.use("/sesja", trasySesji);

// ADRES, KTOREGO NIE OBSLUGUJE ZADNA TRASA.
app.use((zadanie, odpowiedz) => {
  odpowiedz.status(404).render("blad", {
    tytul: "Nie znaleziono",
    wiadomosc: "Taka strona nie istnieje."
  });
});

// WSPOLNA OBSLUGA BLEDOW. Cztery argumenty, zawsze na koncu.
app.use((blad, zadanie, odpowiedz, dalej) => {
  console.error(blad);
  odpowiedz.status(500).render("blad", {
    tytul: "Blad serwera",
    wiadomosc: "Przepraszamy, wystapil blad. Sprobuj za chwile."
  });
});

app.listen(PORT, () => {
  console.log(`Serwer dziala pod adresem http://localhost:${PORT}`);
});
