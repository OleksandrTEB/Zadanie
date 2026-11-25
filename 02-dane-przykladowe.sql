-- ===========================================================================
-- Projekt Okienko, lekcja 14
-- Przykladowa oferta sklepiku.
--
-- Uruchom ten plik PO pliku 01-tworzenie-bazy.sql
--
-- To sa dane zapasowe. Na lekcji wpisz wlasna oferte, a ten plik potraktuj
-- jako punkt wyjscia albo ratunek, gdyby zabraklo czasu.
-- ===========================================================================

USE okienko;

-- Jedno polecenie INSERT dodajace wiele wierszy naraz.
-- W nawiasie po nazwie tabeli wymieniamy kolumny, ktore wypelniamy.
-- Kolumny id nie podajemy, bo baza nada numer sama.
-- Kolumny dostepny tez nie, bo ma wartosc domyslna.
INSERT INTO produkty (nazwa, opis, cena, kategoria) VALUES
  ('Kanapka z serem',        'Pieczywo pszenne, ser zolty, salata, pomidor', 6.50, 'kanapki'),
  ('Kanapka z szynka',       'Pieczywo razowe, szynka, ogorek kiszony',      7.00, 'kanapki'),
  ('Kanapka wegetarianska',  'Hummus, papryka, rukola',                      7.50, 'kanapki'),
  ('Drozdzowka z serem',     'Wypiek dnia, prosto z piekarni',               4.00, 'slodkie'),
  ('Rogalik z czekolada',    'Maslany, z nadzieniem czekoladowym',           4.50, 'slodkie'),
  ('Muffin jagodowy',        'Z prawdziwymi jagodami',                       5.00, 'slodkie'),
  ('Sok jablkowy 0,3 l',     'Tloczony, bez dodatku cukru',                  3.50, 'napoje'),
  ('Woda niegazowana 0,5 l', 'Zrodlana',                                     2.50, 'napoje'),
  ('Kakao 0,25 l',           'Podawane na cieplo',                           4.00, 'napoje'),
  ('Jogurt naturalny',       'Z granola i miodem',                           5.50, 'przekaski'),
  ('Marchewka w slupkach',   'Swieza, w opakowaniu',                         2.00, 'przekaski'),
  ('Baton zbozowy',          'Z orzechami i zurawina',                       3.00, 'przekaski');

-- Jeden produkt oznaczony jako niedostepny, zeby bylo widac dzialanie filtra
-- w zapytaniach z nastepnej lekcji.
INSERT INTO produkty (nazwa, opis, cena, kategoria, dostepny) VALUES
  ('Zapiekanka', 'Chwilowo niedostepna', 8.00, 'cieple', FALSE);
