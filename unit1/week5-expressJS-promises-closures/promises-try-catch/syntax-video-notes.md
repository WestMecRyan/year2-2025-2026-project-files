What is a promise?

An I.O.U.

A future agreement

Can be successful (resolve) or fail (reject)

fetch doesn't know how long it's going to take

Database query or Insert command

We use a promise when it could be blocking

Requesting user permissions requires a promise

Resolve successful

Reject unsuccessful

Creating promises

create user promise

mark functions async await

.then

.catch if promise fails

promise with resolvers deferred

promise all array makes an array of promises and waits for all of them to be successful

promise all settled; successful ones are fulfilled

promiseInstance.finally()

promise.any() // returns first fulfilled promise  promise.race() // returns first one successful or faile

deferred

controls are promise reject 