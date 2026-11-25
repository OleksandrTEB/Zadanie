// baza.js
// Polaczenie aplikacji z baza danych MySQL.
// Ten plik tworzymy raz i korzystaja z niego wszystkie czesci aplikacji.

// Importujemy wersje biblioteki obslugujaca slowo await.
// Koncowka /promise jest wazna. Bez niej trzeba pisac funkcje zwrotne.
import mysql from "mysql2/promise";

// PULA POLACZEN, czyli zestaw gotowych polaczen z baza.
// Tworzymy ja raz, przy starcie aplikacji, i uzywamy wielokrotnie.
// Bez puli kazde zapytanie otwieraloby polaczenie od nowa, co trwa.
export const pula = mysql.createPool({
  host: "localhost",     // adres serwera bazy, tutaj ten sam komputer
  port: 3306,            // domyslny port MySQL
  user: "root",          // domyslny uzytkownik w pakiecie XAMPP
  password: "",          // w XAMPP domyslnie bez hasla
  database: "okienko",   // nazwa naszej bazy
  waitForConnections: true,
  connectionLimit: 10    // najwyzej dziesiec jednoczesnych polaczen
});
