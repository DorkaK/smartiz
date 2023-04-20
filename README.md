# smartiz
A klímmaváltozás fordulópontjai és kimenetelei

## Szimuláció folyamata:

Infó beolvasása a simulation.json-ből

Inicializáljuk az szimulációt
- Field-ek legenerálása
- Beállítjuk a kezdő entitásokat

Szimuláció futtatása
- Adott fielden jelen lévő entitások lépése
  - A "cselekvő képes" entitások megteszik a lépésüket (pl. tengeri tehenek)

Utolsó iteráció eredményének mentése a result.json-be