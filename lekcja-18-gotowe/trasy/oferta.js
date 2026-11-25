// trasy/oferta.js
// Obsluga oferty i funkcji sesji.

import express from "express";
import * as produkty from "../modele/produkty.js";

const router = express.Router();

router.get("/", async (zadanie, odpowiedz, dalej) => {
  try {
    // Zadanie A: zapamietaj imie podane w adresie, np. /?imie=Jan
    if (zadanie.query.imie) {
      zadanie.session.imie = zadanie.query.imie;
    }

    // Licznik odwiedzin. Po resecie pomijamy jedno wejscie,
    // zeby licznik pozostal rowny zero po przekierowaniu na strone glowna.
    if (zadanie.session.pominJednaWizyte) {
      delete zadanie.session.pominJednaWizyte;
    } else {
      if (typeof zadanie.session.odwiedziny !== "number") {
        zadanie.session.odwiedziny = 0;
      }
      zadanie.session.odwiedziny++;
    }

    const kategoria = zadanie.query.kategoria;
    const szukana = zadanie.query.szukaj;

    // Zadanie B: licz tylko wybranie kategorii, nie kazde wejscie.
    if (typeof zadanie.session.filtrowania !== "number") {
      zadanie.session.filtrowania = 0;
    }
    if (kategoria) {
      zadanie.session.filtrowania++;
    }

    // Zadanie C: trzy ostatnie kategorie, bez powtorzen.
    if (!Array.isArray(zadanie.session.ostatnieKategorie)) {
      zadanie.session.ostatnieKategorie = [];
    }
    if (kategoria) {
      zadanie.session.ostatnieKategorie =
        zadanie.session.ostatnieKategorie.filter((nazwa) => nazwa !== kategoria);
      zadanie.session.ostatnieKategorie.unshift(kategoria);
      zadanie.session.ostatnieKategorie =
        zadanie.session.ostatnieKategorie.slice(0, 3);
      zadanie.session.ostatniaKategoria = kategoria;
    }

    let lista;
    if (szukana) {
      lista = await produkty.szukaj(szukana);
    } else if (kategoria) {
      lista = await produkty.filtrujPoKategorii(kategoria);
    } else {
      lista = await produkty.pobierzWszystkie();
    }

    const kategorie = await produkty.pobierzKategorie();

    odpowiedz.render("oferta", {
      tytul: "Okienko, oferta",
      produkty: lista,
      kategorie,
      wybrana: kategoria || "",
      szukana: szukana || "",
      odwiedziny: zadanie.session.odwiedziny,
      imie: zadanie.session.imie || "",
      filtrowania: zadanie.session.filtrowania,
      ostatnieKategorie: zadanie.session.ostatnieKategorie,
      ostatniaKategoria: zadanie.session.ostatniaKategoria || ""
    });
  } catch (blad) {
    dalej(blad);
  }
});

export default router;
