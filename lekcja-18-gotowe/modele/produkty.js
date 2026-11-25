// modele/produkty.js
// ODPOWIEDZIALNOSC: rozmowa z baza danych na temat produktow.
// Test poprawnosci: w tym pliku nie ma ani jednego getElementById ani render.

// Dwie kropki na poczatku sciezki oznaczaja: folder wyzej.
import { pula } from "../baza.js";

// Zwraca wszystkie dostepne produkty, posortowane.
export async function pobierzWszystkie() {
  const [wiersze] = await pula.query(
    "SELECT * FROM produkty WHERE dostepny = TRUE ORDER BY kategoria, nazwa"
  );
  return wiersze;
}

// Zwraca podana liczbe najtanszych produktow.
export async function pobierzNajtansze(ile) {
  const [wiersze] = await pula.query(
    "SELECT * FROM produkty WHERE dostepny = TRUE ORDER BY cena LIMIT ?",
    [ile]
  );
  return wiersze;
}

// Zwraca liste kategorii wystepujacych w ofercie.
// SELECT DISTINCT zwraca kazda wartosc tylko raz.
export async function pobierzKategorie() {
  const [wiersze] = await pula.query(
    "SELECT DISTINCT kategoria FROM produkty WHERE dostepny = TRUE ORDER BY kategoria"
  );
  // Zamieniamy tablice obiektow na zwykla tablice napisow.
  return wiersze.map((wiersz) => wiersz.kategoria);
}

// ---------------------------------------------------------------------------
// WERSJA NIEBEZPIECZNA, do pokazania na lekcji.
// NIE UZYWAMY jej w projekcie. Sklejanie zapytania z danymi od uzytkownika
// pozwala wstrzyknac wlasne polecenie SQL.
// ---------------------------------------------------------------------------
export async function filtrujNiebezpiecznie(kategoria) {
  const zapytanie =
    "SELECT * FROM produkty WHERE dostepny = TRUE AND kategoria = '" + kategoria + "'";

  // Wypisujemy zapytanie, zeby na lekcji bylo widac, co trafia do bazy.
  console.log("ZAPYTANIE:", zapytanie);

  const [wiersze] = await pula.query(zapytanie);
  return wiersze;
}

// ---------------------------------------------------------------------------
// WERSJA BEZPIECZNA, tej uzywamy w projekcie.
// ---------------------------------------------------------------------------
export async function filtrujPoKategorii(kategoria) {
  // Znak zapytania to MIEJSCE NA WARTOSC, a nie sklejanie napisow.
  // Wartosci podajemy osobno, w tablicy, jako drugi argument.
  const [wiersze] = await pula.query(
    "SELECT * FROM produkty WHERE dostepny = TRUE AND kategoria = ? ORDER BY nazwa",
    [kategoria]
  );
  return wiersze;
}

// Wyszukiwanie po fragmencie nazwy. Rowniez bezpiecznie.
export async function szukaj(fraza) {
  // Znaki procenta dokladamy do WARTOSCI, a nie do tresci zapytania.
  const [wiersze] = await pula.query(
    "SELECT * FROM produkty WHERE dostepny = TRUE AND nazwa LIKE ? ORDER BY nazwa",
    [`%${fraza}%`]
  );
  return wiersze;
}
