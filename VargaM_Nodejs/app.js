const express = require("express")
const app = express()

// Az app.use() metódusban található függvény egy middleware, amely fut, amikor az alkalmazáshoz érkezik egy HTTP kérés.
// A middleware-ek mindig az app.use-ok sorrendjének megfelelően futnak le, így végezhetünk majd a beérkező HTTP kérésen előfeldolgozást vagy autentikációt
app.use((req, res, next) => {
    // a req objektumon keresztül a kapott HTTP kérés paramétereit érhetjük el, a res-en keresztül a visszaküldendő választ konfigurálhatjuk
    // ezt a két paramétert elnevezhetjük másképp is, de a middleware-ek paraméterlistája mindig ugyanez: kérés, válasz, next függvény
    console.log('A middleware futott!')
    /* A next() függvény itt azt jelzi az ExpressJS-nek, hogy ez a middleware még nem válaszolt a kliensnek, 
    továbbadja a végrehajtást a middleware lánc következő elemének */
    next()
  })

/* Bevonjuk és felcsatoljuk a usersRouter.js által exportált Router objektumot, az abban definiált route-ok a /api/users prefix után lesznek
elérhetőek, tehát pl. /api/users/:id a teljes út, amin a fájlban definiált /:id elérhető lesz */
app.use('/api/users', require('./usersRouter'))

/* Az express.static() metódusban meg kell adnunk azt a mappát, amelyből a statikus fájlokat kiszolgáljuk. */ 
app.use('', express.static('public'))

/* Az app.listen metódus elindítja a szervert a 3000 porton, és kiírja az üzenetet a konzolra egy callback függvénnyel. 
Paraméterként várja a portszámot és a callback függvényt, amely akkor hívódik meg, amikor a szervert elindítjuk.
Érdemes ezt a parancsot megtenni mindig az utolsónak, és mindenképp a middleware-ek bevonása után */
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})