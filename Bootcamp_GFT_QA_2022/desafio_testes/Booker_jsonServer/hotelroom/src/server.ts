
const jsonServer = require('json-server')
const auth = require('json-server-auth')

const app = jsonServer.create()
const router = jsonServer.router('./data/hotelroom.json')

// /!\ Bind the router db to the app
app.db = router.db

const rules = auth.rewriter({
  // Permission rules
  users: 600, //User must own the resource to write or read the resource.
  dorms: 664, //User must be logged to write the resource.  Everyone can read the resource.
  booking: 600 //User must own the resource to write or read the resource.

})

app.use(rules)
// You must apply the auth middleware before the router
app.use(auth)
app.use(router)
app.listen(3000)