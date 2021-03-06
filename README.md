TODO: Förenkla koden ytterligare; ta bort geocoding-tjänsten och ersätt med lite
affärslogik, query parameter eller sortering t.ex.


# Överleva gammal kod (och Javascript)

## Förkunskaper

- Grundläggande Javascript och node.js (om inte; kör introduktion på Javascript)

- TDD

- Refaktorisering

## Förberedelser (om man inte mobbar)

Installera nodejs. MacOS med brew:

    brew install node

Eller ladda ned från:

    https://nodejs.org/en/download/

Hämta koden:

    git clone git@github.com:Omegapoint/tdd-lab-js.git

Installera grunk:

    npm install
    
Kolla att det går att starta appen:

    npm start

Kolla att det går att köra tester:

    npm test
    
Tid: 0m

## Intro

Kolla förkunskaper och förväntningar.

Beskriv uppgiften. Vad ska ändras?

Vårt företag, Animals in Australia, levererar ett API som rapporterar
observationer av djur i Austrialen. Den första versionen av produkten stödjer
djur på "W"; wombats och wallabies.
Vår produktägare upptäcker att man missat att ta med Rednecked Wallabies utan bara
har Swamp Wallabies i svaret. Tyvärr har utvecklarna av tjänsten tagit tjänstledigt
i 6 månader för en walkabout i den australiensiska ödemarken. Produktägaren kommer till
ditt lag och undrar om ni kan lösa problemet.

Tid: 10m

## JavaScript intro (om deltagarna inte är så vana vid Javascript)

Gå igenom ett kodexempel som visar exempel på t.ex. promises. geocode.js?

Tid: 20m

## Metoden

Man ärver kod utan tester och med oklar struktur. Kanske utan dokumentation. Vad göra?

- Hitta fixpunkter och fixera
- Lätt att skriva test för beteendet?
- Om ja: Skriv ett fallerande test och implementera ändringen.
- Om inte: Extrahera en modul (beroende injektion) och fixera modulen


Tid: 20m (30m)

## Undersök koden

Hur angriper man detta? Ta en stund och titta igenom koden och föreslå
angreppssätt. Diskutera!

Några tips:

    npm start
    curl localhost:8080/wombats
    curl localhost:8080/wallabies

Tid: 20m (50m)

## Fixera nåt

Som en demonstration?
Visa mockning och testverktyg.

Tid: 20m (1h 10m)

## Inför en fixering själv

Tid: 40m (1h 50m)

## Paus

Tid: 20 min (2h 10m)

## Bryt ut en modul

Inkl. mindre tester.

Tid: 30m (2h 40m)

## Inför ändringen

Skriv tester för det nya beteendet på modulen och och inför ändringen.

Tid: 1h (3h 40)

## Sammanfattning och retro

Tid: 20m (4h)

## Verktygslåda

- Jest (https://devhints.io/jest): Testramverk
- Nock (https://github.com/nock/nock): Mockning av HTTP-anrop
- Jest-extended (https://github.com/jest-community/jest-extended): Fler matchers för Jest









