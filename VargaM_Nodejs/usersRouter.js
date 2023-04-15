const express = require('express')
//létrehozunk egy példányt a Router objektumból, melyre felkonfigurálhatjuk a különböző HTTP műveletekkel elérhető route-okat
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Users list')
})

/* Az id itt egy opcionális paraméter. A router alapértelmezésben az előző, get route-ot fogja futtatni,
ha azonban talál valamilyen plusz stringet, azt automatikusan az id értékeként fogja kezelni, és ezt a route-ot fogja hívni */
router.get('/:id', (req, res) => {
  res.send(`User with ID ${req.params.id}`)
})

/* Ha egy fájl require-el behivatkozza ezt a fájlt, akkor a hivatkozás helyére a module.exports-ban megadott objektum, funkció 
vagy változó fog bekerülni */
module.exports = router 