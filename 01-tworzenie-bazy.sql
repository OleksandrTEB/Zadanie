-- ===========================================================================
-- Projekt Okienko, lekcja 14
-- Tworzenie bazy danych i tabeli produktow.
--
-- Jak uzyc:
--   phpMyAdmin, zakladka SQL, wklej cala zawartosc tego pliku, przycisk Wykonaj.
-- ===========================================================================

-- Tworzymy baze. Czesc IF NOT EXISTS sprawia, ze polecenie nie zglosi bledu,
-- gdyby baza juz istniala.
-- CHARACTER SET utf8mb4 to zestaw znakow obslugujacy polskie litery i emotikony.
-- COLLATE okresla sposob porownywania i sortowania tekstu.
CREATE DATABASE IF NOT EXISTS okienko
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_polish_ci;

-- Od tej chwili wszystkie kolejne polecenia dotycza bazy okienko.
USE okienko;

-- Jesli tabela juz istnieje, usuwamy ja, zeby zaczac od czystej sytuacji.
-- UWAGA: to kasuje wszystkie dane w tabeli. Na pozniejszych lekcjach
-- tej linii juz nie uzywamy.
DROP TABLE IF EXISTS produkty;

CREATE TABLE produkty (
  -- KLUCZ GLOWNY, czyli kolumna jednoznacznie wskazujaca wiersz.
  -- AUTO_INCREMENT oznacza, ze baza sama nadaje kolejne numery,
  -- wiec przy dodawaniu produktu nigdy nie wpisujemy id recznie.
  id INT AUTO_INCREMENT PRIMARY KEY,

  -- VARCHAR to napis o zmiennej dlugosci, w nawiasie maksimum znakow.
  -- NOT NULL oznacza, ze pole nie moze zostac puste.
  nazwa VARCHAR(100) NOT NULL,

  -- TEXT na dluzsze opisy. Moze byc puste, bo nie ma NOT NULL.
  opis TEXT,

  -- DECIMAL(6,2) to liczba o dokladnie dwoch miejscach po przecinku,
  -- lacznie najwyzej szesc cyfr, czyli do 9999.99.
  -- Do cen NIGDY nie uzywamy typu FLOAT, bo przechowuje liczby w przyblizeniu.
  cena DECIMAL(6,2) NOT NULL,

  kategoria VARCHAR(50) NOT NULL,

  -- BOOLEAN przechowuje prawde albo falsz.
  -- DEFAULT TRUE oznacza, ze nowy produkt jest domyslnie dostepny.
  dostepny BOOLEAN NOT NULL DEFAULT TRUE
);
