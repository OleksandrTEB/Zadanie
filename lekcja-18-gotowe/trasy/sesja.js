// trasy/sesja.js
// ODPOWIEDZIALNOSC: podglad i kasowanie sesji. Plik sluzy do nauki,
// w gotowej aplikacji takiej strony sie nie udostepnia uzytkownikom.

import express from "express";

const router = express.Router();

// Podglad zawartosci sesji.
// Adres: /sesja
router.get("/", (zadanie, odpowiedz) => {
  odpowiedz.render("sesja", {
    tytul: "Podglad sesji",

    // Kazda sesja ma swoj numer. Serwer rozpoznaje po nim uzytkownika.
    numerSesji: zadanie.sessionID,

    // JSON.stringify zamienia obiekt na tekst.
    // Drugi argument null oznacza: nie filtruj niczego.
    // Trzeci argument 2 oznacza: wciecie dwoma spacjami, zeby bylo czytelnie.
    zawartosc: JSON.stringify(zadanie.session, null, 2)
  });
});

// Zadanie D: wyzeruj tylko licznik odwiedzin, pozostawiajac reszte sesji.
router.get("/reset-licznika", (zadanie, odpowiedz) => {
  zadanie.session.odwiedziny = 0;
  zadanie.session.pominJednaWizyte = true;
  odpowiedz.redirect("/");
});

// Skasowanie sesji.
// Adres: /sesja/koniec
router.get("/koniec", (zadanie, odpowiedz, dalej) => {
  // destroy usuwa sesje z pamieci serwera.
  // Przyjmuje funkcje, ktora wykona sie po skonczeniu kasowania.
  zadanie.session.destroy((blad) => {
    if (blad) {
      return dalej(blad);
    }

    // redirect odsyla przegladarke pod inny adres.
    odpowiedz.redirect("/");
  });
});

export default router;
